import Link from "next/link";
import Image from "next/image";
import type { CategoryPage } from "@/types/content";
import { categoryList } from "@/lib/content/categories";
import { Section, Container } from "@/components/ui/Section";
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
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: category.hero.focus ?? "50% 35%" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--green-deep) 4%, transparent 52%), linear-gradient(to right, color-mix(in srgb,var(--green-deep) 72%, transparent), transparent 60%)",
          }}
        />
        <Container className="relative pb-16 pt-32 md:pb-24">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-body text-[0.7rem] uppercase tracking-[0.16em] text-text-muted">
              <li>
                <Link href="/jewellery" className="hover:text-text-strong">
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
          <div className="flex flex-col gap-20 md:gap-32">
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
                      {String(i + 1).padStart(2, "0")} — {category.name}
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
          <Reveal className="mt-24 rounded-[var(--radius-brand)] border border-line bg-green-soft/25 p-8 md:mt-32 md:p-12">
            <p className="max-w-2xl font-display text-[clamp(1.3rem,2.4vw,1.9rem)] font-light italic leading-snug text-text-strong">
              {category.note}
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Button href="/offers-and-plans" variant="primary" withArrow>
                Book a viewing
              </Button>
              <Button href="/live-gold-rate" variant="ghost">
                Today&rsquo;s gold rate
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Cross-links */}
      <Section spacing="md" tone="deep">
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
                  fill
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
        </Container>
      </Section>
    </>
  );
}
