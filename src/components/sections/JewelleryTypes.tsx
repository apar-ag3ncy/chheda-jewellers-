import Link from "next/link";
import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { jewelleryTypes } from "@/lib/content/jewellery-types";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function JewelleryTypes() {
  // Beige: the page's grounds strictly alternate dark emerald and cream,
  // and this section sits between two darks. The tiles are photographs on
  // deep gradients, so each re-scopes itself u-on-dark below.
  return (
    <Section id="jewellery-types" spacing="lg" tone="transparent" data-bg="beige" className="u-on-light">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Types of Jewellery"
            title={"Necklaces, earrings,\nrings, haath paan"}
            size="md"
          />
          <Reveal
            as="p"
            className="max-w-sm pb-2 font-body text-[0.95rem] font-light leading-relaxed text-text-muted"
          >
            Four ornaments, four moments - from the necklace that sets the tone
            to the haath paan that crowns the hand.
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:mt-20 md:grid-cols-4 md:gap-5">
          {jewelleryTypes.map((type, i) => (
            <Reveal
              key={type.id}
              delay={i * 0.07}
              className={i % 2 === 1 ? "md:mt-14" : ""}
            >
              <Link
                href={type.href}
                className="u-on-dark group relative block aspect-[3/4] overflow-hidden bg-green-deep"
              >
                <Image
                  src={type.image.src}
                  alt={type.image.alt}
                  placeholder="blur" blurDataURL={EMERALD_LQIP} fill
                  sizes="(max-width: 768px) 50vw, 24vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-lux)] group-hover:scale-105"
                  style={{ objectPosition: type.image.focus ?? "50% 40%" }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-green-deep/95 via-green-deep/25 to-transparent transition-opacity duration-500 group-hover:from-green-deep"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="u-eyebrow mb-2 text-gold-light/90">{type.subtitle}</p>
                  <h3 className="font-display text-2xl font-light text-text-strong md:text-[1.9rem]">
                    {type.name}
                  </h3>
                  {/* Was hidden outright below md and hover-gated above it,
                      so on a landscape tablet the description existed and
                      could never be opened. Now it is present wherever there
                      is no pointer, and unfolds where there is one. */}
                  <div className="cj-hover-reveal">
                    <div>
                      <p className="pt-2 font-body text-[0.82rem] font-light leading-relaxed text-text-muted">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
