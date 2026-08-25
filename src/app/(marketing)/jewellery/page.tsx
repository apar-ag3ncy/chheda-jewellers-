import Link from "next/link";
import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { categoryList } from "@/lib/content/categories";
import { edits } from "@/lib/content/edits";
import { pageMetadata } from "@/lib/seo";
import { PagePlate } from "@/components/ui/PagePlate";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { JewelleryTypes } from "@/components/sections";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "All Jewellery",
  description:
    "Explore the House of Chheda — heritage gold, certified diamonds and regal polki, plus five occasion edits and a bespoke atelier. Editorial collections made to be worn and inherited.",
  path: "/jewellery",
});

/**
 * /jewellery — the house index.
 *
 * Rebuilt from three equal cards into a MOSAIC that states a hierarchy: gold
 * takes the tall left column because it is the room most visitors come for,
 * diamond and polki stack beside it. Three identical tiles imply the three
 * rooms are interchangeable; they are not, and a grid that says so is doing
 * real work rather than decorating.
 *
 * The page then hands off to the second axis (the edits) and to the atelier,
 * so every route out of the house index is visible from one screen.
 */
export default function JewelleryPage() {
  const [gold, ...rest] = categoryList;

  return (
    <>
      <PagePlate
        folio="I"
        eyebrow="The House of Chheda"
        title={"Three rooms,\n*one roof*"}
        intro="Heritage gold, certified diamonds, and regal polki — each with its own light, its own craft and its own reasons. Begin wherever your story does."
        plate={{
          src: "/media/pages/jewellery.jpg",
          alt: "A guest in emerald and gold against a wall of marigolds",
          focus: "50% 24%",
        }}
        meta={[
          { label: "Rooms", value: "Gold · Diamond · Polki" },
          { label: "Edits", value: `${edits.length} occasions` },
          { label: "Purity", value: "BIS hallmarked, always" },
          { label: "Made to order", value: "6–10 weeks" },
        ]}
      />

      {/* ── The mosaic ────────────────────────────────────────────────── */}
      <Section spacing="md" tone="green">
        <Container>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {/* Gold — the tall plate */}
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

            {/* Diamond + polki — stacked beside it */}
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

      {/* ── The other axis ────────────────────────────────────────────── */}
      <Section spacing="lg" tone="light" className="u-on-light">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 border-b border-line pb-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="The other way in"
              title={"Or start from\n*the occasion*"}
              size="md"
            />
            <Button href="/edits" variant="onLight" withArrow>
              All five edits
            </Button>
          </div>

          {/* A ruled strip — five edits in a single scannable row, sized to
              the name rather than boxed into equal tiles. */}
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {edits.map((e, i) => (
              <Reveal as="li" key={e.slug} delay={i * 0.05}>
                <Link
                  href={`/edits/${e.slug}`}
                  className="group flex h-full flex-col justify-between border-t border-line pt-4 transition-colors duration-500 hover:border-line-strong"
                >
                  <div className="relative mb-4 aspect-[3/4] w-full overflow-hidden bg-green">
                    <Image
                      src={e.gallery[0]!.src}
                      alt={e.gallery[0]!.alt}
                      placeholder="blur"
                      blurDataURL={EMERALD_LQIP}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover grayscale transition-all duration-[1500ms] ease-[var(--ease-cinema)] group-hover:grayscale-0"
                      style={{ objectPosition: e.gallery[0]!.focus ?? "50% 28%" }}
                    />
                  </div>
                  <div>
                    <span className="font-body text-[0.6rem] tracking-[0.2em] text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-1.5 block font-display text-[1.35rem] font-light leading-tight text-text-strong">
                      {e.name}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <JewelleryTypes />

      {/* ── Bespoke + visit ───────────────────────────────────────────── */}
      <Section spacing="lg" tone="green">
        <Container>
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            <Reveal className="flex flex-col justify-between gap-8 bg-green-deep p-8 md:p-12">
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
              <Button href="/bespoke" variant="primary" withArrow className="self-start">
                The atelier
              </Button>
            </Reveal>

            <Reveal
              delay={0.06}
              className="flex flex-col justify-between gap-8 bg-green-deep p-8 md:p-12"
            >
              <div>
                <p className="u-eyebrow mb-4">Not sure where to begin</p>
                <h2 className="max-w-sm font-display text-[length:var(--step-3)] font-light leading-[var(--leading-3)]">
                  Come and sit with us
                </h2>
                <p className="mt-4 max-w-sm font-body text-[0.95rem] font-light leading-relaxed text-text-muted">
                  Book a private viewing and the room, the advisor and the tray
                  are yours. Free, and with no obligation to buy.
                </p>
              </div>
              <Button href="/enquire" variant="outline" withArrow className="self-start">
                Book an appointment
              </Button>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

/** One room of the house — the mosaic's tile, at two scales. */
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
        <p
          className={cn(
            "mt-3 font-body text-[0.86rem] font-light leading-relaxed text-text-muted",
            // Copy is present on touch (where there is no hover) and revealed
            // on pointer devices, so nothing is hidden from anyone who cannot
            // hover — including keyboard users, via group-focus-within.
            "md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-700 md:ease-[var(--ease-lux)]",
            "md:group-hover:max-h-40 md:group-hover:opacity-100",
            "md:group-focus-within:max-h-40 md:group-focus-within:opacity-100",
            size === "lg" ? "max-w-md" : "max-w-sm",
          )}
        >
          {intro}
        </p>
      </div>
    </Link>
  );
}
