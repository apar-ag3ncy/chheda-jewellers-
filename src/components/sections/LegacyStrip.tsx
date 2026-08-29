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
 * THE GROUND IS SATIN PAPER, not velvet. On the brand cream, with a soft
 * centre sheen and gently shaded edges - the card inside the jewel box
 * rather than its lining. The gold flips DARK to sit on it: light-gold
 * letterforms measure 1.3:1 on cream and simply vanish, so the ribbon's ramp
 * runs from a burnished near-bronze anchor through gold-deep, and the
 * travelling shine is the lighter mid-stop passing through - embossed and
 * catching light, never gilded flat.
 *
 * Carries no data-bg, like the hero above it: it paints its own opaque
 * ground and takes no part in the themer's alternation.
 */
export function LegacyStrip() {
  return (
    <section
      id="legacy"
      className="relative w-full overflow-hidden border-y border-gold-deep/30"
      style={{
        background:
          /* centre sheen, edge shading, then the paper itself */
          "radial-gradient(120% 220% at 50% 50%, #fdf3dd 0%, transparent 58%)," +
          "radial-gradient(60% 130% at 5% 50%, rgba(154,86,58,0.14) 0%, transparent 60%)," +
          "radial-gradient(60% 130% at 95% 50%, rgba(154,86,58,0.14) 0%, transparent 60%)," +
          "linear-gradient(180deg, #efdfbc 0%, var(--cream) 36%, var(--cream) 64%, #eaD8b2 100%)",
        boxShadow:
          "inset 0 1px 0 rgba(255,252,244,0.9), inset 0 -1px 0 rgba(154,86,58,0.22), inset 0 -10px 24px -18px rgba(154,86,58,0.28)",
      }}
    >
      <div className="flex items-center justify-center gap-4 px-5 py-5 md:gap-7 md:py-6">
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-deep/35 to-gold-deep/55"
        />
        <span aria-hidden className="shrink-0" style={{ filter: "brightness(0.62) saturate(1.2)" }}>
          <Monogram className="h-4 w-4 opacity-80 md:h-5 md:w-5" />
        </span>
        <h2 className="cj-legacy-gold shrink-0 whitespace-nowrap text-center font-display text-[clamp(1.15rem,3.4vw,2rem)] font-light tracking-[0.12em]">
          Carrying legacy since 1991
        </h2>
        <span aria-hidden className="shrink-0" style={{ filter: "brightness(0.62) saturate(1.2)" }}>
          <Monogram className="h-4 w-4 opacity-80 md:h-5 md:w-5" />
        </span>
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-deep/35 to-gold-deep/55"
        />
      </div>
    </section>
  );
}
