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
 * THE GROUND IS THE BRAND'S OTHER COLOUR. Everything on this page is green
 * or cream, and a strip that matched them disappeared into the wallpaper. The
 * maroon is the house's declared secondary and is used almost nowhere - and
 * gold script on deep maroon is the oldest pairing in the trade: the velvet
 * lining of a jewel case. The layers below build that velvet rather than a
 * flat fill: a centre glow as the nap catching light, darker corners as the
 * fold shadows, and a hairline of light along the top edge where the fabric
 * turns.
 *
 * Carries no data-bg, like the hero above it: it paints its own opaque
 * ground and takes no part in the themer's alternation.
 */
export function LegacyStrip() {
  return (
    <section
      id="legacy"
      className="relative w-full overflow-hidden border-y border-gold/30"
      style={{
        background:
          /* nap glow, then fold shadows, then the cloth itself */
          "radial-gradient(120% 200% at 50% 50%, color-mix(in srgb, var(--maroon-soft) 85%, var(--gold) 15%) 0%, transparent 55%)," +
          "radial-gradient(60% 130% at 6% 50%, rgba(0,0,0,0.5) 0%, transparent 60%)," +
          "radial-gradient(60% 130% at 94% 50%, rgba(0,0,0,0.5) 0%, transparent 60%)," +
          "linear-gradient(180deg, var(--maroon-soft) 0%, var(--maroon) 34%, var(--maroon) 66%, color-mix(in srgb, var(--maroon) 82%, #000) 100%)",
        boxShadow:
          "inset 0 1px 0 rgba(240,207,170,0.32), inset 0 -1px 0 rgba(0,0,0,0.55), inset 0 12px 26px -18px rgba(240,207,170,0.18)",
      }}
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
