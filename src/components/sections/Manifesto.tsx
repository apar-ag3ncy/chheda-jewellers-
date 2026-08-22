import Image from "next/image";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Monogram } from "@/components/ui/Monogram";

/**
 * A cinematic brand-statement interlude between the darker bands — a single
 * line over a softly-lit image (heavily scrimmed so the light text stays
 * legible). No flat colour block; the background is a logical image.
 */
export function Manifesto() {
  return (
    <section
      id="manifesto"
      data-bg="deep"
      className="relative flex min-h-[80svh] w-full items-center overflow-hidden bg-green-deep py-28 md:py-40"
    >
      <Image
        src="/media/hero/hero-02.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "50% 30%" }}
      />
      {/* Heavy emerald scrim — image reads as a whisper behind the words. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 50%, color-mix(in srgb, var(--green-deep) 74%, transparent) 0%, color-mix(in srgb, var(--green-deep) 92%, transparent) 100%)",
        }}
      />

      <Container className="relative flex flex-col items-center text-center">
        <Reveal>
          <Monogram className="mx-auto h-12 w-12 opacity-90" />
        </Reveal>
        <Reveal as="p" delay={0.04} className="u-eyebrow mt-8">
          Our belief
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-4xl font-display text-[clamp(1.6rem,4.4vw,3.4rem)] font-light leading-[1.16] text-text-strong">
            Gold is memory you can hold. We do not sell ornaments — we make the
            things a family keeps, and hands down, and remembers you by.
          </p>
        </Reveal>
        <Reveal delay={0.14} className="mt-10">
          <span aria-hidden className="mx-auto block h-px w-16 bg-line-strong" />
        </Reveal>
        <Reveal
          as="p"
          delay={0.16}
          className="mt-8 font-body text-[0.72rem] uppercase tracking-[0.24em] text-text-muted"
        >
          Chheda Jewellers · Mumbai
        </Reveal>
      </Container>
    </section>
  );
}
