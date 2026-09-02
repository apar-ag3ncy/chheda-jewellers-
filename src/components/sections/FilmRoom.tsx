"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { ringFilm, ringHeadline, reelFrameSrc, reelPosterSrc } from "@/lib/content/reels";
import { useFrameScrub } from "@/components/motion/useFrameScrub";
import { Container } from "@/components/ui/Section";
import { SplitLines } from "@/components/motion/SplitLines";
import { emphasise } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

/**
 * THE RING - one line, one piece, and a great deal of air.
 *
 * The whole section is a tall scroll runway with a sticky stage in the middle
 * of it, so the ring stays centred in the viewport while the page moves. That
 * scroll is what turns it - plus a hand on it, if the visitor wants one. It
 * never rotates on its own, and there is no timeline, counter, caption or
 * chapter list: a single display line and the piece, floating.
 *
 * SEAMLESS BY CONSTRUCTION: no border, no card, no backing. The frame's own
 * edges are feathered away by a radial mask so the footage dissolves into the
 * page's emerald, and the piece simply sits on the site.
 */

/** Rotations across the section's scroll - gentle, so it reads as slow-motion. */
// Softer than a full turn: the ring drifts through about two-thirds of a
// rotation across the whole section instead of spinning past 360, so the
// movement reads as a slow settle rather than a wheel being cranked.
const SCROLL_TURNS = 0.65;

/**
 * Frames per second the ring turns unattended. 4.5 of 72 frames is about a
 * fifth of a turn a second - slow enough to read as a piece being examined
 * rather than a display model on a motor.
 */
const AUTO_SPIN = 4.5;

/** Feathers every edge of the frame into the page. */
const SEAMLESS_MASK =
  "radial-gradient(ellipse 72% 76% at 50% 47%, black 48%, transparent 78%)";

export function FilmRoom() {
  const sectionRef = useRef<HTMLElement>(null);

  const urls = useMemo(
    () => Array.from({ length: ringFilm.frames }, (_, i) => reelFrameSrc(ringFilm, i)),
    [],
  );
  const scrub = useFrameScrub(urls, {
    sectionRef,
    scrollTurns: SCROLL_TURNS,
    autoSpin: AUTO_SPIN,
    // The arc is open (~280 degrees), so the playhead folds at the ends
    // rather than wrapping - see the note on ringFilm.
    closedTurn: ringFilm.closedTurn ?? true,
  });

  return (
    <section
      ref={sectionRef}
      id="film-room"
      data-bg="deep"
      className="relative w-full"
      // The runway. Its height is what the scroll rotation is measured across;
      // the stage inside stays put while it passes.
      style={{ minHeight: "260svh" }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
        {/* A single pool of warm light behind everything. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(52% 44% at 50% 54%, color-mix(in srgb, var(--gold) 11%, transparent) 0%, transparent 72%)",
          }}
        />

        <Container className="relative flex h-full flex-col items-center justify-center">
          {/* ── The one line ─────────────────────────────────────────── */}
          <SplitLines delay={0.05}>
            <h2 className="text-center font-display font-light leading-[0.95] tracking-[var(--tracking-6)] text-[clamp(2.6rem,min(9vw,11svh),6rem)]">
              {ringHeadline.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {emphasise(line)}
                </span>
              ))}
            </h2>
          </SplitLines>

          {/* ── The piece ────────────────────────────────────────────── */}
          <div
            ref={scrub.stageRef}
            role="slider"
            tabIndex={0}
            aria-label={`${ringFilm.name} - drag, or use the arrow keys, to turn it`}
            aria-valuemin={0}
            aria-valuemax={360}
            aria-valuenow={scrub.angle}
            aria-valuetext={`${scrub.angle} degrees`}
            {...scrub.handlers}
            className="relative mt-[clamp(1rem,3svh,2.5rem)] aspect-[4/5] w-[min(78vw,clamp(15rem,52svh,26rem))] cursor-grab touch-pan-y select-none outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-4 focus-visible:ring-offset-bg active:cursor-grabbing"
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ WebkitMaskImage: SEAMLESS_MASK, maskImage: SEAMLESS_MASK }}
            >
              {/* Poster - the SSR / no-JS layer; the canvas paints over it. */}
              <Image
                src={reelPosterSrc(ringFilm)}
                alt={ringFilm.alt}
                placeholder="blur"
                blurDataURL={EMERALD_LQIP}
                fill
                sizes="(max-width: 768px) 78vw, 26rem"
                className="object-cover"
              />
              <canvas
                ref={scrub.canvasRef}
                className={cn(
                  "absolute inset-0 h-full w-full transition-opacity duration-700",
                  scrub.ready ? "opacity-100" : "opacity-0",
                )}
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
