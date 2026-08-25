"use client";

import Link from "next/link";
import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { edits } from "@/lib/content/edits";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Button } from "@/components/ui/Button";
import { useStickyScene } from "@/components/motion/useStickyScene";
import { MOODS } from "@/components/edits/EditMood";
import { cn } from "@/lib/cn";

/**
 * SHOP BY OCCASION — the homepage door into /edits.
 *
 * Placed directly after "Types of Jewellery" so the two axes are introduced
 * back to back: that section says *what it is*, this one says *where you are
 * wearing it*. Reading them in sequence is what teaches the visitor that the
 * site has two ways in.
 *
 * The heading column is sticky and counts along with the cards, so the section
 * has a fixed anchor while the photography travels — the "logical sticky"
 * behaviour: something the eye can hold onto while the content moves past it.
 */
export function EditsRail() {
  const { rootRef, active } = useStickyScene(edits.length, {
    start: "top 70%",
    end: "bottom 55%",
  });
  const current = edits[active] ?? edits[0]!;
  const mood = MOODS[current.mood];

  return (
    <section
      id="edits"
      data-bg="maroon"
      className="relative w-full py-20 md:py-32"
    >
      <Container>
        <div ref={rootRef} className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14">
          {/* ── Sticky anchor column ──────────────────────────────────── */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <Reveal as="p" className="u-eyebrow mb-5">
                The Edits
              </Reveal>
              <SplitLines delay={0.04}>
                <h2 className="font-display text-[length:var(--step-5)] font-light leading-[var(--leading-5)] tracking-[var(--tracking-5)]">
                  <span className="block">Dressed for</span>
                  <span className="block italic">where you&rsquo;re going</span>
                </h2>
              </SplitLines>
              <Reveal
                as="p"
                delay={0.1}
                className="mt-6 max-w-sm font-body text-[0.95rem] font-light leading-relaxed text-text-muted"
              >
                Gold, diamond and polki are the rooms. These are the reasons you
                walk into them — five occasions, each with its own weight, its
                own light, and its own rules.
              </Reveal>

              {/* Live index — tracks the card you are reading. */}
              <div className="mt-10 hidden items-baseline gap-4 md:flex">
                <span
                  className="font-display text-5xl font-light tabular-nums transition-colors duration-700"
                  style={{ color: mood.accent }}
                >
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="font-body text-[0.7rem] uppercase tracking-[0.2em] text-text-muted">
                  / {String(edits.length).padStart(2, "0")} · {current.name}
                </span>
              </div>

              <Reveal delay={0.14} className="mt-8">
                <Button href="/edits" variant="ghost" withArrow>
                  All five edits
                </Button>
              </Reveal>
            </div>
          </div>

          {/* ── Travelling cards ──────────────────────────────────────── */}
          <ol className="md:col-span-7">
            {edits.map((e, i) => (
              <li
                key={e.slug}
                data-scene-step
                className={cn(
                  "pb-6 md:pb-16",
                  // Alternate the inset so the column reads as a staggered
                  // editorial run rather than a stack of identical tiles.
                  i % 2 === 1 ? "md:pl-14" : "md:pr-14",
                )}
              >
                <Reveal variant="mask">
                  <Link
                    href={`/edits/${e.slug}`}
                    className="group relative block aspect-[4/5] w-full overflow-hidden bg-green-deep sm:aspect-[3/2]"
                  >
                    <Image
                      src={e.hero.src}
                      alt={e.hero.alt}
                      placeholder="blur"
                      blurDataURL={EMERALD_LQIP}
                      fill
                      sizes="(max-width: 768px) 100vw, 48vw"
                      className={cn(
                        "object-cover transition-all duration-[1700ms] ease-[var(--ease-cinema)] group-hover:scale-[1.05]",
                        active === i ? "md:grayscale-0" : "md:grayscale-[0.35]",
                      )}
                      style={{ objectPosition: e.hero.focus ?? "50% 32%" }}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-green-deep/92 via-green-deep/15 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                      <p className="u-eyebrow mb-2 text-[0.6rem]">{e.eyebrow}</p>
                      <h3 className="font-display text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-tight text-text-strong">
                        {e.name}
                      </h3>
                      <p className="mt-2 max-w-sm font-body text-[0.84rem] font-light leading-relaxed text-text-muted">
                        {e.hook}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
