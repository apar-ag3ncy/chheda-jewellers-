import type { HeroSlide } from "@/types/content";

/**
 * Hero A - stable cinematic slides. Each slide holds subtle continuous
 * motion (handled in the section), never a hard stop. Copy is editorial,
 * never product-led.
 */
export const heroSlides: HeroSlide[] = [
  {
    /**
     * The Ghatkopar opening. A finished plate: every word is already in the
     * artwork, so `plate` strips the site's own copy, scrim and drift while
     * it shows and lets the picture speak by itself. The headline below is
     * never drawn - it exists so the page still has exactly one h1 on this
     * frame, and so the announcement reaches a screen reader.
     *
     * The artwork was delivered at 1920x600 and is served here at 1920x960:
     * a full-screen hero on a 375px phone would otherwise have cover-cropped
     * the sides hard enough to clip "GHATKOPAR". The 360 extra rows are the
     * plate's own row 0 and row 599 replicated, so both seams measure 0/255
     * and the content sits dead-centre.
     *
     * TODO(client): this is a dated announcement - it reads "4th September
     * 2026". Drop this slide once the shop has opened; nothing else needs to
     * change.
     */
    id: "ghatkopar-opening",
    headline: "Coming to Ghatkopar this Janmashtami - 4th September 2026",
    image: {
      src: "/media/hero/hero-00-ghatkopar.png",
      alt: "Coming to Ghatkopar this Janmashtami, 4th September 2026 - Chheda Jewellers Limited. A gold-draped storefront lit by a single beam, reflected in still water.",
      focus: "50% 50%",
    },
    plate: true,
  },
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
