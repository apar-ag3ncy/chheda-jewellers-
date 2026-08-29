import { refusals } from "@/lib/content/promise";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";

/**
 * "What we do not do" - the page's one deep emerald band, and deliberately so:
 * the darkest claim on the page gets the darkest ground the brand owns.
 *
 * Negative promises read as credible in a way positive ones structurally
 * cannot: anyone can claim transparency, but naming the specific practices you
 * refuse is checkable at the counter.
 */
export function Refusals() {
  return (
    <section id="refusals" className="relative w-full overflow-hidden bg-green-deep py-20 md:py-32">
      <Container>
        <Reveal as="p" className="u-eyebrow mb-10 text-[color-mix(in_srgb,var(--gold-light)_85%,transparent)]">
          04 - What we do not do
        </Reveal>
        <ul className="flex max-w-4xl flex-col">
          {refusals.map((line, i) => (
            <li key={line} className="border-t border-[rgba(232,221,199,0.18)] py-7 md:py-8">
              <div className="flex items-baseline gap-5 md:gap-8">
                <span className="shrink-0 font-body text-[0.68rem] tracking-[0.2em] text-[color-mix(in_srgb,var(--gold-light)_75%,transparent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <SplitLines delay={i * 0.05}>
                  <p className="font-display text-[length:var(--step-3)] font-light leading-[var(--leading-3)] text-offwhite">
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
