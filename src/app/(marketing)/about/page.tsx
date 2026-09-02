import type { ReactNode } from "react";
import { NextStep } from "@/components/ui/NextStep";
import { pageMetadata } from "@/lib/seo";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Sheen } from "@/components/motion/Sheen";
import { Monogram } from "@/components/ui/Monogram";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { aboutHero, marks, proofPlates, proofPoints, type Mark } from "@/lib/content/about";
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

      {origin ? <MarkScene mark={origin} i={0} tone="green" /> : null}
      {intent ? <MarkScene mark={intent} i={1} tone="light" onLight /> : null}

      {/* Proof is the one mark that shows rather than tells. */}
      {proof ? (
        <MarkScene mark={proof} i={2} tone="green">
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

          {/* Craft is the one claim here a photograph carries better than a
              sentence, so Proof is the mark that shows. Three kinds of work,
              not three views of one. */}
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mt-10 md:gap-5">
            {proofPlates.map((pl, i) => (
              <Reveal as="li" key={pl.src} variant="mask" delay={i * 0.07}>
                <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-brand)] bg-green-deep">
                  <Image
                    src={pl.src}
                    alt={pl.alt}
                    placeholder="blur"
                    blurDataURL={EMERALD_LQIP}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1400px) 24vw, 340px"
                    className="object-cover"
                    style={{ objectPosition: pl.focus }}
                  />
                </div>
              </Reveal>
            ))}
          </ul>
        </MarkScene>
      ) : null}

      {/* The moat, on its own ground and at the largest setting. */}
      {singularity ? <MarkScene mark={singularity} i={3} tone="deep" emphasis /> : null}

      {/* Belonging closes on the two counters, named from config. */}
      {belonging ? (
        <MarkScene mark={belonging} i={4} tone="green">
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
  i,
  tone,
  onLight = false,
  emphasis = false,
  children,
}: {
  mark: Mark;
  /** Position on the page - only used to alternate which edge a plate sits on. */
  i: number;
  tone: "green" | "light" | "deep";
  onLight?: boolean;
  /** Mark 04 only - the boldest claim gets the largest setting. */
  emphasis?: boolean;
  children?: ReactNode;
}) {
  const side = mark.plate?.layout === "side";
  // Odd marks take the plate on the left, so the eye crosses the page as it
  // descends instead of running down one rail.
  const plateFirst = side && i % 2 === 1;

  const heading = (
    <SplitLines delay={0.04}>
      <h2
        className={cn(
          "font-display font-light leading-[1.04] tracking-[var(--tracking-4)] text-text-strong",
          emphasis
            ? "text-[clamp(2.6rem,6.4vw,5rem)]"
            : "text-[clamp(1.9rem,4vw,3.2rem)]",
        )}
      >
        {mark.heading.split("\n").map((l, n) => (
          <span key={n} className="block">
            {l}
          </span>
        ))}
      </h2>
    </SplitLines>
  );

  const stamp = (
    <Reveal variant="settle" className="mb-7 block">
      <span className="flex items-center gap-3">
        <Monogram className="h-7 w-7" decorative />
        <span className="font-body text-[0.7rem] tracking-[0.24em] text-gold">
          {mark.n}
        </span>
      </span>
    </Reveal>
  );

  const prose = (
    <div className={cn("flex flex-col gap-5", side ? "mt-8" : "mt-8 max-w-xl")}>
      {mark.body.map((para, n) => (
        <Reveal
          key={n}
          as="p"
          delay={0.08 + n * 0.05}
          className="font-body text-[1.02rem] font-light leading-relaxed text-text-muted"
        >
          {para}
        </Reveal>
      ))}
    </div>
  );

  const pull = mark.pull ? (
    <Reveal delay={0.12}>
      <p
        className={cn(
          "mt-14 max-w-2xl border-t border-line pt-8 font-display font-light italic leading-snug text-text-strong",
          emphasis
            ? "text-[clamp(1.8rem,3.4vw,2.6rem)]"
            : "text-[length:var(--step-2)]",
        )}
      >
        {mark.pull.split("\n").map((l, n) =>
          // The light crosses the emphasis mark only - the one claim on this
          // page that is meant to stop you. Everywhere else it is plain type.
          emphasis ? (
            <Sheen key={n} as="span" className="block" delay={0.4 + n * 0.12}>
              {l}
            </Sheen>
          ) : (
            <span key={n} className="block">
              {l}
            </span>
          ),
        )}
      </p>
    </Reveal>
  ) : null;

  /**
   * The plates carry no parallax on purpose. ParallaxImage over-scales its
   * layer by 1.18 to hide the drift, which re-crops the frame - and every
   * focus value on this page was chosen against the plain crop, with the
   * piece checked whole. A drifting frame would quietly undo that.
   */
  const plate = mark.plate ? (
    <Reveal variant="mask">
      <div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-brand)] bg-green-deep"
      >
        <Image
          src={mark.plate.src}
          alt={mark.plate.alt}
          placeholder="blur"
          blurDataURL={EMERALD_LQIP}
          fill
          // Measured: the side plate caps at 500px and the solo plate at 448
          // once the container stops growing, so a bare vw would keep asking
          // for bytes that never reach the screen.
          sizes={
            mark.plate.layout === "solo"
              ? "(max-width: 768px) 100vw, (max-width: 1400px) 32vw, 450px"
              : "(max-width: 768px) 100vw, (max-width: 1400px) 36vw, 500px"
          }
          className="object-cover"
          style={{ objectPosition: mark.plate.focus }}
        />
      </div>
    </Reveal>
  ) : null;

  return (
    <Section
      id={mark.id}
      spacing="lg"
      tone={tone}
      className={onLight ? "u-on-light" : undefined}
    >
      <Container>
        {side ? (
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-14">
            <div className={cn("md:col-span-7", plateFirst && "md:order-2")}>
              {stamp}
              {heading}
              {prose}
              {children}
              {pull}
            </div>
            <div className={cn("md:col-span-5", plateFirst && "md:order-1")}>
              {plate}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-2">{stamp}</div>
            <div className="md:col-span-10">
              {heading}
              {prose}
              {children}
              {/* One plate, centred, alone - the mark about a piece that
                  exists exactly once should not be a row of anything. */}
              {mark.plate?.layout === "solo" ? (
                <div className="mx-auto mt-14 max-w-md md:mt-16">{plate}</div>
              ) : null}
              {pull}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
