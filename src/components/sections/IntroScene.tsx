"use client";

import { ScrollSequence } from "@/components/motion/ScrollSequence";
import { Container } from "@/components/ui/Section";

/**
 * The opening scene — a scroll-scrubbed glide through a marble palace
 * courtyard, echoing the jharokha arches used elsewhere on the site.
 *
 * The camera is driven entirely by the scroll wheel: the section pins and the
 * frames advance with progress, so the visitor is moving the camera themselves.
 * Frames are painted to <canvas> (never a scrubbed <video>, which stutters on
 * mobile and Safari).
 */
export function IntroScene() {
  return (
    <ScrollSequence
      dir="/media/sequences/intro"
      frames={63}
      width={1100}
      height={618}
      scrollLength={2.2}
    >
      {/* Legibility scrim — bottom-weighted only, so the architecture stays clean */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, color-mix(in srgb, var(--green-deep) 78%, transparent) 0%, transparent 42%)",
        }}
      />

      <Container className="pointer-events-none relative flex h-full flex-col justify-end pb-20 md:pb-28">
        <p className="u-eyebrow mb-5">Chheda Jewellers</p>
        <h2 className="max-w-3xl font-display text-[length:var(--step-5)] font-light leading-[var(--leading-5)] tracking-[var(--tracking-5)] text-text-strong">
          Step inside
          <em className="italic"> the house</em>
        </h2>
        <p className="mt-5 flex items-center gap-3 font-body text-[0.66rem] uppercase tracking-[0.24em] text-text-muted">
          <span aria-hidden className="block h-px w-8 bg-line-strong" />
          Scroll to walk through
        </p>
      </Container>
    </ScrollSequence>
  );
}
