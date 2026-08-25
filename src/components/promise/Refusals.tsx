import { refusals } from "@/lib/content/promise";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";

/**
 * "What we do not do" — set on cream, like the signed page of a contract.
 *
 * Negative promises read as credible in a way positive ones structurally
 * cannot: anyone can claim transparency, but naming the specific practices you
 * refuse is checkable at the counter. Maroon survives here only as the
 * accent it was always meant to be (per the design system) — the numerals and
 * the rules — rather than as a full-bleed ground.
 */
export function Refusals() {
  return (
    <section className="u-on-light relative w-full overflow-hidden bg-cream py-20 md:py-32">
      <Container>
        <Reveal as="p" className="u-eyebrow mb-10">
          04 — What we do not do
        </Reveal>
        <ul className="flex max-w-4xl flex-col">
          {refusals.map((line, i) => (
            <li key={line} className="border-t border-line-strong py-7 md:py-8">
              <div className="flex items-baseline gap-5 md:gap-8">
                <span className="shrink-0 font-body text-[0.68rem] tracking-[0.2em] text-maroon">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <SplitLines delay={i * 0.05}>
                  <p className="font-display text-[length:var(--step-3)] font-light leading-[var(--leading-3)] text-text-strong">
                    {line}
                  </p>
                </SplitLines>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
