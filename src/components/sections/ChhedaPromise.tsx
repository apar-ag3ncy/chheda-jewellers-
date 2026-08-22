import { promiseIntro, promiseValues } from "@/lib/content/promise";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Button } from "@/components/ui/Button";

export function ChhedaPromise() {
  return (
    <Section id="chheda-promise" spacing="lg" tone="transparent" data-bg="green">
      <Container>
        <SectionHeading
          eyebrow={promiseIntro.eyebrow}
          title={promiseIntro.headline}
          intro={promiseIntro.body}
          size="lg"
          className="max-w-3xl"
        />

        <div className="mt-14 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-12 md:gap-16">
          {/* Portrait */}
          <div className="md:col-span-5">
            <ParallaxImage
              src="/media/promise/promise-01.jpg"
              alt="Model in red beside an emerald pillar, in fine gold jewellery"
              focus="50% 30%"
              className="aspect-[4/5] w-full"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
          </div>

          {/* Values */}
          <div className="md:col-span-7 md:pl-8">
            <ul className="flex flex-col">
              {promiseValues.map((value, i) => (
                <Reveal
                  as="li"
                  key={value.id}
                  delay={i * 0.05}
                  className="group flex gap-6 border-t border-line py-7 first:border-t-0 first:pt-0 md:gap-10"
                >
                  <span className="font-display text-2xl font-light text-gold md:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-light text-text-strong md:text-[1.7rem]">
                      {value.title}
                    </h3>
                    <p className="mt-2 max-w-md font-body text-[0.92rem] font-light leading-relaxed text-text-muted">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-10">
              <Button href="/chheda-promise" variant="ghost" withArrow>
                Read our full story
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
