"use client";

import Image from "next/image";
import { useRef } from "react";
import { monthlyPlanTeaser } from "@/lib/content/plans";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Monthly Plan — emotional message first, details second (per spec §6).
 * A cinematic full-bleed band. The image gets a gentle transform-only parallax
 * (GPU-cheap, never pins or reflows — safe under load); the message reveals on
 * enter. Static under reduced motion.
 */
export function MonthlyPlan() {
  const section = useRef<HTMLElement>(null);
  const imageWrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = imageWrap.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id="monthly-plan"
      data-bg="green"
      className="relative flex min-h-[88svh] w-full items-center overflow-hidden bg-green-deep"
    >
      <div ref={imageWrap} className="absolute inset-0 scale-[1.12]">
        <Image
          src="/media/plan/plan-poster.jpg"
          alt="A quiet, intimate moment in warm gold jewellery"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 35%" }}
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, color-mix(in srgb, var(--green-deep) 82%, transparent) 4%, color-mix(in srgb, var(--green-deep) 22%, transparent) 60%), linear-gradient(to top, color-mix(in srgb, var(--green-deep) 55%, transparent) 0%, transparent 34%)",
        }}
      />

      <Container className="relative py-16 md:py-24">
        <div className="max-w-xl">
          <Reveal as="p" className="u-eyebrow mb-6">
            {monthlyPlanTeaser.eyebrow}
          </Reveal>
          <Reveal>
            <h2 className="font-display text-[clamp(2.6rem,6vw,4.8rem)] font-light leading-[0.98]">
              {monthlyPlanTeaser.headline.split("\n").map((l, i) => (
                <span key={i} className="block">
                  {l}
                </span>
              ))}
            </h2>
          </Reveal>
          <Reveal
            as="p"
            delay={0.08}
            className="mt-7 max-w-md font-body text-[1.02rem] font-light leading-relaxed text-text"
          >
            {monthlyPlanTeaser.body}
          </Reveal>
          <Reveal delay={0.14} className="mt-9 flex flex-wrap gap-4">
            <Button href={monthlyPlanTeaser.cta.href} variant="primary" size="lg" withArrow>
              {monthlyPlanTeaser.cta.label}
            </Button>
            <Button href="/offers-and-plans" variant="ghost" size="lg">
              All offers &amp; plans
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
