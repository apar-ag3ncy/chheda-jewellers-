"use client";

import Image from "next/image";
import { promiseIndex, promiseStory } from "@/lib/content/promise";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { useStickyScene } from "@/components/motion/useStickyScene";
import { cn } from "@/lib/cn";


export function Chapters() {
  // Same primitive as the atelier and the edit lookbook, so all three sticky
  // scenes on the site behave identically. See `useStickyScene`.
  const { rootRef, active } = useStickyScene(promiseStory.chapters.length, {
    start: "top 60%",
    end: "bottom 60%",
  });

  return (
    <Section spacing="lg" tone="green">
      <Container>
        {/* ── The index - reframes the page as a document of record ── */}
        <Reveal as="p" className="u-eyebrow mb-6">
          Contents
        </Reveal>
        <ol className="mb-20 max-w-2xl md:mb-28">
          {promiseIndex.map((row, i) => (
            <Reveal
              as="li"
              key={row.n}
              delay={i * 0.04}
              className="flex items-baseline gap-5 border-t border-line py-4 last:border-b"
            >
              <span className="font-body text-[0.68rem] tracking-[0.2em] text-gold-light">
                {row.n}
              </span>
              <span className="flex-1 font-display text-[length:var(--step-1)] font-light text-text-strong">
                {row.label}
              </span>
              <span className="hidden font-body text-[0.78rem] font-light text-text-muted sm:block">
                {row.note}
              </span>
            </Reveal>
          ))}
        </ol>

        {/* ── Chapters, with a plate that turns ── */}
        <div ref={rootRef} className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-green-deep md:sticky md:top-28">
              {promiseStory.chapters.map((c, i) => (
                <Image
                  key={c.plate.src}
                  src={c.plate.src}
                  alt={c.plate.alt}
                  placeholder="blur"
                  blurDataURL={EMERALD_LQIP}
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className={cn(
                    "object-cover transition-opacity duration-[1500ms] ease-[var(--ease-cinema)]",
                    // Mobile has no sticky turn, so it simply shows the first
                    // plate; from md up the plate follows the active chapter.
                    i === 0 ? "opacity-100" : "opacity-0",
                    active === i ? "md:opacity-100" : "md:opacity-0",
                  )}
                  style={{ objectPosition: c.plate.focus }}
                />
              ))}
              {/* plate number, like a printed monograph */}
              <span className="absolute bottom-4 left-4 font-body text-[0.66rem] uppercase tracking-[0.2em] text-offwhite/80 mix-blend-difference">
                Plate {String(active + 1).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="md:col-span-7 md:pl-6">
            <ol className="flex flex-col">
              {promiseStory.chapters.map((ch, i) => (
                <li
                  key={ch.id}
                  data-scene-step
                  className="border-t border-line py-10 first:border-t-0 first:pt-0 md:py-16"
                >
                  <Reveal delay={0.04}>
                    <span className="font-body text-[0.68rem] tracking-[0.2em] text-gold-light">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-4 font-display text-[length:var(--step-3)] font-light leading-[var(--leading-3)] text-text-strong">
                      {ch.title}
                    </h2>
                    <p className="mt-5 max-w-lg font-body text-[1rem] font-light leading-relaxed text-text-muted">
                      {ch.body}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
