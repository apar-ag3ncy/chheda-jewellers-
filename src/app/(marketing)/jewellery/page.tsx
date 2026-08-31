import { NextStep } from "@/components/ui/NextStep";
import Link from "next/link";
import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { categoryList } from "@/lib/content/categories";
import { pageMetadata } from "@/lib/seo";
import { PagePlate } from "@/components/ui/PagePlate";
import { Section, Container } from "@/components/ui/Section";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "All Jewellery",
  description:
    "Explore the House of Chheda - heritage gold, certified diamonds and regal polki, and a bespoke atelier. Editorial collections made to be worn and inherited.",
  path: "/jewellery",
});

/**
 * /jewellery - the house index.
 *
 * Rebuilt from three equal cards into a MOSAIC that states a hierarchy: gold
 * takes the tall left column because it is the room most visitors come for,
 * diamond and polki stack beside it. Three identical tiles imply the three
 * rooms are interchangeable; they are not, and a grid that says so is doing
 * real work rather than decorating.
 *
 * so every route out of the house index is visible from one screen.
 */
export default function JewelleryPage() {
  // By id, not by position - the mosaic gives gold the tall column, and
  // that must survive any reordering of the content file.
  const gold = categoryList.find((c) => c.slug === "gold") ?? categoryList[0]!;
  const rest = categoryList.filter((c) => c !== gold);

  return (
    <>
      <PagePlate
        folio="I"
        eyebrow="The House of Chheda"
        title={"Three rooms,\none roof"}
        intro="Heritage gold, certified diamonds, and regal polki - each with its own light, its own craft and its own reasons. Begin wherever your story does."
        plate={{
          src: "/media/pages/jewellery.jpg",
          alt: "A guest in emerald and gold against a wall of marigolds",
          focus: "50% 24%",
        }}
        meta={[
          { label: "Rooms", value: "Gold · Diamond · Polki" },
          { label: "Boutiques", value: "Two in Mumbai" },
          { label: "Purity", value: "BIS hallmarked, always" },
          { label: "Made to order", value: "6-10 weeks" },
        ]}
      />

      {/* ── The rooms, on the dock ──────────────────────────────────────
          The same magnifying dock as the homepage promise marks, here with
          the four rooms' own photographs as the chips. It duplicates the
          mosaic below on purpose: the mosaic is for reading, this is for
          people who already know which door they want. */}
      <Section spacing="none" tone="green" aria-label="Jump to a room">
        <Container className="-mt-2 pb-2 md:pb-4">
          <Dock aria-label="The rooms">
            {[
              { href: "/jewellery/gold", label: "Gold", src: "/media/categories/gold/g3.jpg", pos: "50% 44%" },
              { href: "/jewellery/diamond", label: "Diamond", src: "/media/categories/diamond/nav-diamond.jpg", pos: "50% 50%" },
              { href: "/jewellery/polki", label: "Polki", src: "/media/categories/polki/sapphire-choker.jpg", pos: "50% 54%" },
              { href: "/bespoke", label: "Bespoke", src: "/media/bespoke/01.jpg", pos: "50% 42%" },
            ].map((room) => (
              <DockItem key={room.href} href={room.href} label={room.label}>
                <DockLabel>{room.label}</DockLabel>
                <DockIcon className="overflow-hidden rounded-full">
                  <Image
                    src={room.src}
                    alt=""
                    width={96}
                    height={96}
                    className="h-full w-full rounded-full object-cover"
                    style={{ objectPosition: room.pos }}
                  />
                </DockIcon>
              </DockItem>
            ))}
          </Dock>
        </Container>
      </Section>

      {/* ── The mosaic ────────────────────────────────────────────────── */}
      <Section spacing="md" tone="green">
        <Container>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {/* Gold - the tall plate */}
            {gold ? (
              <Reveal variant="mask">
                <RoomCard
                  href={`/jewellery/${gold.slug}`}
                  src={gold.hero.src}
                  alt={gold.hero.alt}
                  focus={gold.hero.focus}
                  eyebrow={gold.eyebrow}
                  name={gold.name}
                  intro={gold.intro}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="aspect-[4/5] md:aspect-auto md:h-full md:min-h-[34rem]"
                  size="lg"
                />
              </Reveal>
            ) : null}

            {/* Diamond + polki - stacked beside it */}
            <div className="grid grid-cols-1 gap-4 md:gap-5">
              {rest.map((c, i) => (
                <Reveal key={c.slug} variant="mask" delay={0.06 + i * 0.06}>
                  <RoomCard
                    href={`/jewellery/${c.slug}`}
                    src={c.hero.src}
                    alt={c.hero.alt}
                    focus={c.hero.focus}
                    eyebrow={c.eyebrow}
                    name={c.name}
                    intro={c.intro}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="aspect-[16/10] md:aspect-[16/9]"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Bespoke + visit ───────────────────────────────────────────────
          On cream, so the house index carries the same green → cream → deep
          rhythm as every other interior page instead of running three greens
          together into one flat block. */}
      <Section spacing="lg" tone="light" className="u-on-light">
        <Container>
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            <Reveal className="flex flex-col justify-between gap-8 bg-cream p-8 md:p-12">
              <div>
                <p className="u-eyebrow mb-4">Not in any of the three</p>
                <h2 className="max-w-sm font-display text-[length:var(--step-3)] font-light leading-[var(--leading-3)]">
                  Have it drawn instead
                </h2>
                <p className="mt-4 max-w-sm font-body text-[0.95rem] font-light leading-relaxed text-text-muted">
                  A piece designed for one person, or your family&rsquo;s own gold
                  remade into something worn again.
                </p>
              </div>
              <Button href="/bespoke" variant="onLight" withArrow className="self-start">
                The atelier
              </Button>
            </Reveal>

            <Reveal
              delay={0.06}
              className="flex flex-col justify-between gap-8 bg-cream p-8 md:p-12"
            >
              <div>
                <p className="u-eyebrow mb-4">Not sure where to begin</p>
                <h2 className="max-w-sm font-display text-[length:var(--step-3)] font-light leading-[var(--leading-3)]">
                  Come and sit with us
                </h2>
                <p className="mt-4 max-w-sm font-body text-[0.95rem] font-light leading-relaxed text-text-muted">
                  Walk into either shop and the room, the advisor and the tray
                  are yours. Free, and with no obligation to buy.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
      <NextStep
        eyebrow="When you have chosen a room"
        title="See it in the light, on the day that suits you."
        primary={{ href: "/chheda-promise", label: "How we price it" }}
      />
    </>
  );
}

/** One room of the house - the mosaic's tile, at two scales. */
function RoomCard({
  href,
  src,
  alt,
  focus,
  eyebrow,
  name,
  intro,
  sizes,
  className,
  size = "md",
}: {
  href: string;
  src: string;
  alt: string;
  focus?: string;
  eyebrow: string;
  name: string;
  intro: string;
  sizes: string;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block w-full overflow-hidden bg-green-deep",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        placeholder="blur"
        blurDataURL={EMERALD_LQIP}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[1800ms] ease-[var(--ease-cinema)] group-hover:scale-[1.05]"
        style={{ objectPosition: focus ?? "50% 32%" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-green-deep/92 via-green-deep/12 to-transparent"
      />
      <div className={cn("absolute inset-x-0 bottom-0", size === "lg" ? "p-8 md:p-10" : "p-6 md:p-7")}>
        <p className="u-eyebrow mb-2 text-[0.6rem]">{eyebrow}</p>
        <h2
          className={cn(
            "font-display font-light leading-none text-text-strong",
            size === "lg"
              ? "text-[clamp(2.4rem,5vw,4rem)]"
              : "text-[clamp(1.8rem,3.4vw,2.6rem)]",
          )}
        >
          {name}
        </h2>
        {/* Present wherever hovering is impossible, revealed where it is not.
            See .cj-hover-reveal for why this is grid rows and not max-height. */}
        <div className="cj-hover-reveal">
          <div>
            <p
              className={cn(
                "pt-3 font-body text-[0.86rem] font-light leading-relaxed text-text-muted",
                size === "lg" ? "max-w-md" : "max-w-sm",
              )}
            >
              {intro}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
