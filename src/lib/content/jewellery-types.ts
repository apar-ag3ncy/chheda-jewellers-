import type { JewelleryType } from "@/types/content";

/** Types of Jewellery - Necklace · Earrings · Rings · Hathphool. */
export const jewelleryTypes: JewelleryType[] = [
  {
    id: "necklace",
    name: "Necklaces",
    subtitle: "The centrepiece",
    description:
      "From a featherlight everyday chain to the full bridal rani-haar - the piece that sets the tone for everything else.",
    image: {
      src: "/media/types/necklace.jpg",
      alt: "Model wearing a layered gold and polki bridal necklace",
      focus: "50% 32%",
    },
    href: "/jewellery",
  },
  {
    id: "earrings",
    name: "Earrings",
    subtitle: "Framing the face",
    description:
      "Chandbalis, jhumkas and studs - quiet studs for the day, cascading drops for the evening.",
    image: {
      src: "/media/types/earrings.jpg",
      alt: "Close portrait showing ornate chandbali earrings and maang tikka",
      focus: "50% 30%",
    },
    href: "/jewellery",
  },
  {
    id: "rings",
    name: "Rings",
    subtitle: "The promise worn daily",
    description:
      "Solitaires, bands and statement cocktail rings - the smallest pieces that carry the largest meaning.",
    image: {
      src: "/media/types/rings.jpg",
      alt: "Hand adorned with statement rings resting against embroidered fabric",
      focus: "50% 45%",
    },
    href: "/jewellery",
  },
  {
    id: "hathphool",
    name: "Hathphool",
    subtitle: "Ornament of the hand",
    description:
      "The hand-panja that connects ring to bracelet in a single flourish - the most romantic piece a bride wears.",
    image: {
      src: "/media/types/hathphool.jpg",
      alt: "Hathphool hand ornament with bangles worn by a model",
      focus: "50% 40%",
    },
    href: "/jewellery",
  },
];
