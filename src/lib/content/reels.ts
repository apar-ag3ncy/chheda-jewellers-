import type { FilmReel } from "@/types/content";

/**
 * THE RING — a 360° turntable the visitor rotates by hand.
 *
 * Generated on the house's Magnific account (Kling 3.0, image-to-video) from a
 * background-cut still of the Bloom ring, then cut at build time into 72 WebP
 * frames on a 4:5 stage. Because it is a closed turn, the sequence wraps: drag
 * or scroll past either end and it keeps rotating.
 */
export const ringFilm: FilmReel = {
  id: "turn",
  name: "The Bloom Ring",
  dir: "/media/reels/turn",
  frames: 72,
  alt: "A rose-gold lotus ring, seen from every side as it turns",
};

/** The section's single line of copy. */
export const ringHeadline = "Turn it\n*in the light*";

export function reelFrameSrc(reel: FilmReel, i: number): string {
  return `${reel.dir}/f${String(i).padStart(2, "0")}.webp`;
}

export function reelPosterSrc(reel: FilmReel): string {
  return `${reel.dir}/poster.webp`;
}
