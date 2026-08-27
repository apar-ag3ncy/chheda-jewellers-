import Link from "next/link";
import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import type { CategoryPage } from "@/types/content";
import { categoryList } from "@/lib/content/categories";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Button } from "@/components/ui/Button";

/** Reusable editorial showcase for a jewellery category (gold/diamond/polki). */
export function CategoryShowcase({ category }: { category: CategoryPage }) {
  const others = categoryList.filter((c) => c.slug !== category.slug);

  return (
    <>

      {/* ── The picks - named pieces, not a bare image grid ──────────── */}
      <Section spacing="lg" tone="light" className="u-on-light pt-28 md:pt-36">
        <Container>
          {/* h1, because the hero band that used to carry it is gone and a
              page still needs exactly one top-level heading. */}
          <SectionHeading
            as="h1"
            eyebrow={`Inside the ${category.name} room`}
            title={`Pieces from the\n${category.name.toLowerCase()} counter`}
            intro="A small selection, named as we name them in the shop. Every piece is one of a kind - what is on the counter changes, so treat these as the range rather than a catalogue."
            size="lg"
          />

          <ul className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {category.picks.map((pick, i) => (
              <Reveal as="li" key={pick.id} delay={(i % 3) * 0.06} className="group">
                <article>
                  <div className="relative overflow-hidden rounded-[var(--radius-brand)] bg-green-deep shadow-[0_3px_8px_rgba(6,36,27,0.16),0_18px_38px_-14px_rgba(6,36,27,0.42)]">
                    <ParallaxImage
                      src={pick.image.src}
                      alt={pick.image.alt}
                      focus={pick.image.focus}
                      className="aspect-[4/5] w-full"
                      intensity={0.06}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
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

                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    {/* h2, not h3: the signature blocks that used to sit
                        between this and the page title were removed, so h3
                        would skip a level. */}
                    <h2 className="font-display text-[1.35rem] font-light leading-tight text-text-strong">
                      {pick.name}
                    </h2>
                    <span
                      aria-hidden
                      className="shrink-0 font-body text-[0.62rem] tracking-[0.18em] text-gold"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-1.5 font-body text-[0.68rem] uppercase tracking-[0.16em] text-gold">
                    {pick.spec}
                  </p>
                  <p className="mt-2.5 font-body text-[0.88rem] font-light leading-relaxed text-text-muted">
                    {pick.note}
                  </p>

                  {/* Enquire, never "add to cart" - the house does not sell
                      from the page, and each of these is one of a kind. */}
                  <Link
                    href={`/enquire?intent=browse&piece=${encodeURIComponent(pick.name)}`}
                    className="mt-4 inline-flex min-h-[44px] items-center gap-2 font-body text-[0.66rem] uppercase tracking-[0.16em] text-text-strong underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-gold"
                  >
                    Ask to see this
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                      &rarr;
                    </span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-16 flex flex-wrap items-center justify-center gap-4">
            <Button href="/enquire" variant="onLight" size="lg" withArrow>
              Book a viewing
            </Button>
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
    </>
  );
}
