import type { HeroSlide } from "@/types/content";

/**
 * Hero A — stable cinematic slides. Each slide holds subtle continuous
 * motion (handled in the section), never a hard stop. Copy is editorial,
 * never product-led.
 */
export const heroSlides: HeroSlide[] = [
  {
    id: "heirloom",
    eyebrow: "For a generation in Mumbai",
    headline: "Heirlooms\nin the making",
    sub: "Fine gold, diamond and polki, handcrafted to be worn today and inherited tomorrow.",
    image: {
      src: "/media/hero/hero-01.jpg",
      alt: "Bride in profile wearing layered polki jewellery and jasmine",
      focus: "50% 30%",
    },
    cta: { label: "Explore the house", href: "/jewellery" },
  },
  {
    id: "bridal",
    eyebrow: "The Bridal Atelier",
    headline: "Worn on\nthe day you\nremember",
    sub: "Regal polki, uncut diamonds and temple gold, designed for the once-in-a-lifetime moments.",
    image: {
      src: "/media/hero/hero-02.jpg",
      alt: "Model in a palace corridor wearing a traditional gold necklace",
      focus: "50% 32%",
    },
    cta: { label: "Discover Polki", href: "/jewellery/polki" },
  },
  {
    id: "craft",
    eyebrow: "Craft & Certainty",
    headline: "Every gram,\naccounted for",
    sub: "Hallmarked purity, transparent making, and a price you can always trace to the day's rate.",
    image: {
      src: "/media/hero/hero-03.jpg",
      alt: "Model in daylight against a palace jharokha wearing gold jewellery",
      focus: "50% 32%",
    },
    cta: { label: "The Chheda Promise", href: "/chheda-promise" },
  },
];
