"use client";

import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { bespokeIntro, bespokeSteps } from "@/lib/content/bespoke";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Button } from "@/components/ui/Button";
import { emphasise } from "@/components/ui/SectionHeading";
import { useStickyScene } from "@/components/motion/useStickyScene";
import { cn } from "@/lib/cn";

/**
 * THE ATELIER — custom jewellery, placed where the objection actually lands.
 *
 * This section sits immediately after Collections. That is the whole argument
 * for its position: the visitor has just been told "campaigns, not
 * catalogues", and the very next thought a real customer has is *"but what if
 * I want something that isn't in a campaign?"*. Answering that question in the
 * next breath is worth more than a bespoke page nobody clicks into.
 *
 * The scene is sticky rather than pinned (see `useStickyScene` for why): the
 * plate holds while the four steps scroll through it, and the plate
 * cross-dissolves on the cinema curve so the commission reads as one
 * continuous process rather than four separate claims.
 */
export function Atelier() {
  const { rootRef, active } = useStickyScene(bespokeSteps.length);

  return (
    <section
      id="atelier"
      data-bg="beige"
      className="u-on-light relative w-full overflow-hidden py-20 md:py-32"
    >
      <Container>
        {/* ── Heading ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-8 border-b border-line pb-12 md:grid-cols-12 md:gap-14 md:pb-16">
          <div className="md:col-span-7">
            <Reveal as="p" className="u-eyebrow mb-5">
              {bespokeIntro.eyebrow}
            </Reveal>
            <SplitLines delay={0.04}>
              <h2 className="font-display text-[length:var(--step-5)] font-light leading-[var(--leading-5)] tracking-[var(--tracking-5)]">
                {bespokeIntro.title.split("\n").map((l, i) => (
                  <span key={i} className="block">
                    {emphasise(l)}
                  </span>
                ))}
              </h2>
            </SplitLines>
          </div>
          <div className="flex flex-col justify-end md:col-span-5">
            <Reveal as="p" delay={0.08} className="font-display text-[length:var(--step-1)] font-light italic leading-snug text-gold-light">
              {bespokeIntro.hook}
            </Reveal>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-5 font-body text-[0.95rem] font-light leading-relaxed text-text-muted"
            >
              {bespokeIntro.body}
            </Reveal>
          </div>
        </div>

        {/* ── The sticky scene ──────────────────────────────────────── */}
        <div
          ref={rootRef}
          className="mt-12 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-12 md:gap-16"
        >
          {/* Plate */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-green">
                {bespokeSteps.map((s, i) => (
                  <Image
                    key={s.id}
                    src={s.image.src}
                    alt={s.image.alt}
                    placeholder="blur"
                    blurDataURL={EMERALD_LQIP}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className={cn(
                      "object-cover transition-opacity duration-[1500ms] ease-[var(--ease-cinema)]",
                      i === 0 ? "opacity-100" : "opacity-0",
                      active === i ? "md:opacity-100" : "md:opacity-0",
                    )}
                    style={{ objectPosition: s.image.focus ?? "50% 32%" }}
                  />
                ))}
              </div>

              {/* Step rail — the scene's index, and a keyboard-free way to
                  see how long the process is before committing to reading. */}
              <ol className="mt-5 hidden gap-2 md:flex">
                {bespokeSteps.map((s, i) => (
                  <li key={s.id} className="flex-1">
                    <span
                      aria-hidden
                      className={cn(
                        "block h-px w-full origin-left transition-all duration-[900ms] ease-[var(--ease-cinema)]",
                        active >= i ? "bg-gold-light" : "bg-line",
                      )}
                    />
                    <span
                      className={cn(
                        "mt-2 block font-body text-[0.62rem] uppercase tracking-[0.16em] transition-colors duration-500",
                        active === i ? "text-gold-light" : "text-text-muted",
                      )}
                    >
                      {s.n}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Steps */}
          <ol className="md:col-span-7 md:pl-6">
            {bespokeSteps.map((s, i) => (
              <li
                key={s.id}
                data-scene-step
                className="border-t border-line py-10 first:border-t-0 first:pt-0 md:py-[14vh] md:first:pt-0"
              >
                {/* Mobile carries its own plate; desktop reads the sticky one. */}
                <div className="relative mb-6 aspect-[4/5] w-full overflow-hidden bg-green md:hidden">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    placeholder="blur"
                    blurDataURL={EMERALD_LQIP}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    style={{ objectPosition: s.image.focus ?? "50% 32%" }}
                  />
                </div>

                <Reveal variant="slide" x={30}>
                  <span
                    className={cn(
                      "font-body text-[0.68rem] tracking-[0.22em] transition-colors duration-700",
                      active === i ? "text-gold-light" : "text-gold",
                    )}
                  >
                    {s.n}
                  </span>
                  <h3
                    className={cn(
                      "mt-4 font-display text-[length:var(--step-3)] font-light leading-[var(--leading-3)] transition-opacity duration-700",
                      "md:opacity-50",
                      active === i && "md:opacity-100",
                    )}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-5 max-w-lg font-body text-[1rem] font-light leading-relaxed text-text-muted">
                    {s.body}
                  </p>
                  {/* Every step names what the customer leaves with. This is
                      the line that turns a process into a promise. */}
                  <p className="mt-5 flex items-start gap-3 border-l border-line-strong pl-4 font-body text-[0.86rem] font-light leading-relaxed text-text">
                    <span className="u-eyebrow shrink-0 pt-[0.2em] text-[0.58rem]">
                      You get
                    </span>
                    <span>{s.outcome}</span>
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-20 flex flex-wrap items-center gap-4">
          <Button href="/bespoke" variant="onLight" size="lg" withArrow>
            Start a commission
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
