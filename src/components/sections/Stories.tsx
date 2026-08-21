import { stories } from "@/lib/content/stories";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function Stories() {
  return (
    <Section id="stories" spacing="lg" tone="green">
      <Container>
        <SectionHeading
          eyebrow="Stories by Chheda"
          title={"Not products.\nPieces with a past"}
          intro="A few of our best-loved pieces, told the way they deserve to be — as the moments they were made for."
          size="lg"
          align="center"
          className="mx-auto items-center text-center"
        />
      </Container>

      <div className="mt-14 flex flex-col gap-24 md:mt-20 md:gap-36">
        {stories.map((story, i) => {
          const flip = i % 2 === 1;
          return (
            <Container key={story.id}>
              <article className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
                <div className={cn(flip && "md:order-2")}>
                  <ParallaxImage
                    src={story.image.src}
                    alt={story.image.alt}
                    focus={story.image.focus}
                    className="aspect-[4/5] w-full"
                    sizes="(max-width: 768px) 100vw, 48vw"
                  />
                </div>
                <div className={cn("md:px-4", flip && "md:order-1")}>
                  <Reveal as="p" className="u-eyebrow mb-5">
                    {story.kicker}
                  </Reveal>
                  <Reveal delay={0.05}>
                    <h3 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.02]">
                      {story.title}
                    </h3>
                  </Reveal>
                  <Reveal
                    as="p"
                    delay={0.1}
                    className="mt-6 max-w-md font-body text-[1rem] font-light leading-relaxed text-text-muted"
                  >
                    {story.excerpt}
                  </Reveal>
                  <Reveal delay={0.15} className="mt-8">
                    <Button href={story.href} variant="ghost" withArrow>
                      Read the story
                    </Button>
                  </Reveal>
                </div>
              </article>
            </Container>
          );
        })}
      </div>
    </Section>
  );
}
