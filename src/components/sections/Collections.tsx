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
 * Nine frames hung edge to edge like a run of campaign posters, and every
 * tile carries the same small house slate at its head - the way a maison
 * stamps every advertisement it takes out. The repetition IS the design:
 * one brand, nine moods, no tile allowed to forget whose wall it is.
 *
 * Interaction is kept to what a poster wall can do: a slow zoom under the
 * pointer and the piece's name surfacing at the foot of the frame. No state,
 * no client JS - the whole section is server-rendered.
 *
 * Hung on cream rather than emerald. It opens the scroll directly under the
 * hero and directly above the promise band, which is emerald - two greens
 * touching would have merged into one long block. Cream also lets the dark
 * gutter read as a frame around the whole wall.
 */
export function Collections() {
  return (
    <Section id="collections" spacing="lg" tone="transparent" data-bg="beige" className="u-on-light">
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
        <ul className="grid grid-cols-2 gap-[3px] overflow-hidden rounded-[var(--radius-brand)] bg-green-deep p-[3px] md:grid-cols-3">
          {campaignWall.map((tile, i) => (
            <Reveal
              as="li"
              key={tile.id}
              delay={(i % 3) * 0.05}
              className={cn(
                // Nine tiles in two mobile columns leaves an orphan; the last
                // frame goes full-width there and reads as the wall's finale.
                "group relative aspect-[3/4] overflow-hidden bg-green-deep",
                i === campaignWall.length - 1 && "col-span-2 aspect-[3/2] md:col-span-1 md:aspect-[3/4]",
              )}
            >
              <Image
                src={tile.image.src}
                alt={tile.image.alt}
                placeholder="blur"
                blurDataURL={EMERALD_LQIP}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1800ms] ease-[var(--ease-cinema)] group-hover:scale-[1.045]"
                style={{ objectPosition: tile.image.focus ?? "50% 30%" }}
              />

              {/* Legibility for the slate and the caption - never a flat wash. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 26%, transparent 70%, rgba(0,0,0,0.45) 100%)",
                }}
              />

              {/* ── The house slate - identical on every tile ─────────── */}
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

              {/* ── The plate caption, surfacing on hover ─────────────── */}
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-4 md:pb-5">
                <span className="translate-y-1 font-body text-[0.62rem] uppercase tracking-[0.22em] text-offwhite/90 opacity-80 transition-all duration-700 ease-[var(--ease-lux)] group-hover:translate-y-0 group-hover:opacity-100 md:opacity-0">
                  {tile.caption}
                </span>
              </figcaption>
            </Reveal>
          ))}
        </ul>
      </Container>

      <Container>
        <Reveal className="mt-12 flex flex-wrap items-center gap-4">
          <Button href="/jewellery" variant="onLight" size="lg" withArrow>
            View all jewellery
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
