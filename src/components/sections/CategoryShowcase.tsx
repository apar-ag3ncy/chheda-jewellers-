import { NextStep } from "@/components/ui/NextStep";
import { ScrollRail } from "@/components/motion/ScrollRail";
import { SplitLines } from "@/components/motion/SplitLines";
import { cn } from "@/lib/cn";
import Link from "next/link";
import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import type { CategoryPage } from "@/types/content";
import { categoryList } from "@/lib/content/categories";
import { PagePlate } from "@/components/ui/PagePlate";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

/**
 * Sub-folio per room. The rooms sit under /jewellery, which is folio I, so
 * they are numbered within it rather than taking numbers of their own.
 */
const ROOM_FOLIO: Record<CategoryPage["slug"], string> = {
  gold: "I.i",
  diamond: "I.ii",
  polki: "I.iii",
};

/**
 * THE HANG - how the picks sit on the wall at desktop width.
 *
 * Six identical tiles in a three-up grid said all six pieces were the same
 * weight, which is not how a tray is ever laid out. On a twelve-column grid
 * the picks pair off instead, one broad plate against one narrow one, the
 * broad side alternating left-right-left and the narrow plate dropped so the
 * pair reads as hung rather than ruled. The spare column beside each pair is
 * deliberate: the air is what makes it a composition.
 *
 * The drop always rides on the NARROW plate, and is sized so the two plates
 * in a pair finish within ~10px of each other. Put it on the broad plate and
 * the short one leaves a 250px hole beneath it - which is the difference
 * between a hang and a gap.
 *
 * Every plate keeps the 4:5 crop, so the per-image focus values - each one
 * checked against the real crop - stay valid at both scales.
 *
 * Below `lg` this is inert: two columns on tablet, one on phone, no offsets.
 */
const WIDE = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 576px";
const NARROW = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px";

const HANG = [
  { span: "lg:col-span-6", start: "lg:col-start-1", drop: "", plate: "wide", sizes: WIDE },
  { span: "lg:col-span-5", start: "lg:col-start-8", drop: "lg:mt-32", plate: "narrow", sizes: NARROW },
  { span: "lg:col-span-5", start: "lg:col-start-1", drop: "lg:mt-32", plate: "narrow", sizes: NARROW },
  { span: "lg:col-span-6", start: "lg:col-start-7", drop: "", plate: "wide", sizes: WIDE },
  { span: "lg:col-span-6", start: "lg:col-start-1", drop: "", plate: "wide", sizes: WIDE },
  { span: "lg:col-span-5", start: "lg:col-start-8", drop: "lg:mt-32", plate: "narrow", sizes: NARROW },
] as const;

/** Reusable editorial showcase for a jewellery category (gold/diamond/polki). */
export function CategoryShowcase({ category }: { category: CategoryPage }) {
  const others = categoryList.filter((c) => c.slug !== category.slug);

  return (
    <>
      {/* The rooms open the same way every other interior page does, rather
          than starting cold on cream with a hand-tuned top padding. */}
      <PagePlate
        folio={ROOM_FOLIO[category.slug]}
        eyebrow={category.eyebrow}
        title={`The ${category.name.toLowerCase()}\nroom`}
        intro={category.intro}
        plate={category.hero}
        meta={[
          { label: "Room", value: category.name },
          {
            label: "Pieces shown",
            value: String(category.picks.length).padStart(2, "0"),
          },
          { label: "Each piece", value: "One of a kind" },
          {
            label: "Also in the house",
            value: others.map((o) => o.name).join(" · "),
          },
        ]}
      />

      {/* ── The picks - named pieces, not a bare image grid ──────────── */}
      <Section spacing="lg" tone="light" className="u-on-light">
        <Container>
          <div className="max-w-3xl">
            <Reveal as="p" className="u-eyebrow mb-5">
              Inside the {category.name} room
            </Reveal>
            <SplitLines delay={0.04}>
              <h2 className="font-display text-[length:var(--step-5)] font-light leading-[var(--leading-5)] tracking-[var(--tracking-5)] text-text-strong">
                <span className="block">Pieces from the</span>
                <span className="block">{category.name.toLowerCase()} counter</span>
              </h2>
            </SplitLines>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-6 max-w-xl font-body text-[length:var(--step-0)] font-light leading-relaxed text-text-muted"
            >
              A small selection, named as we name them in the shop. Every piece
              is one of a kind - what is on the counter changes, so treat these
              as the range rather than a catalogue.
            </Reveal>
          </div>

          {/* Capped measure: at full container width a 4:5 plate runs taller
              than the viewport, so the wall is set to a page rather than a
              billboard. The rail is inside the cap so it tracks the plates
              rather than floating out in the page gutter. */}
          <div className="relative mx-auto mt-16 max-w-6xl md:mt-24">
            <ScrollRail
              count={category.picks.length}
              className="pointer-events-none absolute -left-10 top-0 hidden h-full xl:block"
            />

            <ul className="grid grid-cols-1 items-start gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16">
              {category.picks.map((pick, i) => {
                const hang = HANG[i % HANG.length]!;
                return (
                <Reveal
                  as="li"
                  key={pick.id}
                  delay={(i % 2) * 0.08}
                  variant="mask"
                  className={cn("group", hang.span, hang.start, hang.drop)}
                >
                <article>
                  <div className="relative overflow-hidden rounded-[var(--radius-brand)] bg-green-deep shadow-[0_3px_8px_rgba(6,36,27,0.16),0_18px_38px_-14px_rgba(6,36,27,0.42)]">
                    <ParallaxImage
                      src={pick.image.src}
                      alt={pick.image.alt}
                      focus={pick.image.focus}
                      className="aspect-[4/5] w-full"
                      intensity={0.06}
                      sizes={hang.sizes}
                    />
                    {/* The room's own mark, so a saved or shared frame still
                        says whose counter it came from. */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute right-3 top-3 rounded-full bg-[#04170f]/70 px-2.5 py-1 font-body text-[0.5rem] uppercase tracking-[0.22em] text-beige/85 backdrop-blur-[2px]"
                    >
                      {category.name}
                    </span>
                  </div>

                  <div className="mt-5 flex items-baseline gap-4">
                    <span
                      aria-hidden
                      className="shrink-0 font-body text-[0.62rem] tracking-[0.18em] text-gold"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* h2, not h3: the signature blocks that used to sit
                        between this and the page title were removed, so h3
                        would skip a level. */}
                    <h2
                      className={cn(
                        "font-display font-light leading-tight text-text-strong",
                        hang.plate === "wide"
                          ? "text-[clamp(1.5rem,2.2vw,2rem)]"
                          : "text-[1.3rem]",
                      )}
                    >
                      {pick.name}
                    </h2>
                  </div>
                  <p className="mt-2 pl-[2.1rem] font-body text-[0.68rem] uppercase tracking-[0.16em] text-gold">
                    {pick.spec}
                  </p>
                  <p className="mt-2.5 max-w-md pl-[2.1rem] font-body text-[0.88rem] font-light leading-relaxed text-text-muted">
                    {pick.note}
                  </p>

                  {/* No action on a pick, by design. The house does not sell
                      from the page and each of these is one of a kind, so the
                      card states the piece and stops there. */}
                </article>
                </Reveal>
                );
              })}
            </ul>
          </div>

          {/* The room's own closing line - it used to sit under the signature
              blocks, which are gone, and it is the only sentence on the page
              written specifically about this metal. */}
          <Reveal
            as="p"
            className="mx-auto mt-24 max-w-xl text-center font-display text-[length:var(--step-2)] font-light italic leading-snug text-text-strong"
          >
            {category.note}
          </Reveal>
        </Container>
      </Section>

      {/* Cross-links */}
      <Section spacing="md" tone="green">
        <Container>
          <p className="u-eyebrow mb-8">Continue exploring</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {others.map((c) => (
              <Link
                key={c.slug}
                href={`/jewellery/${c.slug}`}
                className="group relative block aspect-[16/9] overflow-hidden rounded-[var(--radius-brand)] bg-green-deep"
              >
                <Image
                  src={c.hero.src}
                  alt={c.hero.alt}
                  placeholder="blur" blurDataURL={EMERALD_LQIP} fill
                  sizes="(max-width: 640px) 100vw, 44vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-lux)] group-hover:scale-105"
                  style={{ objectPosition: c.hero.focus ?? "50% 40%" }}
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-green-deep/85 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <span className="font-display text-3xl font-light text-text-strong">
                    {c.name}
                  </span>
                  <span aria-hidden className="font-body text-gold transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* The third door out of a room is the atelier - a visitor holding
              family gold in mind should not have to back out to find it. */}
          <Link
            href="/bespoke"
            className="group mt-5 flex items-center justify-between rounded-[var(--radius-brand)] border border-line px-6 py-5 transition-colors hover:border-gold"
          >
            <span>
              <span className="block font-display text-xl font-light text-text-strong">
                Or have it drawn instead
              </span>
              <span className="mt-1 block font-body text-[0.72rem] uppercase tracking-[0.16em] text-text-muted">
                The atelier - bespoke &amp; remade heirlooms
              </span>
            </span>
            <span aria-hidden className="font-body text-gold transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </Container>
      </Section>
      {/* The cross-links above move sideways between rooms; without this the
          page is a loop - gold to diamond to polki and back. This is the way
          out of the loop, and the same band every other page ends on. */}
      <NextStep
        tone="deep"
        eyebrow={`When the ${category.name.toLowerCase()} room is the one`}
        title="Nothing here photographs the way it looks in the hand."
        primary={{ href: "/chheda-promise", label: "How we price it" }}
      />
    </>
  );
}
