/**
 * CONTENT TYPES — the shape of all editorial data.
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

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  description: string;
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
  headline: string;
  intro: string;
  hero: ImageAsset;
  signatures: {
    id: string;
    title: string;
    description: string;
    image: ImageAsset;
  }[];
  /** Curated edit — a handful of pieces that show the category's range. */
  gallery: ImageAsset[];
  note: string;
}

/* ============================================================
   THE EDITS — occasion-led categories.

   A second, independent axis through the same house. `categories`
   (gold / diamond / polki) answers "what is it made of"; an edit answers
   "where are you wearing it". They deliberately do not nest: a bridal edit
   pulls from all three metals, and a single piece can appear in several
   edits. Keeping the axes separate is what stops the IA collapsing into a
   product taxonomy the moment commerce arrives.
   ============================================================ */

/** A single ruled row in an edit's "how to wear it" table. */
export interface EditNote {
  label: string;
  value: string;
}

export interface OccasionEdit {
  slug: string;
  /** Short label for nav, chips and cross-links. */
  name: string;
  /** The editorial title — may carry *italic* phrases via `emphasise`. */
  title: string;
  /** Wide-tracked kicker above the title. */
  eyebrow: string;
  /** One line that has to earn the click. */
  hook: string;
  intro: string;
  /** Accent tone used for the edit's chip / rule / index number. */
  mood: "rose" | "ember" | "ink" | "sun" | "dusk";
  hero: ImageAsset;
  /** Six frames — the edit's own gallery. */
  gallery: ImageAsset[];
  /** The styling brief, as a ruled table. */
  notes: EditNote[];
  /** Three pieces that define the edit. */
  picks: { id: string; title: string; description: string }[];
  /** Which metal rooms this edit draws from. */
  drawsFrom: CategoryPage["slug"][];
}

/* ============================================================
   BESPOKE — the custom-jewellery commission.
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
   THE RING — the scrub-driven 360° turntable.
   ============================================================ */

/** A directory of extracted frames the visitor rotates through. */
export interface FilmReel {
  id: string;
  /** The piece's name — used for the accessible label, not shown as copy. */
  name: string;
  /** Directory under /media/reels containing f00..fNN.webp + poster.webp. */
  dir: string;
  /** Number of frames in the sequence. */
  frames: number;
  /** Poster alt text (the SSR/no-JS image). */
  alt: string;
}
