import type { Story } from "@/types/content";

/**
 * Stories by Chheda — best-sellers treated as editorial stories,
 * explicitly not a product listing.
 */
export const stories: Story[] = [
  {
    id: "first-set",
    kicker: "The Bridal Chapter",
    title: "The set she said yes to",
    excerpt:
      "A polki rani-haar built over three fittings, carrying emeralds chosen to match a grandmother's ring.",
    image: {
      src: "/media/stories/story-01.jpg",
      alt: "Bride in a maroon lehenga wearing an elaborate polki necklace set",
      focus: "50% 24%",
    },
    href: "/jewellery/polki",
  },
  {
    id: "everyday-gold",
    kicker: "Worn Every Day",
    title: "Gold that lives with you",
    excerpt:
      "The chain and studs that never come off — designed to survive a school run and still shine at dinner.",
    image: {
      src: "/media/stories/story-02.jpg",
      alt: "Model wearing warm everyday gold jewellery",
      focus: "50% 28%",
    },
    href: "/jewellery/gold",
  },
  {
    id: "heirloom-remade",
    kicker: "Remade to Remember",
    title: "Her mother's gold, again",
    excerpt:
      "An old haar melted and reimagined into something a new bride would actually wear — the metal, the memory, untouched.",
    image: {
      src: "/media/stories/story-03.jpg",
      alt: "Portrait of a bride adorned in reimagined heirloom gold jewellery",
      focus: "50% 26%",
    },
    href: "/chheda-promise",
  },
];
