import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Monogram } from "@/components/ui/Monogram";

/**
 * A beige light interlude between the darker bands — a single brand statement
 * on warm paper. The scroll background eases to beige here (see ScrollThemer);
 * all text is deep green/maroon for contrast, so the light section is legible.
 */
export function Manifesto() {
  return (
    <Section
      id="manifesto"
      spacing="lg"
      tone="transparent"
      data-bg="beige"
      className="text-green"
    >
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <Monogram className="mx-auto h-12 w-12 opacity-90" />
        </Reveal>
        <Reveal as="p" delay={0.04} className="u-eyebrow mt-8 text-maroon">
          Our belief
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-4xl font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-light leading-[1.12] text-green">
            Gold is memory you can hold. We do not sell ornaments — we make the
            things a family keeps, and hands down, and remembers you by.
          </p>
        </Reveal>
        <Reveal delay={0.14} className="mt-10">
          <span
            aria-hidden
            className="mx-auto block h-px w-16 bg-[color-mix(in_srgb,var(--maroon)_45%,transparent)]"
          />
        </Reveal>
        <Reveal
          as="p"
          delay={0.16}
          className="mt-8 font-body text-[0.72rem] uppercase tracking-[0.24em] text-[color-mix(in_srgb,var(--green)_70%,transparent)]"
        >
          Chheda Jewellers · Mumbai
        </Reveal>
      </Container>
    </Section>
  );
}
