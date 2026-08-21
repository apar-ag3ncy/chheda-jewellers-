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
  note: string;
}
