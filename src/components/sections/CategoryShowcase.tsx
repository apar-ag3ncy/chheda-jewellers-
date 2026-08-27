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
import { cn } from "@/lib/cn";

/** Reusable editorial showcase for a jewellery category (gold/diamond/polki). */
export function CategoryShowcase({ category }: { category: CategoryPage }) {
  const others = categoryList.filter((c) => c.slug !== category.slug);

  return (
    <>
      {/* Hero band */}
      <section className="relative flex min-h-[82svh] w-full items-end overflow-hidden bg-green-deep">
        <Image
          src={category.hero.src}
          alt={category.hero.alt}
          placeholder="blur" blurDataURL={EMERALD_LQIP} fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: category.hero.focus ?? "50% 35%" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, color-mix(in srgb, var(--green-deep) 72%, transparent) 0%, color-mix(in srgb, var(--green-deep) 28%, transparent) 34%, transparent 56%), radial-gradient(120% 110% at 8% 96%, color-mix(in srgb, var(--green-deep) 46%, transparent) 0%, transparent 62%)",
          }}
        />
        <Container className="relative pb-16 pt-32 md:pb-24">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-body text-[0.7rem] uppercase tracking-[0.16em] text-text-muted">
              <li>
                <Link href="/jewellery" className="inline-block py-2 hover:text-text-strong">
                  All Jewellery
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-gold-light">{category.name}</li>
            </ol>
          </nav>
          <p className="u-eyebrow mb-5">{category.eyebrow}</p>
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-light leading-[0.96]">
            {category.headline.split("\n").map((l, i) => (
              <span key={i} className="block">
                {l}
              </span>
            ))}
          </h1>
          <p className="mt-7 max-w-lg font-body text-[1.02rem] font-light leading-relaxed text-text">
            {category.intro}
          </p>
        </Container>
      </section>

      {/* Signatures */}
      <Section spacing="lg" tone="green">
        <Container>
          <div className="flex flex-col gap-14 md:gap-32">
            {category.signatures.map((sig, i) => {
              const flip = i % 2 === 1;
              return (
                <article
                  key={sig.id}
                  className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16"
                >
                  <div className={cn(flip && "md:order-2")}>
                    <ParallaxImage
                      src={sig.image.src}
                      alt={sig.image.alt}
                      focus={sig.image.focus}
                      className="aspect-[4/5] w-full"
                      sizes="(max-width: 768px) 100vw, 48vw"
                    />
                  </div>
                  <div className={cn("md:px-4", flip && "md:order-1")}>
                    <Reveal as="p" className="u-eyebrow mb-4">
                      {String(i + 1).padStart(2, "0")} - {category.name}
                    </Reveal>
                    <Reveal>
                      <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-light leading-tight">
                        {sig.title}
                      </h2>
                    </Reveal>
                    <Reveal
                      as="p"
                      delay={0.08}
                      className="mt-5 max-w-md font-body text-[1rem] font-light leading-relaxed text-text-muted"
                    >
                      {sig.description}
                    </Reveal>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Note + CTA */}
          <Reveal className="mt-16 rounded-[var(--radius-brand)] border border-line bg-green-soft/25 p-8 md:mt-32 md:p-12">
            <p className="max-w-2xl font-display text-[clamp(1.3rem,2.4vw,1.9rem)] font-light italic leading-snug text-text-strong">
              {category.note}
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Button href="/enquire" variant="primary" withArrow>
                Book a viewing
              </Button>
              <Button href="/live-gold-rate" variant="ghost">
                Today&rsquo;s gold rate
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── The picks - named pieces, not a bare image grid ──────────── */}
      <Section spacing="lg" tone="light" className="u-on-light">
        <Container>
          <SectionHeading
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
                    <h3 className="font-display text-[1.35rem] font-light leading-tight text-text-strong">
                      {pick.name}
                    </h3>
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
