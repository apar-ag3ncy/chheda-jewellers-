import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { campaignWall } from "@/lib/content/collections";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * COLLECTIONS - the reference bento, replicated to its own measurements.
 *
 * No headline, no intro, no buttons - the only type is a one-word serif
 * label at the foot of six tiles, exactly the tiles the reference labels;
 * the 2x2 hero and the two closing tiles stay bare, as in the reference.
 *
 * The ground is cream, and each frame drops a minimal emerald-tinted
 * shadow - the reference's tiles sit ON their ground rather than in it, and
 * on a light ground that lift is what a soft shadow buys. The scroll themer
 * paints the cream via data-bg="beige"; hero into beige into the promise
 * band's green keeps the alternation legal.
 *
 * The geometry is a 5x3 bento: one tall frame anchoring the left, a 2x2 hero
 * in the middle of the run, two wide landscapes, and five squares around
 * them. Tiles are placed by the grid's own auto-flow rather than by explicit
 * line numbers - in this order the spans tessellate exactly, with no holes
 * and no need for `dense`.
 *
 * Cells hold the reference's own shape - 334x358, 7% taller than square - at
 * every width, because the container carries the measured aspect (859/549
 * across five columns, 25/81 across two) and the rows are `1fr`. No
 * breakpoint-specific row heights.
 */

/**
 * Span per tile, in DOM order. Presentation, not content, so it lives here
 * rather than in the content file - the frames would be the same nine if the
 * layout changed tomorrow.
 */
const SPANS: { base: string; wide: string }[] = [
  { base: "col-span-1 row-span-2", wide: "md:col-span-1 md:row-span-2" }, // tall anchor
  { base: "col-span-1 row-span-1", wide: "md:col-span-2 md:row-span-1" }, // wide
  { base: "col-span-1 row-span-1", wide: "md:col-span-1 md:row-span-1" },
  { base: "col-span-2 row-span-1", wide: "md:col-span-1 md:row-span-1" },
  { base: "col-span-1 row-span-1", wide: "md:col-span-1 md:row-span-1" },
  { base: "col-span-1 row-span-1", wide: "md:col-span-2 md:row-span-2" }, // hero
  { base: "col-span-2 row-span-1", wide: "md:col-span-1 md:row-span-1" },
  { base: "col-span-1 row-span-1", wide: "md:col-span-2 md:row-span-1" }, // wide
  { base: "col-span-1 row-span-1", wide: "md:col-span-1 md:row-span-1" },
];

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
        {/* Aspect ratios are the reference's own numbers: its cells measure
            334x358 (7% taller than square) with 12px gaps, which makes the
            5x3 grid 1718x1098 - aspect 859/549. The mobile 2x6 keeps the same
            cell ratio, which lands at 25/81. */}
        <ul className="grid aspect-[25/81] auto-rows-fr grid-cols-2 gap-2 md:aspect-[859/549] md:grid-cols-5 md:gap-3">
          {campaignWall.map((tile, i) => {
            const span = SPANS[i] ?? SPANS[SPANS.length - 1]!;
            return (
              <Reveal
                as="li"
                key={tile.id}
                delay={(i % 4) * 0.05}
                className={cn(
                  // rounded-[10px], not the brand's 2px token: the radius is part of
                  // the grid style being replicated, scoped to these tiles only.
                  "group relative overflow-hidden rounded-[10px] bg-green-deep",
                  // The lift - two layers, like a real cast: a tight contact
                  // shade plus a broad soft falloff. Tinted with the deep
                  // emerald rather than black so it belongs to the same world
                  // as the frames. The first cut used -12px spread on a 10px
                  // offset, which cancelled itself to near-invisibility.
                  "shadow-[0_3px_8px_rgba(6,36,27,0.18),0_18px_38px_-10px_rgba(6,36,27,0.5)]",
                  span.base,
                  span.wide,
                )}
              >
                <Image
                  src={tile.image.src}
                  alt={tile.image.alt}
                  placeholder="blur"
                  blurDataURL={EMERALD_LQIP}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover transition-transform duration-[1800ms] ease-[var(--ease-cinema)] group-hover:scale-[1.06]"
                  style={{ objectPosition: tile.image.focus ?? "50% 30%" }}
                />
                {tile.label ? (
                  <>
                    {/* The label's scrim - the reference fades every labelled
                        tile to dark at the foot so white type reads on any
                        photograph. */}
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 via-black/20 to-transparent"
                    />
                    <span className="absolute bottom-4 left-4 font-display text-[clamp(1.05rem,1.6vw,1.7rem)] font-normal leading-none text-white md:bottom-5 md:left-5">
                      {tile.label}
                    </span>
                  </>
                ) : null}
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
