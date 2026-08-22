import Link from "next/link";
import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { categoryList } from "@/lib/content/categories";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { JewelleryTypes } from "@/components/sections";

export const metadata = pageMetadata({
  title: "All Jewellery",
  description:
    "Explore the House of Chheda — heritage gold, certified diamonds and regal polki, each an editorial collection made to be worn and inherited.",
  path: "/jewellery",
});

export default function JewelleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="The House of Chheda"
        title={"All Jewellery"}
        intro="Three worlds under one roof — heritage gold, certified diamonds, and regal polki. Begin wherever your story does."
      />

      <Section spacing="md" tone="green">
        <Container>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {categoryList.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.08}>
                <Link
                  href={`/jewellery/${c.slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-[var(--radius-brand)] bg-green-deep"
                >
                  <Image
                    src={c.hero.src}
                    alt={c.hero.alt}
                    placeholder="blur" blurDataURL={EMERALD_LQIP} fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-lux)] group-hover:scale-105"
                    style={{ objectPosition: c.hero.focus ?? "50% 35%" }}
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-green-deep/90 via-green-deep/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <p className="u-eyebrow mb-2 text-gold-light/90">{c.eyebrow}</p>
                    <h2 className="font-display text-4xl font-light text-text-strong">
                      {c.name}
                    </h2>
                    <p className="mt-2 max-h-40 overflow-hidden font-body text-[0.85rem] font-light leading-relaxed text-text-muted opacity-100 transition-all duration-500 md:max-h-0 md:opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100">
                      {c.intro}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <JewelleryTypes />

      <Section spacing="md" tone="deep">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 className="max-w-xl font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-light leading-tight">
            Not sure where to begin? Come sit with us.
          </h2>
          <Button href="/offers-and-plans" variant="primary" size="lg" withArrow>
            Book a viewing
          </Button>
        </Container>
      </Section>
    </>
  );
}
