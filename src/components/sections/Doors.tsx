import Link from "next/link";
import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Monogram } from "@/components/ui/Monogram";
import { cn } from "@/lib/cn";

/**
 * THE DOORS - a bento of everywhere the house can take you, closing the
 * scroll just before the sign-off.
 *
 * Mixed tile sizes are the point: a bento reads as a cabinet of different
 * drawers, not a gallery. Every tile is a real doorway - the two metal rooms,
 * the bridal consult, the journal, the atelier - plus one quiet tile that is
 * not a photograph at all: the monogram on deep emerald, asking the only
 * question that matters at the end of a visit. Since the footer below is now
 * a pure sign-off with no links, this grid is also the page's last working
 * navigation.
 *
 * All six frames are fresh from the archive - nothing reused elsewhere.
 */

type Door = {
  href: string;
  label: string;
  note: string;
  src: string;
  alt: string;
  focus?: string;
  /** Tailwind span classes - the bento's geometry. */
  span: string;
};

const DOORS: Door[] = [
  {
    href: "/enquire?intent=bridal",
    label: "Bridal",
    note: "Plan the long day",
    src: "/media/doors/bridal.jpg",
    alt: "A bride in deep red holding a rose, wearing an emerald-set polki collar",
    focus: "50% 20%",
    span: "col-span-2 row-span-2",
  },
  {
    href: "/jewellery/polki",
    label: "Polki",
    note: "Uncut & regal",
    src: "/media/doors/polki.jpg",
    alt: "A bride raising jadau bangles to her face, nath and choker in dense gold",
    focus: "50% 24%",
    span: "col-span-1 row-span-1",
  },
  {
    href: "/jewellery/gold",
    label: "Gold",
    note: "22K, hallmarked",
    src: "/media/doors/gold.jpg",
    alt: "A guest in a pink sari and gold temple necklace beside a mirrored screen",
    focus: "50% 22%",
    span: "col-span-1 row-span-1",
  },
  {
    // Same frame, new door: the tile that led to the occasion edits now
    // leads to the journal, which keeps the bento's geometry and gives the
    // journal a second inbound link.
    href: "/journal",
    label: "The Journal",
    note: "Stories from the house",
    src: "/media/doors/edits.jpg",
    alt: "A wedding tableau - the couple and family in gold, seated by a carved throne",
    focus: "50% 30%",
    span: "col-span-2 row-span-1",
  },
  {
    href: "/jewellery/diamond",
    label: "Diamond",
    note: "Certified light",
    src: "/media/doors/diamond.jpg",
    alt: "A portrait in low studio light wearing a sapphire ear stud and emerald ring",
    focus: "50% 26%",
    span: "col-span-1 row-span-1",
  },
  {
    href: "/bespoke",
    label: "Bespoke",
    note: "Made to measure",
    src: "/media/doors/bespoke.jpg",
    alt: "A bride in champagne gold with pearl gauntlets, seated in a red room",
    focus: "50% 30%",
    span: "col-span-2 row-span-1",
  },
];

export function Doors() {
  return (
    <Section id="doors" spacing="lg" tone="transparent" data-bg="green">
      <Container>
        <div className="flex items-baseline justify-between gap-6 border-b border-line pb-5">
          <p className="u-eyebrow">Keep exploring</p>
          <p className="hidden font-body text-[0.72rem] font-light text-text-muted sm:block">
            Every door below is open
          </p>
        </div>

        <div className="mt-10 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[180px] md:mt-16 md:auto-rows-[210px] md:grid-cols-4 md:gap-4">
          {DOORS.slice(0, 5).map((door, i) => (
            <BentoTile key={door.href} door={door} delay={i * 0.05} />
          ))}

          {/* The quiet tile - the only door that is a question, not a photo. */}
          <Reveal delay={0.25} className="col-span-1 row-span-1">
            <Link
              href="/enquire"
              className="group flex h-full w-full flex-col items-center justify-center gap-4 rounded-[var(--radius-brand)] border border-line-strong bg-green-deep p-5 text-center transition-colors duration-500 hover:border-gold"
            >
              <Monogram className="h-10 w-10 transition-transform duration-[900ms] ease-[var(--ease-cinema)] group-hover:rotate-[30deg]" />
              <span className="font-display text-[1.15rem] font-light leading-snug text-text-strong">
                Book a private viewing
              </span>
              <span className="font-body text-[0.62rem] uppercase tracking-[0.2em] text-gold-light">
                Free · no obligation
              </span>
            </Link>
          </Reveal>

          <BentoTile door={DOORS[5]!} delay={0.3} />
        </div>
      </Container>
    </Section>
  );
}

function BentoTile({ door, delay }: { door: Door; delay: number }) {
  return (
    <Reveal delay={delay} className={cn(door.span)}>
      <Link
        href={door.href}
        className="group relative block h-full w-full overflow-hidden rounded-[var(--radius-brand)] bg-green-deep"
      >
        <Image
          src={door.src}
          alt={door.alt}
          placeholder="blur"
          blurDataURL={EMERALD_LQIP}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-[1800ms] ease-[var(--ease-cinema)] group-hover:scale-[1.05]"
          style={{ objectPosition: door.focus ?? "50% 30%" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-green-deep/85 via-green-deep/5 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-5">
          <div>
            <p className="font-display text-[1.3rem] font-light leading-none text-text-strong md:text-[1.5rem]">
              {door.label}
            </p>
            <p className="mt-1.5 font-body text-[0.6rem] uppercase tracking-[0.18em] text-text-muted">
              {door.note}
            </p>
          </div>
          <span
            aria-hidden
            className="mb-0.5 shrink-0 text-gold opacity-0 transition-all duration-500 ease-[var(--ease-lux)] group-hover:translate-x-0.5 group-hover:opacity-100"
          >
            &rarr;
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
