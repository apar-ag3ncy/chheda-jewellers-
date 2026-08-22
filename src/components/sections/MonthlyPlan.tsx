"use client";

import Image from "next/image";
import { useRef } from "react";
import { monthlyPlanTeaser } from "@/lib/content/plans";
import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Monthly Plan — emotional message first, details second (per spec §6).
 * A cinematic full-bleed band that PINS for a beat while the image drifts in
 * and the message settles (a slow scroll-scrub moment). Desktop only; mobile
 * and reduced-motion get the static, fully-legible layout.
 */
export function MonthlyPlan() {
  const section = useRef<HTMLElement>(null);
  const imageWrap = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Pin + scrub only where it feels good: pointer-capable, roomy screens.
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: "+=80%",
            pin: true,
            scrub: 1,
          },
        });
        tl.fromTo(
          imageWrap.current,
          { scale: 1.04, yPercent: -2 },
          { scale: 1.16, yPercent: 2, ease: "none" },
          0,
        );
        tl.fromTo(
          content.current,
          { y: 46, autoAlpha: 0.4 },
          { y: 0, autoAlpha: 1, ease: "none" },
          0,
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
      <div ref={imageWrap} className="absolute inset-0">
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
            "linear-gradient(to right, color-mix(in srgb, var(--green-deep) 72%, transparent) 4%, color-mix(in srgb, var(--green-deep) 16%, transparent) 64%), linear-gradient(to top, color-mix(in srgb, var(--green-deep) 52%, transparent) 0%, transparent 32%)",
        }}
      />

      <Container className="relative py-24">
        <div ref={content} className="max-w-xl">
          <p className="u-eyebrow mb-6">{monthlyPlanTeaser.eyebrow}</p>
          <h2 className="font-display text-[clamp(2.6rem,6vw,4.8rem)] font-light leading-[0.98]">
            {monthlyPlanTeaser.headline.split("\n").map((l, i) => (
              <span key={i} className="block">
                {l}
              </span>
            ))}
          </h2>
          <p className="mt-7 max-w-md font-body text-[1.02rem] font-light leading-relaxed text-text">
            {monthlyPlanTeaser.body}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={monthlyPlanTeaser.cta.href} variant="primary" size="lg" withArrow>
              {monthlyPlanTeaser.cta.label}
            </Button>
            <Button href="/offers-and-plans" variant="ghost" size="lg">
              All offers &amp; plans
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
