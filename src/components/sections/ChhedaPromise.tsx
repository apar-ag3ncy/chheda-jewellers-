import { promiseIntro } from "@/lib/content/promise";
import { Section, Container } from "@/components/ui/Section";
import { emphasise } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Button } from "@/components/ui/Button";
import { PromiseDock } from "@/components/promise/PromiseDock";

/**
 * The Chheda Promise, on the homepage - short on purpose.
 *
 * The masthead makes the claim; everything that works - the band, the dock
 * of four marks with their hover ledger, the scroll-out handoff - lives in
 * PromiseDock, which is a client component because the chips and the text
 * panel under them share hover state. The full argument stays on
 * /chheda-promise; each chip doors into its chapter there.
 */
export function ChhedaPromise() {
  return (
    <Section id="chheda-promise" spacing="md" tone="transparent" data-bg="green">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal as="p" className="u-eyebrow mb-5">
              {promiseIntro.eyebrow}
            </Reveal>
            <SplitLines delay={0.05}>
              <h2 className="font-display text-[length:var(--step-4)] font-light leading-[var(--leading-4)] tracking-[var(--tracking-4)]">
                {promiseIntro.headline.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {emphasise(i === 1 ? "as good as *their word*" : line)}
                  </span>
                ))}
              </h2>
            </SplitLines>
          </div>
          <Reveal delay={0.1} className="md:pb-2">
            <Button href="/chheda-promise" variant="ghost" withArrow>
              Read the full promise
            </Button>
          </Reveal>
        </div>

        <PromiseDock />
      </Container>
    </Section>
  );
}
