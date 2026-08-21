import { promiseIntro, promiseStory, promiseValues } from "@/lib/content/promise";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Button } from "@/components/ui/Button";

export const metadata = pageMetadata({
  title: "The Chheda Promise",
  description:
    "The values behind Chheda Jewellers — hallmarked purity, transparent pricing, handcrafted artistry and a lifetime of trust.",
  path: "/chheda-promise",
});

export default function ChhedaPromisePage() {
  return (
    <>
      <PageHeader
        eyebrow={promiseIntro.eyebrow}
        title={promiseIntro.headline}
        intro={promiseIntro.body}
      />

      {/* Story chapters */}
      <Section spacing="lg" tone="green" className="u-vignette">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <ParallaxImage
                src="/media/promise/promise-01.jpg"
                alt="A quiet portrait in fine gold jewellery"
                focus="50% 28%"
                className="aspect-[4/5] w-full md:sticky md:top-28"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>
            <div className="md:col-span-7 md:pl-6">
              <ol className="flex flex-col">
                {promiseStory.chapters.map((ch, i) => (
                  <Reveal
                    as="li"
                    key={ch.id}
                    delay={i * 0.05}
                    className="border-t border-line py-10 first:border-t-0 first:pt-0"
                  >
                    <span className="font-display text-2xl font-light text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-3 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-tight text-text-strong">
                      {ch.title}
                    </h2>
                    <p className="mt-4 max-w-lg font-body text-[1rem] font-light leading-relaxed text-text-muted">
                      {ch.body}
                    </p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      {/* The four promises */}
      <Section spacing="lg" tone="deep">
        <Container>
          <Reveal as="p" className="u-eyebrow mb-10">
            Four promises we keep
          </Reveal>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-brand)] border border-line bg-line sm:grid-cols-2">
            {promiseValues.map((v) => (
              <div key={v.id} className="bg-green-deep p-8 md:p-10">
                <h3 className="font-display text-2xl font-light text-text-strong">{v.title}</h3>
                <p className="mt-3 font-body text-[0.92rem] font-light leading-relaxed text-text-muted">
                  {v.description}
                </p>
              </div>
            ))}
          </div>

          <Reveal className="mt-14 flex flex-wrap gap-4">
            <Button href="/offers-and-plans" variant="primary" size="lg" withArrow>
              Book a visit
            </Button>
            <Button href="/jewellery" variant="ghost" size="lg">
              Explore the jewellery
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
