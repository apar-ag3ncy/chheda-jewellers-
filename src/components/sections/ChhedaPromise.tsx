import { promiseIntro, promiseValues } from "@/lib/content/promise";
import { Section, Container } from "@/components/ui/Section";
import { emphasise } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { PromisePlate } from "@/components/promise/PromisePlate";
import { Button } from "@/components/ui/Button";

/**
 * The Chheda Promise.
 *
 * This used to be a photograph beside a bulleted list, which is the shape
 * every "our values" block on the internet already has - and the one shape
 * that undercuts the copy, because a promise set as a bullet reads as
 * marketing rather than as an undertaking.
 *
 * So the section is built as the thing the trade actually uses when a claim
 * has to survive being doubted: an assay plate. A blank strip of gold runs
 * down the column, and each value is a mark STRUCK into it as you arrive at
 * it - the punch falls, the metal dents, the plate rings and settles, and only
 * then does the wording set. Four marks on one blank, read top to bottom, is
 * how a hallmark is read.
 *
 * The header is deliberately not the site's shared SectionHeading: the
 * headline sits left and its body sits right on its own baseline, so this one
 * section opens like the front of a document instead of like every other
 * section on the page.
 *
 * Ground stays green (data-bg) - the section's position in the running order
 * is fixed by the owner, and re-tinting it would move the page's cream/dark
 * rhythm somewhere it was not asked to go.
 */
export function ChhedaPromise() {
  return (
    <Section id="chheda-promise" spacing="lg" tone="transparent" data-bg="green">
      <Container>
        {/* ── Masthead: title left, body right, on its own baseline ───── */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Reveal as="p" className="u-eyebrow mb-5">
              {promiseIntro.eyebrow}
            </Reveal>
            <SplitLines delay={0.05}>
              <h2 className="font-display text-[length:var(--step-5)] font-light leading-[var(--leading-5)] tracking-[var(--tracking-5)]">
                {promiseIntro.headline.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {emphasise(i === 1 ? "as good as *their word*" : line)}
                  </span>
                ))}
              </h2>
            </SplitLines>
          </div>

          <div className="md:col-span-5 md:self-end">
            <Reveal delay={0.1}>
              <span aria-hidden className="mb-6 block h-px w-16 bg-gold/60" />
              <p className="max-w-md font-body text-[0.95rem] font-light leading-relaxed text-text-muted">
                {promiseIntro.body}
              </p>
            </Reveal>
          </div>
        </div>

        {/* ── The plate, and the face it is made for ──────────────────── */}
        <div className="mt-16 grid grid-cols-1 gap-14 md:mt-24 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <PromisePlate values={promiseValues} />
          </div>

          <div className="md:col-span-5">
            {/* Sticky, so the face holds still while the marks are struck
                beside it. CSS sticky rather than a pin - no scroll hijack. */}
            <div className="md:sticky md:top-28">
              <ParallaxImage
                src="/media/promise/promise-01.jpg"
                alt="Model in red beside an emerald pillar, in fine gold jewellery"
                focus="50% 30%"
                className="aspect-[4/5] w-full"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <Reveal delay={0.06}>
                <p className="mt-7 max-w-xs font-display text-[length:var(--step-1)] font-light italic leading-snug text-text">
                  Four marks we are held to - and one counter where you can hold
                  us to them.
                </p>
                <div className="mt-7">
                  <Button href="/chheda-promise" variant="ghost" withArrow>
                    Read the full promise
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
