import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { campaignWall } from "@/lib/content/collections";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Monogram } from "@/components/ui/Monogram";
import { Wordmark } from "@/components/ui/Wordmark";
import { cn } from "@/lib/cn";

/**
 * COLLECTIONS - the campaign wall.
 *
 * Nine frames from the house campaigns, each carrying the same small house
 * slate at its head - the way a maison stamps every advertisement it takes
 * out. The repetition IS the design: one brand, nine moods, no tile allowed
 * to forget whose wall it is.
 *
 * Hung, not packed. The frames used to butt together on a 3px dark gutter,
 * which read as a contact sheet - correct when the section was emerald and
 * the gutter was the design. On cream that packing just looked crowded, so
 * each frame is now its own plate with real air around it and its title set
 * beneath it like a gallery label rather than hidden until hover. The space
 * between the frames is the section's ground showing through, which is what
 * makes them read as nine separate works instead of one printed sheet.
 *
 * Interaction is kept to what a poster wall can do: a slow zoom under the
 * pointer. No state, no client JS - the whole section is server-rendered.
 *
 * It opens the scroll directly under the hero and directly above the promise
 * band, which is emerald - two greens touching would have merged into one
 * long block.
 */
export function Collections() {
  return (
    <Section
      id="collections"
      spacing="lg"
      tone="transparent"
      data-bg="beige"
      className="u-on-light"
    >
      <Container>
        <SectionHeading
          eyebrow="Collections"
          title={"Campaigns, not\n*catalogues*"}
          intro="Nine frames from the house campaigns, signed the way we sign everything."
          size="lg"
        />
      </Container>

      {/* ── The wall ──────────────────────────────────────────────────── */}
      <Container className="mt-14 md:mt-20">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-14">
          {campaignWall.map((tile, i) => {
            // Nine frames in two mobile columns leaves an orphan; the last
            // one goes full-width there and reads as the wall's finale.
            const isFinale = i === campaignWall.length - 1;
            return (
              <Reveal
                as="li"
                key={tile.id}
                delay={(i % 3) * 0.06}
                className={cn("group", isFinale && "col-span-2 md:col-span-1")}
              >
                <figure>
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-[var(--radius-brand)] bg-green-deep",
                      isFinale ? "aspect-[3/2] md:aspect-[3/4]" : "aspect-[3/4]",
                    )}
                  >
                    <Image
                      src={tile.image.src}
                      alt={tile.image.alt}
                      placeholder="blur"
                      blurDataURL={EMERALD_LQIP}
                      fill
                      sizes="(max-width: 640px) 46vw, (max-width: 768px) 44vw, 30vw"
                      className="object-cover transition-transform duration-[1800ms] ease-[var(--ease-cinema)] group-hover:scale-[1.045]"
                      style={{ objectPosition: tile.image.focus ?? "50% 30%" }}
                    />

                    {/* Legibility for the slate - never a flat wash. */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0.42) 0%, transparent 30%)",
                      }}
                    />

                    {/* ── The house slate - identical on every frame ──── */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-center pt-4 md:pt-6">
                      <Monogram className="h-5 w-5 opacity-90 md:h-6 md:w-6" />
                      <Wordmark
                        layout="stacked"
                        className="mt-2 text-[9px] md:text-[11px]"
                      />
                      <span className="mt-1.5 hidden font-body text-[0.5rem] uppercase tracking-[0.3em] text-beige/70 md:block">
                        Gold · Diamond · Polki
                      </span>
                    </div>
                  </div>

                  {/* ── The gallery label, in the air below the frame ─── */}
                  <figcaption className="mt-3 flex items-baseline gap-2.5 md:mt-4">
                    <span
                      aria-hidden
                      className="mt-[0.45em] h-px w-4 shrink-0 bg-line-strong transition-[width] duration-700 ease-[var(--ease-lux)] group-hover:w-7"
                    />
                    <span className="font-body text-[0.62rem] uppercase tracking-[0.2em] text-text-muted">
                      {tile.caption}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </ul>
      </Container>

      <Container>
        <Reveal className="mt-14 flex flex-wrap items-center gap-4 md:mt-20">
          <Button href="/jewellery" variant="onLight" size="lg" withArrow>
            View all jewellery
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
