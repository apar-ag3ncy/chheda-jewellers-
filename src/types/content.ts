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
  eyebrow: string;
  headline: string;
  sub: string;
  image: ImageAsset;
  cta?: CTA;
}

export interface CTA {
  label: string;
  href: string;
}

export interface PromiseValue {
  id: string;
  title: string;
  description: string;
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
  cta: CTA;
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
