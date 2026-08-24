import Link from "next/link";
import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { community } from "@/lib/content/community";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Monogram } from "@/components/ui/Monogram";
import { cn } from "@/lib/cn";

/**
 * The Jharokha — a palace-facade take on "join our community".
 *
 * The photographs sit inside arched jharokha frames (the mehrab silhouette of
 * temple and haveli architecture) arranged in a pyramid rhythm, tallest at the
 * centre like a shrine. Traditional form, luxury execution — never a plain
 * social-icon strip. Anchors the page just above the footer.
 */

/** Facade rhythm: outer arches sit lower, the centre rises. */
const ARCH_HEIGHTS = ["78%", "90%", "100%", "90%", "78%"];

const InstagramGlyph = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

const WhatsAppGlyph = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.82 9.82 0 016.99 2.9 9.83 9.83 0 012.89 6.99c0 5.45-4.44 9.88-9.89 9.88M20.46 3.49A11.82 11.82 0 0012.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.69 1.45h.01c6.55 0 11.89-5.34 11.9-11.9a11.82 11.82 0 00-3.5-8.41" />
  </svg>
);

/** A small gold lozenge — the finial/ornament between arches. */
const Lozenge = ({ className }: { className?: string }) => (
  <span
    aria-hidden
    className={cn("block h-1.5 w-1.5 rotate-45 bg-gold/70", className)}
  />
);

export function CommunityStrip() {
  const arches = community.gallery.slice(0, 5);

  return (
    <Section id="community" spacing="lg" tone="transparent" data-bg="deep">
      <Container>
        {/* ── Ornamental header ── */}
        <div className="flex flex-col items-center text-center">
          <Reveal variant="settle">
            <Monogram className="h-11 w-11" />
          </Reveal>
          <Reveal as="p" delay={0.04} className="u-eyebrow mt-6">
            {community.eyebrow}
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-[length:var(--step-4)] font-light leading-[var(--leading-4)] tracking-[var(--tracking-4)] text-text-strong">
              <span className="block">Be the first to see</span>
              <span className="block italic">what we make next</span>
            </h2>
          </Reveal>

          {/* gold rule with a centred diamond */}
          <Reveal delay={0.12} className="mt-8 flex w-full max-w-md items-center gap-3">
            <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-transparent to-line-strong" />
            <Lozenge />
            <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-transparent to-line-strong" />
          </Reveal>
        </div>

        {/* ── The jharokha facade ── */}
        <div className="mt-14 flex items-end justify-center gap-2 sm:gap-3 md:mt-20 md:gap-5">
          {arches.map((img, i) => (
            <Reveal
              key={img.src}
              delay={Math.abs(2 - i) * 0.07}
              className={cn(
                // outer two arches are hidden on phones so the facade stays legible
                i === 0 || i === 4 ? "hidden sm:block" : "block",
                "min-w-0 flex-1",
              )}
            >
              <Link
                href={community.instagram.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${community.instagram.handle} on Instagram`}
                className="group relative block"
                style={{ height: 0, paddingBottom: `calc(${ARCH_HEIGHTS[i]} * 1.55)` }}
              >
                <span className="absolute inset-0 overflow-hidden rounded-t-full border border-line-strong/60 bg-green-soft transition-colors duration-[var(--dur-base)] group-hover:border-gold">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    placeholder="blur"
                    blurDataURL={EMERALD_LQIP}
                    fill
                    sizes="(max-width: 640px) 33vw, 18vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-lux)] group-hover:scale-[1.06]"
                  />
                  {/* inner gold hairline — the matted temple frame */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-2 rounded-t-full border border-gold/25 transition-colors duration-[var(--dur-base)] group-hover:border-gold/50"
                  />
                  {/* base scrim so the facade grounds into the section */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-green-deep/75 to-transparent"
                  />
                  {/* hover glyph */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 flex items-end justify-center pb-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  >
                    <InstagramGlyph className="h-5 w-5 text-gold-light" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* ── Two invitations, split by a gold rule with the house mark ── */}
        <div className="relative mt-14 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-2 md:gap-0">
          {/* vertical divider + centre mark (desktop) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden -translate-x-1/2 flex-col items-center md:flex"
          >
            <span className="w-px flex-1 bg-gradient-to-b from-transparent to-line-strong" />
            <Lozenge className="my-3" />
            <span className="w-px flex-1 bg-gradient-to-t from-transparent to-line-strong" />
          </div>

          <Invitation
            glyph={<WhatsAppGlyph className="h-5 w-5" />}
            kicker="N° 01"
            title={community.whatsapp.title}
            description={community.whatsapp.description}
            ctaLabel={community.whatsapp.cta.label}
            href={community.whatsapp.cta.href}
            className="md:pr-14"
          />
          <Invitation
            glyph={<InstagramGlyph className="h-5 w-5" />}
            kicker="N° 02"
            title={community.instagram.title}
            description={community.instagram.description}
            ctaLabel={community.instagram.handle}
            href={community.instagram.cta.href}
            delay={0.06}
            className="md:pl-14"
          />
        </div>
      </Container>
    </Section>
  );
}

function Invitation({
  glyph,
  kicker,
  title,
  description,
  ctaLabel,
  href,
  delay = 0,
  className,
}: {
  glyph: React.ReactNode;
  kicker: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  delay?: number;
  className?: string;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center text-center md:items-start md:text-left"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line-strong text-gold transition-colors duration-[var(--dur-base)] group-hover:border-gold group-hover:bg-gold/10 group-hover:text-gold-light">
          {glyph}
        </span>
        <p className="u-eyebrow mt-6">{kicker}</p>
        <h3 className="mt-3 font-display text-[length:var(--step-2)] font-light leading-tight text-text-strong">
          {title}
        </h3>
        <p className="mt-3 max-w-sm font-body text-[0.92rem] font-light leading-relaxed text-text-muted">
          {description}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 font-body text-[0.7rem] uppercase tracking-[0.18em] text-text-strong">
          <span className="relative">
            {ctaLabel}
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-[var(--dur-base)] ease-[var(--ease-lux)] group-hover:scale-x-100"
            />
          </span>
          <span
            aria-hidden
            className="text-gold transition-transform duration-[var(--dur-fast)] ease-[var(--ease-lux)] group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </span>
      </Link>
    </Reveal>
  );
}
