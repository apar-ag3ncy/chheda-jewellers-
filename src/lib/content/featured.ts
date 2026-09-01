/**
 * FEATURED PIECES - the jewellery, and only the jewellery.
 *
 * Every frame here is cropped to the piece with no model's face in it at all.
 * That is stricter than the site's usual rule (the piece must read whole) and
 * it is deliberate: this strip runs on pages that are otherwise all type, and
 * a face there pulls the eye off the thing being sold.
 *
 * The crops are baked to files by scripts/make-featured.py rather than being
 * object-position crops of the originals, because a CSS crop travels with its
 * container's aspect ratio - a card that goes portrait on a phone would pull
 * a chin or an ear back into frame. A file cannot drift.
 */

export type FeaturedPiece = {
  src: string;
  /** What it is. No prices - the site does not sell from a page. */
  name: string;
  /** Metal, stones, technique. */
  spec: string;
  /** Which room it belongs to. */
  href: string;
};

export const featuredPieces: FeaturedPiece[] = [
  {
    src: "/media/featured/lotus-ring.webp",
    name: "The Bloom Ring",
    spec: "Rose gold · brilliant-cut",
    href: "/jewellery/diamond",
  },
  {
    src: "/media/featured/sapphire-choker.webp",
    name: "The Sapphire Choker",
    spec: "Polki · carved sapphire · pearl",
    href: "/jewellery/polki",
  },
  {
    src: "/media/featured/kundan-choker.webp",
    name: "The Kundan Collar",
    spec: "22K · kundan · pearl drops",
    href: "/jewellery/gold",
  },
  {
    src: "/media/featured/drop-earring.webp",
    name: "The Long Drops",
    spec: "Polki · uncut diamond",
    href: "/jewellery/polki",
  },
  {
    src: "/media/featured/bangle-stack.webp",
    name: "The Bangle Stack",
    spec: "22K · hand-set colour stones",
    href: "/jewellery/gold",
  },
  {
    src: "/media/featured/polki-rings.webp",
    name: "Rings & Kada",
    spec: "Polki · 22K · worn together",
    href: "/jewellery/polki",
  },
];
