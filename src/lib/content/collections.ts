import type { Collection } from "@/types/content";

/**
 * Collections — each with a strong visual identity. Feels like a
 * jewellery campaign, not a catalogue.
 */
export const collections: Collection[] = [
  {
    id: "vivaha",
    name: "Vivaha",
    tagline: "The bridal legacy",
    description:
      "Temple gold, polki and uncut diamonds for the seven days that a family remembers forever.",
    image: {
      src: "/media/collections/collection-01.jpg",
      alt: "Bride in full bridal jewellery against a palace corridor",
      focus: "50% 30%",
    },
    href: "/jewellery/polki",
  },
  {
    id: "roz",
    name: "Roz",
    tagline: "Everyday fine gold",
    description:
      "Lightweight 22K pieces for the woman who wears her gold from morning to midnight.",
    image: {
      src: "/media/collections/collection-02.jpg",
      alt: "Model wearing delicate everyday gold jewellery",
      focus: "50% 28%",
    },
    href: "/jewellery/gold",
  },
  {
    id: "noor",
    name: "Noor",
    tagline: "Diamonds, reimagined",
    description:
      "Certified solitaires and contemporary diamond silhouettes for a modern wardrobe.",
    image: {
      src: "/media/collections/collection-03.jpg",
      alt: "Close-up of diamond jewellery catching the light",
      focus: "50% 40%",
    },
    href: "/jewellery/diamond",
  },
  {
    id: "virasat",
    name: "Virasat",
    tagline: "Heritage revived",
    description:
      "Antique-finish jadau and kundan work, faithful to the craft that came before us.",
    image: {
      src: "/media/collections/collection-04.jpg",
      alt: "Model wearing antique-finish kundan and jadau jewellery",
      focus: "50% 26%",
    },
    href: "/jewellery/polki",
  },
];
