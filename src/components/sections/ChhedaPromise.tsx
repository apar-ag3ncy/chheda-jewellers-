import { promiseIntro, promiseValues } from "@/lib/content/promise";
import { Section, Container } from "@/components/ui/Section";
import { emphasise } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Button } from "@/components/ui/Button";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";

/**
 * The Chheda Promise, on the homepage - short on purpose.
 *
 * Earlier versions of this section kept growing: a struck assay plate, then
 * glass medallions, each with four titles and four paragraphs beside a tall
 * portrait. The full argument lives on /chheda-promise; the homepage only
 * needs to make the claim and hand over. So: the headline, one line of
 * intro, a wide band of jewellery, and a dock of the four marks that
 * magnify under the pointer - each one a door to its chapter of the
 * promise page.
 *
 * The band is jewellery only, no face: a diamond chain with an emerald
 * pendant, cropped wide from the shoulders down. A portrait here made the
 * section about the model; the promise is about the metal.
 *
 * Anchors: purity -> the hallmark anatomy, transparency -> the rebuildable
 * bill, craft -> the house chapters, buy-back -> the counter checklist.
 */
const MARK_ANCHORS: Record<string, string> = {
  purity: "/chheda-promise#hallmark",
  transparency: "/chheda-promise#estimate",
  craft: "/chheda-promise#house",
  buyback: "/chheda-promise#checklist",
};

export function ChhedaPromise() {
  return (
    <Section id="chheda-promise" spacing="md" tone="transparent" data-bg="green">
      <Container>
        {/* ── Masthead - one breath ─────────────────────────────────── */}
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

        {/* ── The metal, wide, and the four marks on glass ──────────── */}
        <div className="relative mt-10 md:mt-14">
          <ParallaxImage
            src="/media/promise/promise-band.jpg"
            alt="A diamond chain carrying a diamond-set emerald pendant"
            focus="50% 45%"
            intensity={0.07}
            className="aspect-[21/9] w-full md:aspect-[3/1]"
            sizes="(max-width: 768px) 100vw, 92vw"
          />
          {/* the ground rises into the band's foot so the dock sits IN the
              picture rather than under it */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
            style={{
              background:
                "linear-gradient(to top, color-mix(in srgb, var(--green) 78%, transparent) 0%, transparent 100%)",
            }}
          />
          <div className="absolute inset-x-0 -bottom-7 md:-bottom-8">
            <Dock aria-label="The four marks of the promise">
              {promiseValues.map((v, i) => (
                <DockItem
                  key={v.id}
                  href={MARK_ANCHORS[v.id] ?? "/chheda-promise"}
                  label={v.title}
                >
                  <DockLabel>{v.title}</DockLabel>
                  <DockIcon>
                    <span className="cj-glass-numeral font-display text-[1.05rem] font-light leading-none tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </DockIcon>
                </DockItem>
              ))}
            </Dock>
          </div>
        </div>

        {/* room for the overhanging dock */}
        <div aria-hidden className="h-10 md:h-12" />

        <Reveal>
          <p className="mx-auto mt-4 max-w-xl text-center font-body text-[0.92rem] font-light leading-relaxed text-text-muted">
            {promiseIntro.body}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
