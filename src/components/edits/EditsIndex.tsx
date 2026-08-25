"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { edits } from "@/lib/content/edits";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { MOODS } from "./EditMood";
import { cn } from "@/lib/cn";

/**
 * THE MARQUEE - the five edits as a ruled departures board.
 *
 * Five rows, each a full-width rule with an index, a name and a hook. Hovering
 * (or focusing) a row brings its photograph up behind the whole board and
 * dims the other rows, so the list behaves like a single image that changes
 * rather than five cards competing for attention. On touch, no row is
 * "hovered" - the board simply shows the first frame and each row is a plain,
 * large tap target, which is the better mobile interaction anyway.
 *
 * Chosen over a grid of five cards because five is an awkward grid number and
 * because a list can carry a full sentence of copy per row; a card cannot.
 */
export function EditsIndex() {
  const [active, setActive] = useState<number | null>(null);
  const shown = active ?? 0;

  return (
    <section
      aria-label="The Edits"
      className="relative w-full overflow-hidden bg-green-deep py-16 md:py-24"
    >
      {/* ── Backdrop: the hovered edit's frame ───────────────────────── */}
      <div aria-hidden className="absolute inset-0">
        {edits.map((e, i) => (
          <Image
            key={e.slug}
            src={e.hero.src}
            alt=""
            placeholder="blur"
            blurDataURL={EMERALD_LQIP}
            fill
            sizes="100vw"
            className={cn(
              "object-cover transition-opacity duration-[1400ms] ease-[var(--ease-cinema)]",
              shown === i ? "opacity-100" : "opacity-0",
            )}
            style={{ objectPosition: e.hero.focus ?? "50% 32%" }}
          />
        ))}
        {/* Heavy, neutral scrim - the photograph is atmosphere here, the type
            is the content, so legibility wins outright. Two layers: a flat
            floor across the whole frame so no bright patch can ever sit under
            a line of copy, then a horizontal ramp that lets the right-hand
            side of the image stay visible. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "color-mix(in srgb, var(--green-deep) 62%, transparent)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--green-deep) 12%, color-mix(in srgb, var(--green-deep) 82%, transparent) 52%, color-mix(in srgb, var(--green-deep) 30%, transparent) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--green-deep) 0%, transparent 16%, transparent 84%, var(--green-deep) 100%)",
          }}
        />
      </div>

      <Container className="relative">
        <ul
          className="border-t border-line"
          onMouseLeave={() => setActive(null)}
        >
          {edits.map((e, i) => {
            const mood = MOODS[e.mood];
            const on = active === i;
            return (
              <Reveal as="li" key={e.slug} delay={i * 0.05} variant="slide" x={-30}>
                <Link
                  href={`/edits/${e.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className={cn(
                    "group flex items-center gap-5 border-b border-line py-6 transition-opacity duration-500 md:gap-10 md:py-8",
                    // Dim the rows you are not pointing at - the board reads as
                    // one focused line rather than five equal ones.
                    active !== null && !on ? "md:opacity-55" : "opacity-100",
                  )}
                >
                  <span
                    className="w-8 shrink-0 font-body text-[0.68rem] tracking-[0.2em] transition-colors duration-500"
                    style={{ color: on ? mood.accent : "var(--text-muted)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="flex-1">
                    <span className="block font-display text-[clamp(1.8rem,5vw,3.4rem)] font-light leading-[1.04] text-text-strong">
                      {e.name}
                    </span>
                    <span className="mt-1.5 block max-w-lg font-body text-[0.86rem] font-light leading-relaxed text-text">
                      {e.hook}
                    </span>
                  </span>

                  {/* A thumbnail rides the row on wide screens - enough to
                      preview the mood without leaving the list. */}
                  <span
                    className={cn(
                      "relative hidden h-24 w-20 shrink-0 overflow-hidden transition-all duration-[900ms] ease-[var(--ease-cinema)] lg:block",
                      on ? "opacity-100 grayscale-0" : "opacity-70 grayscale",
                    )}
                  >
                    <Image
                      src={e.gallery[0]!.src}
                      alt=""
                      aria-hidden
                      placeholder="blur"
                      blurDataURL={EMERALD_LQIP}
                      fill
                      sizes="80px"
                      className="object-cover"
                      style={{ objectPosition: e.gallery[0]!.focus ?? "50% 30%" }}
                    />
                  </span>

                  <span
                    aria-hidden
                    className="shrink-0 text-lg transition-all duration-500 group-hover:translate-x-1"
                    style={{ color: on ? mood.accent : "var(--text-muted)" }}
                  >
                    &rarr;
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
