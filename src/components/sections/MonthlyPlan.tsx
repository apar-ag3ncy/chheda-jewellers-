import Image from "next/image";
import { monthlyPlanTeaser } from "@/lib/content/plans";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * Monthly Plan — emotional message first, details second (per spec §6).
 * A cinematic full-bleed band leading into Offers & Plans.
 */
export function MonthlyPlan() {
  return (
    <section
      id="monthly-plan"
      className="relative flex min-h-[88svh] w-full items-center overflow-hidden bg-green-deep"
    >
      <Image
        src="/media/plan/plan-poster.jpg"
        alt="A quiet, intimate moment in warm gold jewellery"
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "50% 35%" }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, color-mix(in srgb, var(--green-deep) 90%, transparent) 8%, color-mix(in srgb, var(--green-deep) 30%, transparent) 70%), linear-gradient(to top, var(--green-deep) 2%, transparent 40%)",
        }}
      />

      <Container className="relative py-24">
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
              All offers & plans
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
