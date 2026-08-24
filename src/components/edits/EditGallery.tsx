"use client";

import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import type { OccasionEdit } from "@/types/content";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { useStickyScene } from "@/components/motion/useStickyScene";
import { MOODS } from "./EditMood";
import { cn } from "@/lib/cn";

/**
 * THE LOOKBOOK — a sticky scene, read like a contact sheet.
 *
 * The frame holds still on the left while the six captions scroll past on the
 * right; the frame cross-dissolves to whichever caption you are reading. The
 * sheet of thumbnails underneath is not decoration — it is the scene's index,
 * and its marker tracks the same state, so at any moment you can see where you
 * are in the edit without scrolling back.
 *
 * Below `md` the stage has nowhere to stick, so the whole thing collapses to a
 * plain stack of captioned frames (see `useStickyScene`).
 */
export function EditGallery({ edit }: { edit: OccasionEdit }) {
  const { rootRef, active } = useStickyScene(edit.gallery.length);
  const mood = MOODS[edit.mood];

  return (
    <section
      className="relative w-full bg-green-deep py-16 md:py-28"
      aria-label={`${edit.name} lookbook`}
    >
      <Container>
        <div className="mb-10 flex items-end justify-between border-b border-line pb-5 md:mb-16">
          <div>
            <p className="u-eyebrow mb-2">The lookbook</p>
            <h2 className="font-display text-[length:var(--step-3)] font-light leading-[var(--leading-3)]">
              Six frames from{" "}
              <em className="font-display italic">{edit.name}</em>
            </h2>
          </div>
          <p
            className="hidden font-body text-[0.68rem] uppercase tracking-[0.18em] sm:block"
            style={{ color: mood.accent }}
          >
            {mood.label}
          </p>
        </div>

        <div ref={rootRef} className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14">
          {/* ── The stage ─────────────────────────────────────────────── */}
          <div className="md:col-span-7">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-green md:sticky md:top-24">
              {edit.gallery.map((img, i) => (
                <Image
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  placeholder="blur"
                  blurDataURL={EMERALD_LQIP}
                  fill
                  sizes="(max-width: 768px) 100vw, 56vw"
                  className={cn(
                    // A long dissolve is what makes the change read as a
                    // dissolve rather than a swap.
                    "object-cover transition-opacity duration-[1500ms] ease-[var(--ease-cinema)]",
                    i === 0 ? "opacity-100" : "opacity-0",
                    active === i ? "md:opacity-100" : "md:opacity-0",
                  )}
                  style={{ objectPosition: img.focus ?? "50% 30%" }}
                />
              ))}

              {/* Frame number, set like a contact-sheet caption. */}
              <span className="pointer-events-none absolute bottom-4 left-4 font-body text-[0.64rem] uppercase tracking-[0.22em] text-offwhite mix-blend-difference">
                Frame {String(active + 1).padStart(2, "0")} / {String(edit.gallery.length).padStart(2, "0")}
              </span>

              {/* Progress rule along the bottom edge of the frame. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-gold-light/70 transition-transform duration-[900ms] ease-[var(--ease-cinema)]"
                style={{
                  transform: `scaleX(${(active + 1) / edit.gallery.length})`,
                }}
              />
            </div>
          </div>

          {/* ── The captions ──────────────────────────────────────────── */}
          <ol className="md:col-span-5">
            {edit.gallery.map((img, i) => (
              <li
                key={img.src}
                data-scene-step
                className="border-t border-line py-8 first:border-t-0 first:pt-0 md:py-[18vh] md:first:pt-[6vh]"
              >
                {/* Mobile keeps its own frame inline; desktop reads the stage. */}
                <div className="relative mb-5 aspect-[4/5] w-full overflow-hidden bg-green md:hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    placeholder="blur"
                    blurDataURL={EMERALD_LQIP}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    style={{ objectPosition: img.focus ?? "50% 30%" }}
                  />
                </div>
                <Reveal variant="slide" x={28}>
                  <span
                    className="font-body text-[0.68rem] tracking-[0.22em] transition-colors duration-500"
                    style={{ color: active === i ? mood.accent : "var(--text-muted)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Visually this is the caption; for assistive tech it is a
                      duplicate of the frame's alt text, so it is hidden rather
                      than announced twice per frame. */}
                  <p
                    aria-hidden
                    className={cn(
                      "mt-3 max-w-sm font-display text-[length:var(--step-2)] font-light leading-snug transition-colors duration-700",
                      "md:opacity-45",
                      active === i && "md:opacity-100",
                    )}
                  >
                    {img.alt}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* ── The contact sheet ─────────────────────────────────────────── */}
        <div className="mt-12 hidden grid-cols-6 gap-3 md:grid">
          {edit.gallery.map((img, i) => (
            <div
              key={img.src}
              className={cn(
                "relative aspect-[3/4] overflow-hidden transition-all duration-[900ms] ease-[var(--ease-cinema)]",
                active === i ? "opacity-100 grayscale-0" : "opacity-40 grayscale",
              )}
            >
              <Image
                src={img.src}
                alt=""
                aria-hidden
                placeholder="blur"
                blurDataURL={EMERALD_LQIP}
                fill
                sizes="16vw"
                className="object-cover"
                style={{ objectPosition: img.focus ?? "50% 30%" }}
              />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-500"
                style={{
                  background: mood.accent,
                  transform: `scaleX(${active === i ? 1 : 0})`,
                }}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
