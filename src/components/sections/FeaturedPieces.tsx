import Link from "next/link";
import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { featuredPieces } from "@/lib/content/featured";
import { cn } from "@/lib/cn";

/**
 * A strip of pieces for pages that are otherwise all type.
 *
 * The interior pages that carry no product photography - the rate, the plans,
 * the house index below its mosaic - had nothing on them to want. This is the
 * jewellery, and only the jewellery: every frame is cropped so no model's face
 * appears in it, so the eye lands on the piece and not on a person.
 *
 * NO HOVER-ONLY CONTENT. The name and the spec are in the layout, under the
 * frame, at every size - not revealed on hover. A caption a phone cannot reach
 * is a caption that does not exist, and this section exists to be read on a
 * phone as much as anywhere.
 */
export function FeaturedPieces({
  eyebrow = "From the counter",
  title = "Pieces worth the detour",
  tone = "green",
  onLight = false,
  /** Trim the strip where a page cannot spare the height. */
  limit,
}: {
  eyebrow?: string;
  title?: string;
  tone?: "green" | "deep" | "light";
  onLight?: boolean;
  limit?: number;
}) {
  const pieces = limit ? featuredPieces.slice(0, limit) : featuredPieces;

  return (
    <Section spacing="lg" tone={tone} className={onLight ? "u-on-light" : undefined}>
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal as="p" className="u-eyebrow mb-3">
              {eyebrow}
            </Reveal>
            <Reveal
              as="h2"
              delay={0.05}
              className="font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-tight text-text-strong"
            >
              {title}
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/jewellery"
              className="inline-flex min-h-[44px] items-center font-body text-[0.72rem] uppercase tracking-[0.18em] text-text-muted underline decoration-gold underline-offset-[6px] transition-colors hover:text-text-strong"
            >
              All jewellery
            </Link>
          </Reveal>
        </div>

        {/* Two up on a phone, three on a tablet, the full row on a desktop.
            A grid rather than a horizontal scroller: a scroller hides half its
            contents behind a gesture, and on touch it fights the page's own
            vertical scroll at the edges. */}
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:mt-14 md:gap-x-5 lg:grid-cols-6">
          {pieces.map((p, i) => (
            <Reveal as="li" key={p.src} variant="mask" delay={(i % 3) * 0.06}>
              <Link href={p.href} className="cj-card group block">
                <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-brand)] bg-green-deep">
                  <Image
                    src={p.src}
                    alt={p.name}
                    placeholder="blur"
                    blurDataURL={EMERALD_LQIP}
                    fill
                    // Measured against the grid: 2-up on a phone, 3-up on a
                    // tablet, and capped by the container above that.
                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 190px"
                    className={cn(
                      "object-cover transition-transform duration-[1200ms] ease-[var(--ease-lux)]",
                      "group-hover:scale-[1.05]",
                    )}
                  />
                </div>
                {/* Sized by the card's own width, not the viewport - see
                    .cj-card. Six-up on a desktop and two-up on a phone give
                    almost the same card, which no breakpoint can express. */}
                <p className="cj-card-name mt-3 font-display font-light text-text-strong">
                  {p.name}
                </p>
                <p className="mt-1 font-body text-[0.62rem] uppercase tracking-[0.16em] text-gold">
                  {p.spec}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
