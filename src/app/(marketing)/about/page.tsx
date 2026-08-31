import type { ReactNode } from "react";
import { NextStep } from "@/components/ui/NextStep";
import { pageMetadata } from "@/lib/seo";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Monogram } from "@/components/ui/Monogram";
import { siteConfig } from "@/config/site";
import { aboutHero, marks, proofPoints, type Mark } from "@/lib/content/about";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  // Not "Never Repeated". The body deliberately does not make that claim
  // until the owner confirms it is absolute (see `noRepeats`), and a title
  // must not assert what the page itself declines to. pageMetadata appends
  // the brand, so the name is not repeated here either.
  title: "About - Hallmarked & Certified in Mumbai",
  description: `Since ${siteConfig.foundedYear}, ${siteConfig.name} has crafted gold, diamond and polki jewellery in Mumbai - every piece hallmarked, fully documented, and made one at a time.`,
  path: "/about",
});

/**
 * /about - THE HALLMARK.
 *
 * A hallmark is the stamp certifying a piece is what it claims to be, which
 * is also what a brand is. The page this replaces was five long essays
 * stacked vertically - the format nobody finishes - with its rarest material,
 * that a sold design is not run again, buried at the very bottom. Here it is
 * five marks, one scene each, and that material is Mark 04 on its own ground.
 *
 * The tonal run is the site's own: green, cream, green, deep, green.
 */
export default function AboutPage() {
  const [origin, intent, proof, singularity, belonging] = marks;

  return (
    <>
      {/* ── Cover ─────────────────────────────────────────────────────── */}
      <header className="relative flex min-h-[74svh] items-end overflow-hidden bg-green-deep pb-16 pt-32 md:min-h-[80svh] md:pb-24">
        <Container className="relative">
          <Reveal as="p" className="u-eyebrow mb-6">
            {aboutHero.eyebrow}
          </Reveal>
          <SplitLines delay={0.05}>
            <h1 className="max-w-4xl font-display text-[clamp(2.1rem,5.4vw,4.4rem)] font-light leading-[1.04]">
              {aboutHero.display.split("\n").map((l, i) => (
                <span key={i} className="block">
                  {l}
                </span>
              ))}
            </h1>
          </SplitLines>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-8 font-body text-[0.72rem] uppercase tracking-[0.22em] text-gold-light"
          >
            {siteConfig.name} &middot; Est. {siteConfig.foundedYear}, Mumbai
          </Reveal>
        </Container>
      </header>

      {origin ? <MarkScene mark={origin} tone="green" /> : null}
      {intent ? <MarkScene mark={intent} tone="light" onLight /> : null}

      {/* Proof is the one mark that shows rather than tells. */}
      {proof ? (
        <MarkScene mark={proof} tone="green">
          <dl className="mt-14 grid grid-cols-1 gap-x-8 gap-y-8 border-t border-line pt-8 md:mt-16 md:grid-cols-3">
            {proofPoints.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.06} variant="slide" x={-22}>
                <dt className="font-body text-[0.58rem] uppercase tracking-[0.2em] text-text-muted">
                  {p.label}
                </dt>
                <dd className="mt-2 font-display text-[1.12rem] font-light leading-snug text-text-strong">
                  {p.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </MarkScene>
      ) : null}

      {/* The moat, on its own ground and at the largest setting. */}
      {singularity ? <MarkScene mark={singularity} tone="deep" emphasis /> : null}

      {/* Belonging closes on the two counters, named from config. */}
      {belonging ? (
        <MarkScene mark={belonging} tone="green">
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:mt-16 md:grid-cols-2">
            {siteConfig.branches.map((b, i) => (
              <Reveal key={b.id} delay={i * 0.07} className="bg-green-deep p-8 md:p-10">
                <p className="u-eyebrow mb-4">{b.area}</p>
                <p className="font-display text-[length:var(--step-2)] font-light leading-snug text-text-strong">
                  {b.addressLines.join(", ")}
                </p>
              </Reveal>
            ))}
          </div>
        </MarkScene>
      ) : null}

      <NextStep
        eyebrow="That is the house"
        title="The rest of it is on the counter."
        primary={{ href: "/jewellery", label: "See the jewellery" }}
        secondary={{ href: "/chheda-promise", label: "The Chheda Promise" }}
        tone="deep"
      />
    </>
  );
}

/**
 * ONE MARK - the stamp, the heading, the body, and the line set alone.
 *
 * Small structured Montserrat numeral against large Cormorant heading is the
 * page's whole rhythm; the monogram beside the numeral is the hallmark motif
 * running the length of the scroll.
 */
function MarkScene({
  mark,
  tone,
  onLight = false,
  emphasis = false,
  children,
}: {
  mark: Mark;
  tone: "green" | "light" | "deep";
  onLight?: boolean;
  /** Mark 04 only - the boldest claim gets the largest setting. */
  emphasis?: boolean;
  children?: ReactNode;
}) {
  return (
    <Section
      id={mark.id}
      spacing="lg"
      tone={tone}
      className={onLight ? "u-on-light" : undefined}
    >
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-3">
            <Reveal variant="settle">
              <span className="flex items-center gap-3">
                <Monogram className="h-7 w-7" decorative />
                <span className="font-body text-[0.7rem] tracking-[0.24em] text-gold">
                  {mark.n}
                </span>
              </span>
            </Reveal>
          </div>

          <div className="md:col-span-9">
            <SplitLines delay={0.04}>
              <h2
                className={cn(
                  "font-display font-light leading-[1.04] tracking-[var(--tracking-4)] text-text-strong",
                  emphasis
                    ? "text-[clamp(2.6rem,6.4vw,5rem)]"
                    : "text-[clamp(1.9rem,4vw,3.2rem)]",
                )}
              >
                {mark.heading.split("\n").map((l, i) => (
                  <span key={i} className="block">
                    {l}
                  </span>
                ))}
              </h2>
            </SplitLines>

            <div className="mt-8 flex max-w-xl flex-col gap-5">
              {mark.body.map((para, i) => (
                <Reveal
                  key={i}
                  as="p"
                  delay={0.08 + i * 0.05}
                  className="font-body text-[1.02rem] font-light leading-relaxed text-text-muted"
                >
                  {para}
                </Reveal>
              ))}
            </div>

            {children}

            {mark.pull ? (
              <Reveal delay={0.12}>
                <p
                  className={cn(
                    "mt-14 max-w-2xl border-t border-line pt-8 font-display font-light italic leading-snug text-text-strong",
                    emphasis
                      ? "text-[clamp(1.8rem,3.4vw,2.6rem)]"
                      : "text-[length:var(--step-2)]",
                  )}
                >
                  {mark.pull.split("\n").map((l, i) => (
                    <span key={i} className="block">
                      {l}
                    </span>
                  ))}
                </p>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
