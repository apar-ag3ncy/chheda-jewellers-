import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { bespokeIntro } from "@/lib/content/bespoke";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Button } from "@/components/ui/Button";
import { emphasise } from "@/components/ui/SectionHeading";

/**
 * THE ATELIER — the bespoke invitation, kept short by design.
 *
 * This section sits immediately after Collections, where "campaigns, not
 * catalogues" provokes the obvious question — "what if I want something that
 * isn't in a campaign?" It answers in one breath: the claim, one photograph,
 * and the door. The four steps of the commission live on /bespoke; the
 * homepage no longer walks through them.
 */
export function Atelier() {
  return (
    <section
      id="atelier"
      data-bg="beige"
      className="u-on-light relative w-full overflow-hidden py-20 md:py-28"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-14">
          {/* ── The claim ─────────────────────────────────────────────── */}
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
            <Reveal
              as="p"
              delay={0.1}
              className="mt-6 max-w-xl font-body text-[1rem] font-light leading-relaxed text-text-muted"
            >
              Drawn for one person, or your family&rsquo;s own gold remade into
              something worn again. Bring us a sketch, a photograph, or your
              grandmother&rsquo;s set.
            </Reveal>
            <Reveal delay={0.14} className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/bespoke" variant="onLight" size="lg" withArrow>
                How a commission works
              </Button>
            </Reveal>
          </div>

          {/* ── One photograph ────────────────────────────────────────── */}
          <div className="md:col-span-5">
            <Reveal variant="mask" delay={0.08}>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-green">
                <Image
                  src="/media/bespoke/01.jpg"
                  alt="Hands adjusting a heavy polki necklace at the counter"
                  placeholder="blur"
                  blurDataURL={EMERALD_LQIP}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  style={{ objectPosition: "50% 40%" }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
