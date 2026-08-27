import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import {
  bespokeIntro,
  bespokeSteps,
  bespokeRoutes,
  bespokeAnswers,
} from "@/lib/content/bespoke";
import { pageMetadata } from "@/lib/seo";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading, emphasise } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Button } from "@/components/ui/Button";
import { Monogram } from "@/components/ui/Monogram";

export const metadata = pageMetadata({
  title: "Bespoke",
  description:
    "Custom jewellery at Chheda Jewellers - a piece drawn for one person, or your family's own gold remade into something worn again. The full commission process, priced and timed honestly.",
  path: "/bespoke",
});

/**
 * /bespoke - the commission, end to end.
 *
 * The homepage no longer carries a bespoke teaser, so this page does both
 * jobs: it sells the idea and then removes the reasons
 * not to do it. Hence the order: the two ways a commission actually starts
 * (and remaking inherited gold comes FIRST for most families, so it is given
 * equal billing), then the four steps as a numbered document, then the four
 * questions people are too polite to ask, priced plainly.
 */
export default function BespokePage() {
  return (
    <>
      {/* ── Cover ─────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[88svh] w-full items-end overflow-hidden bg-green-deep">
        <Image
          src="/media/bespoke/hero.jpg"
          alt="A bride reclining in a hand-made polki set, in a warm maroon room"
          placeholder="blur"
          blurDataURL={EMERALD_LQIP}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{
            objectPosition: "50% 30%",
            animation: "heroZoom 24s ease-out infinite alternate",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, color-mix(in srgb, var(--green-deep) 88%, transparent) 0%, color-mix(in srgb, var(--green-deep) 36%, transparent) 36%, transparent 62%)",
          }}
        />
        <Container className="relative pb-16 pt-32 md:pb-24">
          <p className="u-eyebrow mb-5">{bespokeIntro.eyebrow}</p>
          <SplitLines delay={0.05}>
            <h1 className="max-w-4xl font-display text-[clamp(2.6rem,7.6vw,5.8rem)] font-light leading-[0.96]">
              {bespokeIntro.title.split("\n").map((l, i) => (
                <span key={i} className="block">
                  {emphasise(l)}
                </span>
              ))}
            </h1>
          </SplitLines>
          <p className="mt-7 max-w-xl font-body text-[1.02rem] font-light leading-relaxed text-text">
            {bespokeIntro.body}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/enquire?intent=bespoke" variant="primary" size="lg" withArrow>
              Book a design appointment
            </Button>
          </div>
        </Container>
      </section>

      {/* ── Two ways in ───────────────────────────────────────────────── */}
      <Section spacing="lg" tone="green">
        <Container>
          <SectionHeading
            eyebrow="Where it starts"
            title={"Where a commission\nbegins"}
            intro="One of these is the romantic version. The other is the one most families choose."
            size="md"
          />
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:mt-20 md:grid-cols-2">
            {bespokeRoutes.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.08} className="bg-green-deep p-8 md:p-12">
                <p className="u-eyebrow mb-5">{r.label}</p>
                <h3 className="font-display text-[length:var(--step-3)] font-light leading-[var(--leading-3)] text-text-strong">
                  {r.title}
                </h3>
                <p className="mt-5 max-w-md font-body text-[0.98rem] font-light leading-relaxed text-text-muted">
                  {r.body}
                </p>
                <p className="mt-8 flex items-baseline gap-3 border-t border-line pt-5">
                  <span className="u-eyebrow text-[0.58rem]">Typical lead time</span>
                  <span className="font-display text-2xl font-light text-gold-light">
                    {r.lead}
                  </span>
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── The four steps ────────────────────────────────────────────── */}
      <Section spacing="lg" tone="light" className="u-on-light">
        <Container>
          <SectionHeading
            eyebrow="The commission"
            title={"The four steps"}
            size="md"
          />

          <ol className="mt-14 md:mt-20">
            {bespokeSteps.map((s, i) => (
              <Reveal
                as="li"
                key={s.id}
                delay={i * 0.05}
                className="grid grid-cols-1 items-start gap-6 border-t border-line py-10 last:border-b md:grid-cols-12 md:gap-10 md:py-14"
              >
                <div className="md:col-span-2">
                  <span className="font-display text-5xl font-light text-gold-deep md:text-6xl">
                    {s.n}
                  </span>
                </div>
                <div className="md:col-span-6">
                  <h3 className="font-display text-[length:var(--step-3)] font-light leading-[var(--leading-3)] text-text-strong">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-lg font-body text-[0.98rem] font-light leading-relaxed text-text-muted">
                    {s.body}
                  </p>
                </div>
                <div className="md:col-span-4">
                  <div className="border-l border-line-strong pl-5">
                    <p className="u-eyebrow mb-2 text-[0.58rem]">You walk away with</p>
                    <p className="font-body text-[0.92rem] font-light leading-relaxed text-text">
                      {s.outcome}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── The awkward questions ─────────────────────────────────────── */}
      <Section spacing="lg" tone="deep">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <Reveal variant="settle">
                <Monogram className="h-12 w-12" />
              </Reveal>
              <SectionHeading
                eyebrow="Asked and answered"
                title={"The questions nobody\nasks out loud"}
                size="md"
                className="mt-8"
              />
            </div>

            <dl className="md:col-span-7">
              {bespokeAnswers.map((a, i) => (
                <Reveal
                  key={a.q}
                  delay={i * 0.05}
                  variant="slide"
                  x={28}
                  className="border-t border-line py-7 last:border-b"
                >
                  <dt className="font-display text-[length:var(--step-2)] font-light leading-snug text-text-strong">
                    {a.q}
                  </dt>
                  <dd className="mt-3 max-w-lg font-body text-[0.95rem] font-light leading-relaxed text-text-muted">
                    {a.a}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>

          <Reveal className="mt-24 flex flex-wrap items-center gap-4">
            <Button href="/enquire?intent=bespoke" variant="primary" size="lg" withArrow>
              Book a design appointment
            </Button>
            <Button href="/chheda-promise" variant="ghost" size="lg">
              How we price everything else
            </Button>
          </Reveal>

          <p className="mt-8 font-body text-[0.72rem] leading-relaxed text-text-muted">
            Deposit terms and lead times above are indicative and confirmed in
            writing before any work begins.
          </p>
        </Container>
      </Section>
    </>
  );
}
