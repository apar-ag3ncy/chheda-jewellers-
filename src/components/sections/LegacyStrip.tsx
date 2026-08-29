import { Monogram } from "@/components/ui/Monogram";

/**
 * THE LEGACY RIBBON - one line, said once.
 *
 * This began as a marquee with the sentence repeating down the track, and the
 * repetition cheapened it: a claim about legacy said eight times reads as
 * advertising, said once reads as an inscription. So it is now set the way a
 * jeweller engraves a case - a single centred line in the display face,
 * filled with the brand's gold gradient, with a hairline drawn out to each
 * side and the house mark as the punctuation between them.
 *
 * The motion that remains is the light, not the words: the gradient is drawn
 * at 3x width and its position swept slowly, so a highlight travels along the
 * letterforms the way light moves along a polished bangle (see
 * .cj-legacy-gold in globals.css). Under prefers-reduced-motion the sweep
 * stops and the gradient rests centred - the gold stays, the movement goes.
 *
 * The hairlines are gradients that fade toward the edges rather than rules
 * with ends, so the strip has no visible terminations - it reads as a band
 * that continues past the viewport, which is what makes it feel like part of
 * the page's fabric instead of a box on it.
 *
 * Carries no data-bg, like the hero above it: it paints its own opaque
 * deep-green ground and takes no part in the themer's alternation.
 */
export function LegacyStrip() {
  return (
    <section
      id="legacy"
      className="relative w-full overflow-hidden border-y border-gold/25 bg-green-deep"
    >
      <div className="flex items-center justify-center gap-4 px-5 py-5 md:gap-7 md:py-6">
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-gold/60"
        />
        <Monogram className="h-4 w-4 shrink-0 opacity-70 md:h-5 md:w-5" />
        <h2 className="cj-legacy-gold shrink-0 whitespace-nowrap text-center font-display text-[clamp(1.15rem,3.4vw,2rem)] font-light tracking-[0.12em]">
          Carrying legacy since 1991
        </h2>
        <Monogram className="h-4 w-4 shrink-0 opacity-70 md:h-5 md:w-5" />
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/40 to-gold/60"
        />
      </div>
    </section>
  );
}
