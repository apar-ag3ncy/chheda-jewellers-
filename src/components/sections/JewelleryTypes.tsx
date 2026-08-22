import Link from "next/link";
import Image from "next/image";
import { jewelleryTypes } from "@/lib/content/jewellery-types";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function JewelleryTypes() {
  return (
    <Section id="jewellery-types" spacing="lg" tone="transparent" data-bg="deep">
      <Container>
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
          <SectionHeading
            eyebrow="Types of Jewellery"
            title={"For every part\nof the story"}
            size="lg"
          />
          <Reveal
            as="p"
            className="max-w-sm pb-2 font-body text-[0.95rem] font-light leading-relaxed text-text-muted"
          >
            Four ornaments, four moments — from the necklace that sets the tone
            to the hathphool that crowns the hand.
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
                className="group relative block aspect-[3/4] overflow-hidden bg-green-deep"
              >
                <Image
                  src={type.image.src}
                  alt={type.image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 24vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-lux)] group-hover:scale-105"
                  style={{ objectPosition: type.image.focus ?? "50% 40%" }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-green-deep/72 via-green-deep/5 to-transparent transition-opacity duration-500 group-hover:from-green-deep/82"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="u-eyebrow mb-2 text-gold-light/90">{type.subtitle}</p>
                  <h3 className="font-display text-2xl font-light text-text-strong md:text-[1.9rem]">
                    {type.name}
                  </h3>
                  <p className="mt-2 max-h-32 overflow-hidden font-body text-[0.82rem] font-light leading-relaxed text-text-muted opacity-100 transition-all duration-500 ease-[var(--ease-lux)] md:max-h-0 md:opacity-0 md:group-hover:max-h-24 md:group-hover:opacity-100">
                    {type.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
