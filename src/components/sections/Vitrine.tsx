"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { emphasise } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

/**
 * THE VITRINE — one piece, one whole screen, one ground.
 *
 * Each cutout (Magnific background removal on the house's own footage) gets
 * the screen to itself, and the ground it sits on is the screen: switching
 * pieces washes the entire section between the three colours the brand owns —
 * emerald, cream, oxblood — which is the effect a real case gives you when the
 * lining changes behind the glass.
 *
 * STILL BY DESIGN. The lighting treatment is the whole effect — a fixed
 * three-quarter tilt in true perspective, a specular sheen masked BY the piece
 * so light lands only on metal, a shadow leaning off the tilt, and the piece's
 * reflection beneath. Nothing tracks the pointer and nothing sways; the only
 * thing that ever moves is what the visitor asks for by pressing a switch.
 *
 * All three stay mounted and cross-dissolve, so a switch is instant (no reload,
 * no flash) and the browser only decodes each piece once.
 */

type Ground = {
  /** Section background while this piece is shown. */
  bg: string;
  /** Cream needs the dark-on-light token scope. */
  light?: boolean;
  /** Specular highlight colour for this ground. */
  sheen: string;
};

/** The house's three grounds — dark, light, dark. */
const EMERALD: Ground = { bg: "bg-green", sheen: "rgba(255,236,200,0.42)" };
const CREAM: Ground = { bg: "bg-cream", light: true, sheen: "rgba(255,255,255,0.55)" };
const MAROON: Ground = { bg: "bg-maroon", sheen: "rgba(255,228,190,0.40)" };

const PIECES = [
  {
    id: "kada",
    name: "The Kada Pair",
    detail: "22K gold · kundan & meena",
    src: "/media/vitrine/kada.webp",
    alt: "A pair of jadau kada bangles, lit against deep emerald",
    /** Sized per piece so a wide band and a tall ring feel equally grand. */
    maxH: "min(34svh, 20rem)",
    maxW: "min(82vw, 46rem)",
    /** Fixed three-quarter angle, in degrees. */
    tilt: { x: 6, y: -9 },
    /** Where the sheen crosses the metal, as a background-position. */
    sheenAt: "72%",
    ground: EMERALD,
  },
  {
    id: "rose",
    name: "The Emerald Brooch",
    detail: "Emeralds · uncut diamonds · enamel",
    src: "/media/vitrine/rose.webp",
    alt: "An emerald and uncut-diamond brooch, lit against cream",
    maxH: "min(44svh, 26rem)",
    maxW: "min(74vw, 26rem)",
    tilt: { x: 5, y: 8 },
    sheenAt: "28%",
    ground: CREAM,
  },
  {
    id: "ring",
    name: "The Bloom Ring",
    detail: "Rose gold · pavé diamonds",
    src: "/media/vitrine/ring.webp",
    alt: "A rose-gold lotus ring, lit against oxblood",
    maxH: "min(46svh, 27rem)",
    maxW: "min(64vw, 20rem)",
    tilt: { x: 7, y: -7 },
    sheenAt: "68%",
    ground: MAROON,
  },
] as const;

export function Vitrine() {
  const [active, setActive] = useState(0);
  const ground = PIECES[active]!.ground;

  return (
    <section
      id="vitrine"
      data-bg="deep"
      className={cn(
        "relative flex min-h-[100svh] w-full flex-col overflow-hidden",
        // The ground IS the screen. A long ease makes the switch read as the
        // case lining changing rather than as a page repaint.
        "transition-colors duration-[900ms] ease-[var(--ease-cinema)]",
        ground.bg,
        ground.light && "u-on-light",
      )}
    >
      {/* Case light — a pool behind the piece, tuned to the ground. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-[900ms]"
        style={{
          background: ground.light
            ? "radial-gradient(46% 40% at 50% 46%, rgba(255,255,255,0.8) 0%, transparent 74%)"
            : "radial-gradient(46% 40% at 50% 46%, color-mix(in srgb, var(--gold) 14%, transparent) 0%, transparent 74%)",
        }}
      />

      <Container className="relative flex min-h-[100svh] flex-col py-[clamp(3rem,7svh,5rem)]">
        {/* ── Heading ─────────────────────────────────────────────────── */}
        <div className="mx-auto flex max-w-3xl shrink-0 flex-col items-center text-center">
          <Reveal as="p" className="u-eyebrow mb-4">
            The vitrine
          </Reveal>
          <SplitLines delay={0.04}>
            <h2 className="font-display text-[length:var(--step-4)] font-light leading-[var(--leading-4)] tracking-[var(--tracking-4)]">
              {emphasise("Laid out *on the glass*")}
            </h2>
          </SplitLines>
        </div>

        {/* ── The piece, alone on the screen ──────────────────────────── */}
        <div className="relative flex flex-1 items-center justify-center">
          {PIECES.map((p, i) => (
            <div
              key={p.id}
              aria-hidden={i !== active}
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center gap-[clamp(2.5rem,6svh,4.5rem)]",
                "transition-opacity duration-700 ease-[var(--ease-lux)]",
                i === active ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              {/* Held at a fixed three-quarter angle. The wrapper shrink-wraps
                  the image so the sheen and reflection align to it exactly. */}
              <div className="[perspective:1200px]">
                <div
                  className="relative inline-block"
                  style={{ transform: `rotateX(${p.tilt.x}deg) rotateY(${p.tilt.y}deg)` }}
                >
                  {/* Shadow — offset against the tilt, sells the depth. */}
                  <div
                    aria-hidden
                    className="absolute inset-x-[10%] -bottom-[9%] h-[15%] rounded-[50%] blur-xl"
                    style={{
                      background: p.ground.light
                        ? "rgba(90,60,30,0.3)"
                        : "rgba(0,0,0,0.6)",
                      transform: `translateX(${p.tilt.y * -0.4}%)`,
                    }}
                  />

                  {/* eslint-disable-next-line @next/next/no-img-element --
                      alpha cutout at native size; next/image's wrapper breaks
                      the self-masking sheen below. */}
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="relative block h-auto w-auto select-none"
                    style={{
                      maxHeight: p.maxH,
                      maxWidth: p.maxW,
                      filter: p.ground.light
                        ? "drop-shadow(0 18px 28px rgba(80,50,20,0.3))"
                        : "drop-shadow(0 20px 32px rgba(0,0,0,0.55))",
                    }}
                  />

                  {/* Specular sheen — masked BY the piece, so the highlight can
                      only ever fall on metal and stones. */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      WebkitMaskImage: `url(${p.src})`,
                      maskImage: `url(${p.src})`,
                      WebkitMaskSize: "100% 100%",
                      maskSize: "100% 100%",
                      background: `linear-gradient(105deg, transparent 34%, ${p.ground.sheen} 50%, transparent 66%)`,
                      backgroundSize: "300% 100%",
                      backgroundPosition: `${p.sheenAt} 0`,
                    }}
                  />

                  {/* Reflection in the glass — clipped to a shallow strip.
                      Without the clip a full mirrored copy hangs below the
                      piece and washes straight over the plate and switches. */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-[102%] w-full overflow-hidden"
                    style={{ height: "min(24%, 4rem)" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element --
                        same asset, purely decorative. */}
                    <img
                      src={p.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="block h-auto w-full -scale-y-100 select-none opacity-[0.18]"
                      style={{
                        WebkitMaskImage:
                          "linear-gradient(to top, transparent 40%, rgba(0,0,0,0.6) 100%)",
                        maskImage:
                          "linear-gradient(to top, transparent 40%, rgba(0,0,0,0.6) 100%)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* The plate. */}
              <div className="text-center">
                <p className="font-display text-[length:var(--step-3)] font-light leading-tight text-text-strong">
                  {p.name}
                </p>
                <p className="mt-2 font-body text-[0.68rem] uppercase tracking-[0.18em] text-text-muted">
                  {p.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── The switches — the rest of the case ─────────────────────── */}
        <div
          role="tablist"
          aria-label="Choose a piece"
          className="mx-auto flex shrink-0 items-center justify-center gap-3"
        >
          {PIECES.map((p, i) => {
            const on = i === active;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={on}
                aria-label={`${p.name} — ${p.detail}`}
                onClick={() => setActive(i)}
                className={cn(
                  "group relative grid h-14 w-14 place-items-center overflow-hidden rounded-full border transition-all duration-[450ms] ease-[var(--ease-lux)]",
                  p.ground.bg,
                  on
                    ? "border-gold-light ring-1 ring-gold-light/60 ring-offset-2 ring-offset-transparent"
                    : "border-line opacity-70 hover:opacity-100",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element --
                    the same cutout, thumbnailed. */}
                <img
                  src={p.src}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="max-h-[62%] max-w-[74%] select-none object-contain"
                />
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
