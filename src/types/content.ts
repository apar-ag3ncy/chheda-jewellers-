/**
 * CONTENT TYPES - the shape of all editorial data.
 * Today these are satisfied by typed files in `lib/content/`.
 * Tomorrow the same types can be satisfied by a CMS (Sanity/Payload)
 * without touching a single component. This is the seam.
 */

export interface ImageAsset {
  src: string;
  alt: string;
  /** Optional focal hint for object-position (e.g. "50% 30%"). */
  focus?: string;
}

export interface HeroSlide {
  id: string;
  /** Omitted on a plate - the artwork already carries its own words. */
  eyebrow?: string;
  /**
   * Always required, but rendered two different ways: as the display h1 on a
   * normal slide, and screen-reader-only on a plate. The page must never be
   * left without an h1 just because a carousel happens to be on a given
   * frame, so the heading exists on every slide whether or not it is drawn.
   */
  headline: string;
  sub?: string;
  image: ImageAsset;
  /**
   * An alternative frame for portrait screens - true art direction, not a
   * different crop of the same file. A wide plate cover-cropped into a phone
   * loses its own edges; this is the version composed for that shape.
   */
  imagePortrait?: ImageAsset;
  cta?: CTA;
  /**
   * Finished artwork that already contains its own typography. Suppresses all
   * site copy, the text scrim and the Ken Burns drift for as long as it shows.
   */
  plate?: boolean;
}

export interface CTA {
  label: string;
  href: string;
}

export interface PromiseValue {
  id: string;
  title: string;
  description: string;
  /** Up to three short proofs, shown by the homepage dock while its mark is hovered. */
  points?: string[];
  /** The frame on the mark's dock chip - jewellery only, never a face. */
  image?: { src: string; focus?: string };
}

export interface JewelleryType {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: ImageAsset;
  href: string;
}

export interface Story {
  id: string;
  kicker: string;
  title: string;
  excerpt: string;
  image: ImageAsset;
  href: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  source: "Google" | "In-store" | "WhatsApp";
}

export interface PlanFeature {
  label: string;
  value: string;
}

export interface SavingsPlan {
  id: string;
  name: string;
  summary: string;
  highlights: string[];
  features: PlanFeature[];
  /** Optional - a plan need not carry an action. */
  cta?: CTA;
  flagship?: boolean;
}

/** A single jewellery showcase / category page (gold, diamond, polki). */
export interface CategoryPage {
  slug: "gold" | "diamond" | "polki";
  name: string;
  eyebrow: string;
  intro: string;
  hero: ImageAsset;
  /**
   * The picks - a handful of real pieces that show the room's range.
   *
   * Named and specified rather than a bare image grid, because a visitor
   * deciding between three metal rooms needs to know WHAT they are looking
   * at. Deliberately carries no price and no cart affordance: this is a
   * showcase, not a storefront, and every piece is one of a kind.
   */
  picks: {
    id: string;
    /** What the piece is called on the counter. */
    name: string;
    /** Metal, stones, technique - what it is made of and how. */
    spec: string;
    /** One line on who it is for or when it is worn. */
    note: string;
    image: ImageAsset;
  }[];
  note: string;
}

/* ============================================================
   BESPOKE - the custom-jewellery commission.
   ============================================================ */

export interface BespokeStep {
  id: string;
  /** Roman numeral or 01-style index, rendered as-is. */
  n: string;
  title: string;
  body: string;
  /** What the customer walks away with at the end of this step. */
  outcome: string;
  image: ImageAsset;
}

/* ============================================================
   THE RING - the scrub-driven 360° turntable.
   ============================================================ */

/** A directory of extracted frames the visitor rotates through. */
export interface FilmReel {
  id: string;
  /** The piece's name - used for the accessible label, not shown as copy. */
  name: string;
  /** Directory under /media/reels containing f00..fNN.webp + poster.webp. */
  dir: string;
  /** Number of frames in the sequence. */
  frames: number;
  /** Poster alt text (the SSR/no-JS image). */
  alt: string;
}
