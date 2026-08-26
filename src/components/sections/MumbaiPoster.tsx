"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { MAP_VIEW, projectPoint } from "@/lib/mumbai-geo";
import { MAP_TRACE_VIEW, MAP_TRACES } from "@/lib/mumbai-arterials";
import { cn } from "@/lib/cn";

/**
 * THE MUMBAI COVER - the map as a full-screen landscape.
 *
 * The generated SVG is a LANDSCAPE of the whole metropolis (1243x776,
 * ~16:10): the full latitude of Greater Mumbai, longitude widened east
 * across Thane Creek to Navi Mumbai, a sliver of sea on the west. On a
 * typical desktop the entire city is on screen at once. The crop is not
 * object-fit: pins, the torch layer and the trace overlay must all stay
 * glued to the geography, and object-cover would slide the image under
 * absolutely-positioned children. Everything map-anchored lives in one
 * "cover box" - a div locked to the map's aspect, forced to at least
 * viewport size on both axes, offset so the pin midpoint sits as close to
 * the viewport centre as the box's edges allow.
 *
 * Same features as the plate this replaces: the cursor torch lighting the
 * roads (cover-box px coordinates now, since the box outgrows the viewport),
 * light running the longest arterials, breathing gold pins, labels on their
 * own plates. The 3D tilt survives at reduced amplitude with a compensating
 * scale, so the full-bleed edges never peel off the viewport. All pointer
 * work is gated on a fine pointer and no reduced-motion preference.
 */

const PINS = siteConfig.branches.map((b) => {
  const { x, y } = projectPoint(b.coordinates.lat, b.coordinates.lng);
  return { id: b.id, area: b.area, left: (x / MAP_VIEW.w) * 100, top: (y / MAP_VIEW.h) * 100 };
});

/**
 * Where the cover crop anchors when the box outgrows the viewport: the
 * midpoint of the two pins. In the landscape map that point sits at ~26% x -
 * well off centre - so the offset must be CLAMPED to the box edges. A plain
 * CSS translate would shift an exact-fit box off the viewport and leave a
 * bare stripe on the right.
 */
const ANCHOR = {
  x: (PINS[0]!.left + PINS[1]!.left) / 2,
  y: (PINS[0]!.top + PINS[1]!.top) / 2,
};

const TILT = 2.5;

export function MumbaiPoster({
  active,
  onActivate,
}: {
  active: number;
  onActivate: (i: number) => void;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [live, setLive] = useState(false);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    setLive(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!live) return;
      const outer = outerRef.current;
      const box = boxRef.current;
      if (!outer || !box) return;
      const o = outer.getBoundingClientRect();
      const b = box.getBoundingClientRect();
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        // Torch coordinates in cover-box pixels - the box is bigger than the
        // viewport, so percentages of the section would miss the roads.
        box.style.setProperty("--mx", `${e.clientX - b.left}px`);
        box.style.setProperty("--my", `${e.clientY - b.top}px`);
        outer.style.setProperty("--ry", `${((e.clientX - o.left) / o.width - 0.5) * 2 * TILT}deg`);
        outer.style.setProperty("--rx", `${(0.5 - (e.clientY - o.top) / o.height) * 2 * TILT}deg`);
      });
    },
    [live],
  );

  const onLeave = useCallback(() => {
    cancelAnimationFrame(frame.current);
    const outer = outerRef.current;
    if (outer) {
      outer.style.setProperty("--rx", "0deg");
      outer.style.setProperty("--ry", "0deg");
    }
    setLit(false);
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  // Position the cover box: anchor point at viewport centre, clamped so the
  // box never exposes a gap. Re-runs on resize.
  useEffect(() => {
    const outer = outerRef.current;
    const box = boxRef.current;
    if (!outer || !box) return;
    const place = () => {
      const vw = outer.clientWidth;
      const vh = outer.clientHeight;
      const bw = box.offsetWidth;
      const bh = box.offsetHeight;
      const ox = Math.min(Math.max((ANCHOR.x / 100) * bw - vw / 2, 0), Math.max(bw - vw, 0));
      const oy = Math.min(Math.max((ANCHOR.y / 100) * bh - vh / 2, 0), Math.max(bh - vh, 0));
      box.style.transform = `translate(${-ox}px, ${-oy}px)`;
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(outer);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={outerRef}
      onPointerMove={onMove}
      onPointerEnter={() => live && setLit(true)}
      onPointerLeave={onLeave}
      className="cj-plate u-on-dark absolute inset-0 overflow-hidden bg-green-deep"
      style={{
        transform: "scale(1.05) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
        transition: "transform 700ms var(--ease-cinema)",
      }}
    >
      {/* ── The cover box: everything anchored to the geography ───────── */}
      <div
        ref={boxRef}
        className="absolute left-0 top-0"
        style={{
          aspectRatio: `${MAP_VIEW.w} / ${MAP_VIEW.h}`,
          minWidth: "100%",
          minHeight: "100%",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/map/mumbai-network.svg"
          alt="Street map of Greater Mumbai, its arterial roads and suburban railway lines drawn in gold and white on deep green"
          width={MAP_VIEW.w}
          height={MAP_VIEW.h}
          loading="lazy"
          decoding="async"
          className="block h-full w-full"
        />

        {/* The torch: lit roads under the cursor. */}
        {live ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/media/map/mumbai-network-hot.svg"
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className={cn(
              "pointer-events-none absolute inset-0 block h-full w-full transition-opacity duration-500",
              lit ? "opacity-100" : "opacity-0",
            )}
            style={{
              WebkitMaskImage:
                "radial-gradient(circle min(22rem,30vw) at var(--mx,50%) var(--my,50%), #000 0%, #000 18%, transparent 100%)",
              maskImage:
                "radial-gradient(circle min(22rem,30vw) at var(--mx,50%) var(--my,50%), #000 0%, #000 18%, transparent 100%)",
            }}
          />
        ) : null}

        {/* Light running the longest arterials. */}
        <svg
          aria-hidden
          viewBox={`0 0 ${MAP_TRACE_VIEW.w} ${MAP_TRACE_VIEW.h}`}
          preserveAspectRatio="none"
          className="cj-trace pointer-events-none absolute inset-0 h-full w-full"
        >
          <g fill="none" stroke="#ffffff" strokeLinecap="round">
            {MAP_TRACES.map((d, i) => (
              <path key={i} d={d} pathLength={1} strokeWidth={5.5} style={{ animationDelay: `${(i % 8) * 1.1}s` }} />
            ))}
          </g>
        </svg>

        {/* Sheen following the cursor, in the same px space as the torch. */}
        {live ? (
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 mix-blend-soft-light transition-opacity duration-700",
              lit ? "opacity-100" : "opacity-0",
            )}
            style={{
              background:
                "radial-gradient(circle min(26rem,36vw) at var(--mx,50%) var(--my,50%), rgba(255,234,203,0.30), transparent 72%)",
            }}
          />
        ) : null}

        {/* ── The two doors ─────────────────────────────────────────── */}
        {PINS.map((p, i) => (
          <div key={p.id} className="absolute" style={{ left: `${p.left}%`, top: `${p.top}%` }}>
            <button
              type="button"
              onMouseEnter={() => onActivate(i)}
              onFocus={() => onActivate(i)}
              onClick={() => onActivate(i)}
              aria-label={`Show the ${p.area} boutique`}
              aria-pressed={active === i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-3 outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
            >
              <span
                aria-hidden
                className={cn(
                  "cj-pin-ping absolute inset-0 m-auto h-9 w-9 rounded-full border border-gold-light/70",
                  active === i ? "block" : "hidden",
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "absolute inset-0 m-auto h-8 w-8 rounded-full border border-gold-light transition-all duration-[900ms] ease-[var(--ease-cinema)]",
                  active === i ? "scale-100 opacity-80" : "scale-50 opacity-0",
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "block rounded-full bg-gold-light transition-all duration-500 ease-[var(--ease-cinema)]",
                  active === i
                    ? "h-3.5 w-3.5 shadow-[0_0_0_3px_rgba(4,23,15,0.75),0_0_16px_5px_rgba(240,207,170,0.85),0_0_36px_12px_rgba(198,141,97,0.45)]"
                    : "h-2.5 w-2.5 shadow-[0_0_0_3px_rgba(4,23,15,0.7),0_0_12px_3px_rgba(240,207,170,0.5)]",
                )}
              />
            </button>
            <span
              className={cn(
                "pointer-events-none absolute left-1/2 top-1/2 mt-5 -translate-x-1/2 whitespace-nowrap rounded-[3px] border px-2.5 py-1 font-body text-[0.6rem] font-medium uppercase leading-none tracking-[0.16em] backdrop-blur-[3px] transition-all duration-500",
                active === i
                  ? "border-gold-light/45 bg-[#04170f]/92 text-gold-light shadow-[0_6px_18px_-6px_rgba(4,23,15,0.9)]"
                  : "border-beige/15 bg-[#04170f]/78 text-beige/90",
              )}
            >
              {p.area}
            </span>
          </div>
        ))}
      </div>

      {/* ── Viewport-fixed dressing: vignette, lockup, credit ─────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 42%, transparent 52%, rgba(4,23,15,0.5) 100%), linear-gradient(to bottom, rgba(4,23,15,0.35) 0%, transparent 18%, transparent 70%, rgba(4,23,15,0.8) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-8 text-center md:pb-10">
        <p className="-mr-[0.42em] font-body text-[clamp(1.2rem,2.6vw,2rem)] font-light uppercase leading-none tracking-[0.42em] text-offwhite">
          Mumbai
        </p>
        <span aria-hidden className="mx-auto mt-3 block h-px w-16 bg-gold-light/45 md:w-20" />
        <p className="mt-3 font-body text-[0.58rem] uppercase tracking-[0.3em] text-beige/75">
          {siteConfig.branches.length} doors &middot; India
        </p>
      </div>
      <p className="pointer-events-none absolute bottom-3 right-4 font-body text-[0.5rem] tracking-[0.08em] text-beige/40">
        &copy; OpenStreetMap contributors
      </p>
    </div>
  );
}
