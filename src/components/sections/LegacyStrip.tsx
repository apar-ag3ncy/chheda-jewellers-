import { siteConfig } from "@/config/site";
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
 * THE GROUND IS THE GOLD ITSELF - the same two colours as the nav seal's
 * bright gradient (gold-light into gold), swept diagonally so the band reads
 * as one drawn sheet of metal from edge to edge. A slow specular travels
 * along it (the strip's own background position, not an overlay element), so
 * the metal carries light the way the ribbon's lettering used to. The
 * lettering flips to the house emerald: deep green struck into gold is the
 * jewel box turned inside out, and it is the highest-contrast pairing the
 * palette owns (about 6:1 at the gradient's darkest end).
 *
 * Carries no data-bg, like the hero above it: it paints its own opaque
 * ground and takes no part in the themer's alternation.
 */
export function LegacyStrip() {
  return (
    <section
      id="legacy"
      className="cj-legacy-strip relative w-full overflow-hidden border-y border-gold-deep/45"
    >
      <div className="flex items-center justify-center gap-4 px-5 py-5 md:gap-7 md:py-6">
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-r from-transparent via-green-deep/30 to-green-deep/55"
        />
        <span aria-hidden className="shrink-0" style={{ filter: "brightness(0.35) saturate(0.9)" }}>
          <Monogram className="h-4 w-4 opacity-80 md:h-5 md:w-5" />
        </span>
        <h2 className="cj-legacy-gold shrink-0 whitespace-nowrap text-center font-display text-[clamp(1.15rem,3.4vw,2rem)] font-light italic tracking-[0.12em]">
          Carrying legacy since {siteConfig.foundedYear}
        </h2>
        <span aria-hidden className="shrink-0" style={{ filter: "brightness(0.35) saturate(0.9)" }}>
          <Monogram className="h-4 w-4 opacity-80 md:h-5 md:w-5" />
        </span>
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-l from-transparent via-green-deep/30 to-green-deep/55"
        />
      </div>
    </section>
  );
}
