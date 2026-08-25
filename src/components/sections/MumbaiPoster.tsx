"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { MAP_VIEW, projectPoint } from "@/lib/mumbai-geo";
import { MAP_TRACE_VIEW, MAP_TRACES } from "@/lib/mumbai-arterials";
import { cn } from "@/lib/cn";

/**
 * THE MUMBAI PLATE - a map you can put your hand on.
 *
 * The geometry is a static SVG (see scripts/generate-mumbai-map.py), which is
 * the only affordable way to ship eighteen thousand streets. The problem with
 * a static SVG is that it is a picture: nothing about it answers the pointer.
 * Three things fix that, none of which require inlining 486 KB of paths.
 *
 *   1. THE TORCH. A second SVG holding only the lit roads is stacked on the
 *      base and masked to a soft circle at the cursor. Moving the pointer
 *      lights the actual arterials underneath it - the roads brighten, the
 *      picture does not.
 *   2. THE TRACE. The sixteen longest arterials are inlined (2 KB) and run a
 *      dash animation, so light travels the length of the Western Express and
 *      the Eastern Freeway whether or not anyone is pointing at them.
 *   3. THE TILT. The plate is a real 3D surface: `preserve-3d` with a pointer
 *      driven rotation, and the pins are pushed 30px toward the viewer on the
 *      Z axis. They genuinely stand off the map and parallax against it, and
 *      each drops a shadow that slides as the plate turns.
 *
 * All three are pointer-driven, so all three are inert on touch and under
 * `prefers-reduced-motion`, where the plate is exactly the flat poster it was.
 */

const PINS = siteConfig.branches.map((b) => {
  const { x, y } = projectPoint(b.coordinates.lat, b.coordinates.lng);
  return { id: b.id, area: b.area, left: (x / MAP_VIEW.w) * 100, top: (y / MAP_VIEW.h) * 100 };
});

const CENTRE = {
  lat: (siteConfig.branches[0]!.coordinates.lat + siteConfig.branches[1]!.coordinates.lat) / 2,
  lng: (siteConfig.branches[0]!.coordinates.lng + siteConfig.branches[1]!.coordinates.lng) / 2,
};

/** Degrees of tilt at the far edge. Past ~7 the type starts to keystone. */
const TILT = 5;

export function MumbaiPoster({
  active,
  onActivate,
}: {
  active: number;
  onActivate: (i: number) => void;
}) {
  const plateRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [live, setLive] = useState(false);
  const [lit, setLit] = useState(false);

  // Pointer effects need a real pointer and a user who wants motion. Both are
  // checked once on mount rather than per event.
  useEffect(() => {
    const ok =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setLive(ok);
  }, []);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!live) return;
      const el = plateRef.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const px = (e.clientX - left) / width;
      const py = (e.clientY - top) / height;
      // One write per frame - pointermove fires far faster than the compositor.
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
        el.style.setProperty("--ry", `${(px - 0.5) * 2 * TILT}deg`);
        el.style.setProperty("--rx", `${(0.5 - py) * 2 * TILT}deg`);
      });
    },
    [live],
  );

  const onLeave = useCallback(() => {
    cancelAnimationFrame(frame.current);
    const el = plateRef.current;
    if (el) {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    }
    setLit(false);
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <div style={{ perspective: "1600px" }}>
      <div
        ref={plateRef}
        onPointerMove={onMove}
        onPointerEnter={() => live && setLit(true)}
        onPointerLeave={onLeave}
        className="cj-plate u-on-dark relative"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
          transition: "transform 600ms var(--ease-cinema)",
        }}
      >
        {/* Everything that is the map itself, clipped to the plate. The pins
            live outside this box: overflow-hidden flattens 3D children, and
            they need their Z translation to survive. */}
        <div className="relative overflow-hidden rounded-[var(--radius-brand)] bg-green-deep shadow-[0_30px_70px_-30px_rgba(4,23,15,0.85)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/map/mumbai-network.svg"
            alt="Street map of Greater Mumbai, its arterial roads and suburban railway lines drawn in gold and white on deep green"
            width={MAP_VIEW.w}
            height={MAP_VIEW.h}
            loading="lazy"
            decoding="async"
            className="block w-full"
          />

          {/* ── The torch: the lit roads, revealed under the cursor ────── */}
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
                // A tight pool. At the 34% first tried, the reveal covered
                // most of the plate and read as "the picture got brighter"
                // rather than "these roads lit up".
                WebkitMaskImage:
                  "radial-gradient(circle at var(--mx,50%) var(--my,50%), #000 0%, #000 4%, transparent 22%)",
                maskImage:
                  "radial-gradient(circle at var(--mx,50%) var(--my,50%), #000 0%, #000 4%, transparent 22%)",
              }}
            />
          ) : null}

          {/* ── The trace: light running the longest arterials ─────────── */}
          <svg
            aria-hidden
            viewBox={`0 0 ${MAP_TRACE_VIEW.w} ${MAP_TRACE_VIEW.h}`}
            preserveAspectRatio="none"
            className="cj-trace pointer-events-none absolute inset-0 h-full w-full"
          >
            {/* White, and wider than the road beneath it. In gold at road
                  width the streak simply merged into the arterial it was
                  running along and read as nothing. */}
            <g fill="none" stroke="#ffffff" strokeLinecap="round">
              {MAP_TRACES.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  pathLength={1}
                  strokeWidth={5.5}
                  style={{ animationDelay: `${(i % 8) * 1.1}s` }}
                />
              ))}
            </g>
          </svg>

          {/* Corner vignette, so the plate reads as a printed poster. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 78% at 50% 34%, transparent 42%, rgba(4,23,15,0.55) 100%), linear-gradient(to bottom, transparent 58%, rgba(4,23,15,0.88) 100%)",
            }}
          />

          {/* Sheen - light raking across glass as the plate turns. */}
          {live ? (
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0 mix-blend-soft-light transition-opacity duration-700",
                lit ? "opacity-100" : "opacity-0",
              )}
              style={{
                background:
                  "radial-gradient(34% 20% at var(--mx,50%) var(--my,50%), rgba(255,234,203,0.30), transparent 72%)",
              }}
            />
          ) : null}

          {/* ── The plate's lockup ─────────────────────────────────────── */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-6 text-center md:px-8 md:pb-8">
            <p className="-mr-[0.42em] font-body text-[clamp(1.1rem,3.4vw,1.9rem)] font-light uppercase leading-none tracking-[0.42em] text-offwhite">
              Mumbai
            </p>
            <span aria-hidden className="mx-auto mt-3 block h-px w-16 bg-gold-light/45 md:w-20" />
            <p className="mt-3 font-body text-[0.58rem] uppercase tracking-[0.3em] text-beige/75">
              {siteConfig.branches.length} doors &middot; India
            </p>
            <p className="mt-2 font-body text-[0.54rem] tabular-nums tracking-[0.14em] text-beige/50">
              {CENTRE.lat.toFixed(4)}&deg; N / {CENTRE.lng.toFixed(4)}&deg; E
            </p>
          </div>

          <p className="pointer-events-none absolute bottom-2 right-3 font-body text-[0.5rem] tracking-[0.08em] text-beige/40">
            &copy; OpenStreetMap contributors
          </p>
        </div>

        {/* ── The two doors, standing off the surface ─────────────────── */}
        {PINS.map((p, i) => (
          <div
            key={p.id}
            className="absolute"
            style={{ left: `${p.left}%`, top: `${p.top}%`, transformStyle: "preserve-3d" }}
          >
            {/* The shadow stays on the map plane, so it slides out from under
                the pin as the plate turns. That parallax is the whole trick. */}
            <span
              aria-hidden
              className={cn(
                "absolute left-1/2 top-1/2 block rounded-full bg-[#04170f] blur-[3px] transition-all duration-500",
                active === i ? "h-3 w-3 opacity-70" : "h-2.5 w-2.5 opacity-55",
              )}
              style={{ transform: "translate(-50%,-50%) translateY(6px)" }}
            />

            <button
              type="button"
              onMouseEnter={() => onActivate(i)}
              onFocus={() => onActivate(i)}
              onClick={() => onActivate(i)}
              aria-label={`Show the ${p.area} boutique`}
              aria-pressed={active === i}
              className="cj-pin absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-3 outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
              style={{ transform: "translate(-50%,-50%) translateZ(30px)" }}
            >
              {/* Two rings, breathing out from the dot. */}
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
                  "absolute inset-0 m-auto rounded-full border border-gold-light transition-all duration-[900ms] ease-[var(--ease-cinema)]",
                  active === i ? "h-8 w-8 scale-100 opacity-80" : "h-8 w-8 scale-50 opacity-0",
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

            {/* The label needs a plate of its own - set straight onto the map
                it falls into the road network and stops being readable. */}
            <span
              className={cn(
                "pointer-events-none absolute left-1/2 top-1/2 mt-5 -translate-x-1/2 whitespace-nowrap rounded-[3px] border px-2.5 py-1 font-body text-[0.6rem] font-medium uppercase leading-none tracking-[0.16em] backdrop-blur-[3px] transition-all duration-500",
                active === i
                  ? "border-gold-light/45 bg-[#04170f]/92 text-gold-light shadow-[0_6px_18px_-6px_rgba(4,23,15,0.9)]"
                  : "border-beige/15 bg-[#04170f]/78 text-beige/90",
              )}
              style={{ transform: "translate(-50%,0) translateZ(30px)" }}
            >
              {p.area}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
