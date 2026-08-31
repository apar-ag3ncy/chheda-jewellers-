import type { FilmReel } from "@/types/content";

/**
 * THE RING - a turntable the visitor rotates by hand.
 *
 * Generated on the house's Magnific account (Kling 3.0, image-to-video) from a
 * still of the Bloom ring, then cut into 72 WebP frames.
 *
 * NOT A CLOSED TURN. This was documented as one, and it is not: measured
 * frame to frame, a normal step differs by about 13 (mean absolute luma), and
 * the f71 -> f00 wrap differs by 39 - as far apart as two opposite views, and
 * ten standard deviations off a step. The sequence covers roughly 280 degrees
 * and stops; the last 80 were never rendered. So it must never be wrapped -
 * playing f71 into f00 snaps. It travels out and back instead, which has no
 * seam because it never crosses the gap.
 *
 * TODO(client): re-render the missing arc as f72-f89 and this becomes a real
 * loop; `closedTurn` below is the only thing that needs to change.
 *
 * The frames are cut out of their green studio plate - see scripts/cut-ring.py
 * for how, and why each threshold is where it is - so the piece sits on the
 * page with no backing, no plate and no reflection.
 */
export const ringFilm: FilmReel = {
  id: "turn",
  name: "The Bloom Ring",
  dir: "/media/reels/turn-cut",
  frames: 72,
  /** See above: the arc is ~280 degrees, so the ends must not be joined. */
  closedTurn: false,
  alt: "A rose-gold lotus ring, seen from every side as it turns",
};

/** The section's single line of copy. */
export const ringHeadline = "Turn it\nin the light";

export function reelFrameSrc(reel: FilmReel, i: number): string {
  return `${reel.dir}/f${String(i).padStart(2, "0")}.webp`;
}

export function reelPosterSrc(reel: FilmReel): string {
  return `${reel.dir}/poster.webp`;
}
