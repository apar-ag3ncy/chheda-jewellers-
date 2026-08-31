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
 * "fit box" - a div locked to the map's aspect, sized in JS so landscape
 * viewports contain the whole city and portrait ones cover, offset so the
 * midpoint of the two shops lands at the viewport centre. The frame itself
 * is cut around that midpoint, so on a landscape screen the shops sit dead
 * centre with the full metropolis around them.
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
  // Averaged over however many pins exist, not over exactly two. The literal
  // PINS[0]!/PINS[1]! crashed the whole homepage at import time the moment a
  // third shop was added or one removed.
  x: PINS.reduce((n, p) => n + p.left, 0) / Math.max(PINS.length, 1),
  y: PINS.reduce((n, p) => n + p.top, 0) / Math.max(PINS.length, 1),
};

/**
 * The plate does not tilt, scale or move. It used to rotate a couple of
 * degrees under the pointer, which read as the whole map shaking every time
 * the cursor crossed it - and any transform on the plate also has to be paid
 * for with a compensating scale that crops the map. A map should sit still;
 * the life in this one comes from the light, not from the geography moving.
 */

export function MumbaiPoster({
  active,
  onActivate,
}: {
  active: number | null;
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
      const box = boxRef.current;
      if (!box) return;
      const b = box.getBoundingClientRect();
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        // Torch coordinates in cover-box pixels - the box is bigger than the
        // viewport, so percentages of the section would miss the roads.
        box.style.setProperty("--mx", `${e.clientX - b.left}px`);
        box.style.setProperty("--my", `${e.clientY - b.top}px`);
      });
    },
    [live],
  );

  const onLeave = useCallback(() => {
    cancelAnimationFrame(frame.current);
    setLit(false);
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  // Position the cover box: anchor point at viewport centre, clamped so the
  // box never exposes a gap. Re-runs on resize.
  useEffect(() => {
    const outer = outerRef.current;
    const box = boxRef.current;
    if (!outer || !box) return;
    /**
     * One axis: how far to pull the box so the anchor sits at the viewport
     * centre. When the box is larger than the viewport the offset is clamped
     * so no edge is ever exposed; when it is smaller the box is simply
     * centred and the surplus becomes letterbox.
     */
    const axis = (anchorPct: number, boxSize: number, viewSize: number) => {
      if (boxSize < viewSize) return (boxSize - viewSize) / 2;
      const ideal = (anchorPct / 100) * boxSize - viewSize / 2;
      return Math.min(Math.max(ideal, 0), boxSize - viewSize);
    };

    const place = () => {
      const vw = outer.clientWidth;
      const vh = outer.clientHeight;
      if (!vw || !vh) return;
      // Landscape viewports CONTAIN the map, so the whole city is on screen -
      // sea, island, creek and mainland. The letterbox is invisible because
      // the map's own edge fades to the same --green-deep the section is
      // painted in. Portrait viewports would contain down to a thin band, so
      // they cover instead: the sea and the mainland crop away and the dense
      // middle - which is where both shops are - fills the screen.
      // COVER at every size. Containing the map left letterbox bars and put
      // the SVG's own edge on screen, so the section read as a photograph
      // pasted onto a panel rather than as a window onto the city. Covering
      // pushes every edge off-screen; the frame is cut around the two shops,
      // so what crops away is sea and outer mainland, never the city.
      const scale = Math.max(vw / MAP_VIEW.w, vh / MAP_VIEW.h);
      const bw = MAP_VIEW.w * scale;
      const bh = MAP_VIEW.h * scale;
      // The CSS min-width/min-height:100% below is only a pre-hydration
      // fallback. It has to be released here: min-width beats width, so
      // leaving it set pins the box to viewport size and silently defeats
      // the contain fit - the map looks cropped no matter what width says.
      box.style.minWidth = "0px";
      box.style.minHeight = "0px";
      box.style.width = `${bw}px`;
      box.style.height = `${bh}px`;
      box.style.transform = `translate(${-axis(ANCHOR.x, bw, vw)}px, ${-axis(ANCHOR.y, bh, vh)}px)`;
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
              /* Click only, deliberately. Hover used to open the card,
                  which meant crossing the map with a pointer flashed panels
                  in and out at the screen edge - and made it impossible to
                  LOOK at the map without operating it. A pin is a button;
                  the card is its answer. (Enter/Space fire click on a
                  button, so the keyboard path is unchanged.) */
              onClick={() => onActivate(i)}
              aria-label={`Show the ${p.area} boutique`}
              aria-pressed={active === i}
              className="group/pin absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
            >
              {/* The idle ping runs on BOTH pins now, not only the active one -
                  it is the "this is a button" signal, and a signal shown only
                  after the button has been found is no signal at all. */}
              <span
                aria-hidden
                className="cj-pin-ping absolute inset-0 m-auto h-12 w-12 rounded-full border border-gold/80"
              />
              <span
                aria-hidden
                className={cn(
                  "absolute inset-0 m-auto h-11 w-11 rounded-full border border-gold transition-all duration-[900ms] ease-[var(--ease-cinema)]",
                  active === i ? "scale-100 opacity-80" : "scale-50 opacity-0",
                )}
              />
              {/* Soft standing halo so the pin reads lit even between pings;
                  brightens on hover to answer the pointer. */}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-0 m-auto rounded-full transition-all duration-500 ease-[var(--ease-cinema)]",
                  "h-10 w-10 bg-[radial-gradient(circle,rgba(198,141,97,0.5)_0%,rgba(198,141,97,0.16)_45%,transparent_72%)]",
                  "group-hover/pin:scale-125 group-hover/pin:opacity-100",
                  active === i ? "opacity-100" : "opacity-75",
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "block rounded-full transition-all duration-500 ease-[var(--ease-cinema)] group-hover/pin:scale-110",
                  active === i
                    ? "h-[1.35rem] w-[1.35rem] shadow-[0_0_0_4px_rgba(4,23,15,0.75),0_0_22px_8px_rgba(240,207,170,0.75),0_0_52px_18px_rgba(198,141,97,0.6)]"
                    : "h-[1.1rem] w-[1.1rem] shadow-[0_0_0_4px_rgba(4,23,15,0.7),0_0_18px_6px_rgba(240,207,170,0.6),0_0_40px_14px_rgba(198,141,97,0.45)]",
                )}
                /* A bead of gold, lit top-left: cream core into brand gold
                   into the deep edge. Flat --gold-light read as a white dot
                   against the dark map - the ramp is what makes it metal. */
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 32% 28%, #fbe9cd 0%, var(--gold-light) 26%, var(--gold) 62%, var(--gold-deep) 100%)",
                }}
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
            // The bottom fades to FULLY OPAQUE --green-deep, the exact colour the
            // footer's own top edge fades in from. The seam between two stacked
            // full-screen sections then falls inside one flat field of the same
            // green and cannot be seen. It used to stop at 80% of a different
            // dark, so roads ran to the edge and hit a hard line.
            // Feathers all four viewport edges into --green-deep so the map
            // dissolves into the sections above and below instead of ending
            // on a visible line. The bottom reaches full opacity, which is
            // what makes the seam into the footer disappear.
            "linear-gradient(to right, var(--green-deep) 0%, transparent 14%, transparent 86%, var(--green-deep) 100%), radial-gradient(130% 96% at 50% 45%, transparent 48%, color-mix(in srgb, var(--green-deep) 62%, transparent) 100%), linear-gradient(to bottom, var(--green-deep) 0%, transparent 16%, transparent 56%, var(--green-deep) 97%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-[14svh] text-center md:pb-[16svh]">
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
