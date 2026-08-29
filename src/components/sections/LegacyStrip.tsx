import { Monogram } from "@/components/ui/Monogram";

/**
 * THE LEGACY RIBBON - a slim band directly under the hero.
 *
 * One line, "Carrying legacy since 1991", set in the house display face and
 * filled with the brand's gold gradient, moving at a constant walking pace.
 * The motion is the point of a ribbon: a static strapline under a full-screen
 * hero reads as a subtitle, while a line that is always quietly passing reads
 * as something the house carries - which is what the words say.
 *
 * Seamless by construction, not by tuning: the track holds two identical
 * copies of the sequence and the keyframe travels exactly -50%, so the loop
 * point is mathematically invisible at any width. The sequence itself repeats
 * the line four times with the house mark as a separator, so even an
 * ultrawide screen never shows a gap.
 *
 * The shine is a second animation: the gradient is drawn at 3x width and its
 * position swept slowly, so a highlight travels along the letterforms the way
 * light moves along a polished bangle. Both animations are pure CSS on one
 * element each - no JS, no per-frame work, and under prefers-reduced-motion
 * the ribbon stands still and the shine stops (see globals.css).
 *
 * It is a <section> in the homepage order but deliberately carries no
 * data-bg: like the hero above it, it paints its own opaque ground and takes
 * no part in the themer's alternation.
 */
const LINE = "Carrying legacy since 1991";
const REPEATS = 4;

export function LegacyStrip() {
  return (
    <section
      id="legacy"
      aria-label={LINE}
      className="relative w-full overflow-hidden border-y border-gold/25 bg-green-deep"
    >
      {/* Feathered side edges, so the line enters and leaves the screen
          through a soft shadow instead of being guillotined at the border. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-green-deep to-transparent md:w-28"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-green-deep to-transparent md:w-28"
      />

      <div aria-hidden className="cj-legacy-track flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {Array.from({ length: REPEATS }).map((_, i) => (
              <span key={i} className="flex items-center">
                <span className="cj-legacy-gold whitespace-nowrap px-7 py-2.5 font-display text-[1.05rem] font-light tracking-[0.14em] md:px-10 md:py-3 md:text-[1.2rem]">
                  {LINE}
                </span>
                <Monogram className="h-4 w-4 shrink-0 opacity-60" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
