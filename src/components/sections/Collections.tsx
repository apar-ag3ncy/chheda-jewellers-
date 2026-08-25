import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { campaignWall } from "@/lib/content/collections";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * COLLECTIONS - a bento of frames, and nothing else.
 *
 * The section carries no words: no eyebrow, no headline, no captions, no
 * button. Nine photographs in mixed tile sizes are the whole argument, which
 * is the point - a visitor two sections into the page should be looking at
 * jewellery, not reading about it. The house makes its case in type further
 * down; here it just shows the work.
 *
 * The geometry is a 5x3 bento: one tall frame anchoring the left, a 2x2 hero
 * in the middle of the run, two wide landscapes, and five squares around
 * them. Tiles are placed by the grid's own auto-flow rather than by explicit
 * line numbers - in this order the spans tessellate exactly, with no holes
 * and no need for `dense`.
 *
 * Cells stay square at every width because the container carries the matching
 * aspect ratio (5/3 across five columns, 2/6 across two) and the rows are
 * `1fr`. That is what keeps the bento's proportions intact from 360px to
 * 1600px without a single breakpoint-specific row height.
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
        <ul className="grid aspect-[2/6] auto-rows-fr grid-cols-2 gap-2 md:aspect-[5/3] md:grid-cols-5 md:gap-2.5">
          {campaignWall.map((tile, i) => {
            const span = SPANS[i] ?? SPANS[SPANS.length - 1]!;
            return (
              <Reveal
                as="li"
                key={tile.id}
                delay={(i % 4) * 0.05}
                className={cn(
                  "group relative overflow-hidden rounded-[var(--radius-brand)] bg-green-deep",
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
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
