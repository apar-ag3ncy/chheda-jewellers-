import Link from "next/link";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Monogram } from "@/components/ui/Monogram";

/**
 * THE HAND-OFF - the one way every inner page ends.
 *
 * The site reads as a set of pages rather than a journey because its pages
 * stop rather than hand forward: the promise page, the strongest argument in
 * the house, ended with nothing at all, and so did investors. A visitor who
 * finished reading and was convinced had only the nav to fall back on.
 *
 * So every inner page now closes the same way, with the same shape, naming
 * the next step on one spine:
 *
 *     see the work -> trust the house -> choose how -> come in
 *
 * The primary is always the step FORWARD along that spine; the secondary is
 * the sideways move for someone not ready. Consistency is the point - once a
 * reader has met this band twice they know where the bottom of a page takes
 * them, and stop having to hunt the nav.
 */
export function NextStep({
  eyebrow,
  title,
  primary,
  secondary,
  tone = "deep",
  onLight = false,
}: {
  eyebrow: string;
  title: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  /** Set so the band never lands on the same ground as the section above it. */
  tone?: "deep" | "green" | "light";
  /** Pair with tone="light" so the nested type flips dark. */
  onLight?: boolean;
}) {
  return (
    <Section spacing="lg" tone={tone} className={onLight ? "u-on-light" : undefined}>
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Reveal variant="settle">
            <Monogram className="h-10 w-10" decorative />
          </Reveal>
          <Reveal as="p" delay={0.05} className="u-eyebrow mt-8">
            {eyebrow}
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 font-display text-[length:var(--step-3)] font-light leading-snug text-text-strong">
              {title}
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link
              href={primary.href}
              className="group inline-flex min-h-[44px] items-center gap-2 font-body text-[0.72rem] uppercase tracking-[0.18em] text-text-strong underline decoration-gold underline-offset-[6px] transition-colors hover:decoration-gold-light"
            >
              {primary.label}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
            {secondary ? (
              <Link
                href={secondary.href}
                className="inline-flex min-h-[44px] items-center font-body text-[0.72rem] uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-text-strong"
              >
                {secondary.label}
              </Link>
            ) : null}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
