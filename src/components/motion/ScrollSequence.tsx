"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type ScrollSequenceProps = {
  /** Directory of frames, e.g. "/media/sequences/intro". */
  dir: string;
  /** Total frames in the sequence. */
  frames: number;
  /** Intrinsic frame size — the canvas is sized to this and scaled by CSS. */
  width: number;
  height: number;
  /** How far the scene scrubs, as a fraction of viewport height. */
  scrollLength?: number;
  className?: string;
  children?: React.ReactNode;
};

const frameUrl = (dir: string, i: number) =>
  `${dir}/frame-${String(i).padStart(3, "0")}.jpg`;

/**
 * Scroll-scrubbed image sequence painted to <canvas>.
 *
 * Per the repo's motion rules this NEVER scrubs a <video> element — seeking a
 * video on scroll stutters badly on mobile and Safari. Frames are decoded once
 * and blitted, which stays smooth under a scrub.
 *
 * Loading is progressive: a sparse pass (every 4th frame) makes the scene
 * scrubbable almost immediately, then the gaps fill in. The canvas draws the
 * nearest LOADED frame, so it is never blank and never waits on a decode.
 */
export function ScrollSequence({
  dir,
  frames,
  width,
  height,
  scrollLength = 2,
  className,
  children,
}: ScrollSequenceProps) {
  const section = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<(HTMLImageElement | null)[]>([]);
  const loaded = useRef<boolean[]>([]);
  const current = useRef(0);
  const [ready, setReady] = useState(false);

  // ── Progressive preload ────────────────────────────────────────────────
  useEffect(() => {
    images.current = new Array(frames).fill(null);
    loaded.current = new Array(frames).fill(false);
    let cancelled = false;

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        if (cancelled || loaded.current[i]) return resolve();
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (cancelled) return resolve();
          images.current[i] = img;
          loaded.current[i] = true;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = frameUrl(dir, i);
      });

    (async () => {
      // Pass 1 — every 4th frame, so the scene is scrubbable fast.
      const sparse: number[] = [];
      for (let i = 0; i < frames; i += 4) sparse.push(i);
      await Promise.all(sparse.map(load));
      if (cancelled) return;
      setReady(true);
      draw(current.current);
      // Pass 2 — fill the gaps, a few at a time to stay off the main thread.
      for (let i = 0; i < frames; i += 1) {
        if (cancelled) return;
        if (!loaded.current[i]) {
          await load(i);
          if (i === current.current) draw(i);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dir, frames]);

  /** Paint the nearest loaded frame to `index`, so we never blank out. */
  const draw = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let i = Math.max(0, Math.min(frames - 1, Math.round(index)));
    if (!loaded.current[i]) {
      let found = -1;
      for (let d = 1; d < frames; d += 1) {
        if (i - d >= 0 && loaded.current[i - d]) { found = i - d; break; }
        if (i + d < frames && loaded.current[i + d]) { found = i + d; break; }
      }
      if (found === -1) return;
      i = found;
    }
    const img = images.current[i];
    if (!img) return;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  // ── Scrub ──────────────────────────────────────────────────────────────
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const proxy = { frame: 0 };
        const st = ScrollTrigger.create({
          trigger: section.current,
          start: "top top",
          end: `+=${scrollLength * 100}%`,
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            proxy.frame = self.progress * (frames - 1);
            current.current = proxy.frame;
            draw(proxy.frame);
          },
        });
        return () => st.kill();
      });
    },
    { scope: section, dependencies: [frames, scrollLength] },
  );

  return (
    <section
      ref={section}
      data-bg="deep"
      className={cn("relative h-screen w-full overflow-hidden bg-green-deep", className)}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        aria-hidden
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
          ready ? "opacity-100" : "opacity-0",
        )}
        style={{ objectFit: "cover" }}
      />
      {children}
    </section>
  );
}
