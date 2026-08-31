"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { keyDelta, nearestLoaded, reflectFrame, wrapFrame } from "@/lib/scrub";

/**
 * THE TURNTABLE - a 360° frame sequence the VISITOR turns. Never on its own.
 *
 * The playhead is the sum of two user-driven inputs, so they can never fight:
 *
 *   playhead = (scroll progress through the section × turns) + (drag + keys)
 *
 * Nothing rotates by itself: with the page still and no hand on it, the ring
 * holds its angle. Releasing a drag glides to a stop on a little inertia,
 * because that is the visitor's own gesture finishing, not an animation.
 *
 * Painted to <canvas> (CLAUDE.md: image sequences on canvas - never a scrubbed
 * <video>), and neighbouring frames are CROSS-BLENDED at fractional playheads,
 * which is what makes a slow turn glide instead of stepping frame to frame.
 *
 * Loading is lazy and progressive: nothing is fetched until the stage nears
 * the viewport, then frames arrive with limited concurrency and the scrubber
 * snaps to the nearest LOADED frame, so it is usable from the first arrivals.
 * Frames stay as HTMLImageElements - the browser keeps them compressed and
 * decodes on demand; ImageBitmaps would pin megabytes each.
 *
 * There is no persistent rAF: the loop spins up only while inertia is
 * decaying. Reduced motion drops the scroll-linked rotation and the inertia;
 * dragging and arrow keys still work, because motion the visitor performs is
 * theirs to perform.
 */

const CONCURRENCY = 8;
const DPR_CAP = 2;
const DRAG_PER_FRAME = 12; // px of drag per frame step
const FRICTION = 0.94;
const MIN_VELOCITY = 0.015;

type Options = {
  /** Section whose scroll progress drives rotation. */
  sectionRef?: RefObject<HTMLElement | null>;
  /** Full rotations across that section's scroll. 0 disables scroll rotation. */
  scrollTurns?: number;
  /**
   * Frames per second the piece turns on its own. 0 keeps it still until it
   * is scrolled or dragged. Suspended off-screen and under reduced motion.
   */
  autoSpin?: number;
  /**
   * Whether the last frame runs back into the first. When false the playhead
   * FOLDS at both ends instead of wrapping, because crossing the gap in an
   * open arc snaps.
   */
  closedTurn?: boolean;
};

export function useFrameScrub(urls: string[], opts: Options = {}) {
  const { sectionRef, scrollTurns = 0, autoSpin = 0, closedTurn = true } = opts;
  const count = urls.length;

  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  /**
   * The playhead as a whole-degree angle, for assistive tech. Held in state
   * rather than a ref precisely because it has to be rendered: the slider that
   * consumes it reported a hardcoded 0 forever, so screen readers announced
   * the ring at its starting angle no matter how far it had been turned.
   * Updated only when the rounded degree changes, so a drag costs a handful of
   * renders rather than one per frame.
   */
  const [angle, setAngle] = useState(0);

  const st = useRef({
    images: [] as (HTMLImageElement | null)[],
    scrollFrames: 0,
    userFrames: 0,
    /** Accumulated by the autospin loop, kept apart so a drag still adds. */
    autoFrames: 0,
    velocity: 0,
    dragging: false,
    lastX: 0,
    reduce: false,
    raf: 0,
    started: false,
  });

  /** Paint the current playhead, blending the two neighbouring frames. */
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const s = st.current;
    if (!canvas || count === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fold = (v: number) => (closedTurn ? wrapFrame(v, count) : reflectFrame(v, count));
    const playhead = fold(s.scrollFrames + s.userFrames + s.autoFrames);
    const deg = Math.round((playhead / count) * 360) % 360;
    setAngle((prev) => (prev === deg ? prev : deg));
    const base = Math.floor(playhead);
    const frac = playhead - base;
    const a = s.images[fold(base)];
    const b = s.images[fold(base + 1)];
    const fallback = s.images[nearestLoaded(s.images, playhead)];
    if (!a && !fallback) return;

    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    const w = canvas.clientWidth * dpr;
    const h = canvas.clientHeight * dpr;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    // The frames carry alpha now, so each paint must start from nothing.
    // Without this the ring smears: every previous frame stays underneath.
    ctx.clearRect(0, 0, w, h);

    if (a && b && a !== b && frac > 0.005) {
      ctx.globalAlpha = 1;
      ctx.drawImage(a, 0, 0, w, h);
      ctx.globalAlpha = frac;
      ctx.drawImage(b, 0, 0, w, h);
      ctx.globalAlpha = 1;
    } else {
      ctx.drawImage((a ?? fallback)!, 0, 0, w, h);
    }
  }, [count, closedTurn]);

  /** Inertia loop - runs only while a released gesture is still gliding. */
  const spinDown = useCallback(() => {
    const s = st.current;
    cancelAnimationFrame(s.raf);
    const tick = () => {
      if (s.dragging || Math.abs(s.velocity) < MIN_VELOCITY) {
        s.velocity = 0;
        return;
      }
      s.userFrames += s.velocity;
      s.velocity *= FRICTION;
      render();
      s.raf = requestAnimationFrame(tick);
    };
    s.raf = requestAnimationFrame(tick);
  }, [render]);

  /**
   * AUTOSPIN - the piece turns on its own.
   *
   * Its own rAF loop rather than a share of the inertia one, because that
   * loop is allowed to stop and this must not. Time-based, so the speed is
   * the same on a 60Hz and a 120Hz screen, and dt is clamped so a backgrounded
   * tab does not resume by leaping a quarter turn.
   *
   * Held still while the piece is off-screen, while a hand is on it, and under
   * prefers-reduced-motion - where a thing that never stops moving is exactly
   * what the setting is asking about.
   */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || autoSpin <= 0 || count === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const s = st.current;
    let raf = 0;
    let last = 0;
    let visible = false;

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      if (!s.dragging) {
        s.autoFrames += autoSpin * dt;
        render();
      }
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const now = Boolean(entry?.isIntersecting);
        if (now === visible) return;
        visible = now;
        if (visible) {
          last = 0;
          raf = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 },
    );
    io.observe(stage);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [autoSpin, count, render]);

  // ── Lazy progressive load ───────────────────────────────────────────────
  useEffect(() => {
    const el = stageRef.current;
    const s = st.current;
    if (!el) return;

    s.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    s.images = new Array<HTMLImageElement | null>(count).fill(null);
    s.scrollFrames = 0;
    s.userFrames = 0;
    s.velocity = 0;
    s.started = false;
    setLoaded(0);
    setReady(false);

    let cancelled = false;
    const start = () => {
      if (s.started || cancelled) return;
      s.started = true;
      let next = 0;
      const pump = () => {
        if (cancelled || next >= count) return;
        const i = next++;
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (cancelled) return;
          s.images[i] = img;
          setLoaded((n) => n + 1);
          // Ready on the FIRST frame to arrive, not on frame 0 specifically:
        // one failed request for f00.webp used to hide the canvas permanently
        // even though every other frame had decoded.
        setReady(true);
          render();
          pump();
        };
        img.onerror = () => pump(); // a missing frame degrades, never blocks
        img.src = urls[i]!;
      };
      for (let k = 0; k < CONCURRENCY; k += 1) pump();
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { rootMargin: "700px" },
    );
    io.observe(el);

    const ro = new ResizeObserver(render);
    ro.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(s.raf);
      s.images = [];
    };
  }, [urls, count, render]);

  // ── Scroll-linked rotation ──────────────────────────────────────────────
  useEffect(() => {
    const s = st.current;
    const section = sectionRef?.current;
    if (!section || scrollTurns <= 0 || count === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        s.scrollFrames = self.progress * scrollTurns * count;
        render();
      },
    });
    return () => trigger.kill();
  }, [sectionRef, scrollTurns, count, render]);

  // ── Direct manipulation ─────────────────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent) => {
    const s = st.current;
    s.dragging = true;
    s.velocity = 0;
    s.lastX = e.clientX;
    cancelAnimationFrame(s.raf);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = st.current;
    if (!s.dragging) return;
    const step = (e.clientX - s.lastX) / DRAG_PER_FRAME;
    s.lastX = e.clientX;
    s.userFrames += step;
    if (!s.reduce) s.velocity = step;
    render();
  };

  const onPointerUp = () => {
    const s = st.current;
    if (!s.dragging) return;
    s.dragging = false;
    if (!s.reduce) spinDown();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const delta = keyDelta(e.key, count);
    if (delta === null) return;
    e.preventDefault();
    st.current.velocity = 0;
    st.current.userFrames += delta;
    render();
  };

  return {
    stageRef,
    canvasRef,
    loaded,
    total: count,
    ready,
    angle,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      onKeyDown,
    },
  };
}
