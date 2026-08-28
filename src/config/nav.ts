/**
 * NAVIGATION CONFIG - the 5 primary items (floating capsule).
 * Section order for the homepage also lives here so it is data,
 * not hard-coded JSX.
 */


export type NavChild = {
  label: string;
  href: string;
  /**
   * The one frame that stands for this category. The mega menu is a row of
   * pictures rather than a list of sentences - a jeweller's categories are
   * told apart by eye long before they are told apart by a description, and
   * "22K heritage gold, handcrafted" was doing less work than the photograph
   * it sat next to.
   */
  image?: { src: string; alt: string; focus?: string };
};

/** A titled column inside a mega menu. */
export type NavGroup = {
  title: string;
  /** Index page for the whole group - the title renders as a link when set. */
  href?: string;
  /** Optional note under the column title. */
  note?: string;
  items: NavChild[];
};

export type NavItem = {
  label: string;
  href: string;
  /** Optional mega menu, rendered as titled columns. */
  groups?: NavGroup[];
};

export const primaryNav: NavItem[] = [
  {
    label: "All Jewellery",
    href: "/jewellery",
    groups: [
      {
        title: "By metal",
        items: [
          {
            label: "Gold",
            href: "/jewellery/gold",
            image: {
              src: "/media/categories/gold/g3.jpg",
              alt: "A 22K gold choker and jhumkas worn against red",
              focus: "50% 44%",
            },
          },
          {
            label: "Diamond",
            href: "/jewellery/diamond",
            image: {
              src: "/media/categories/diamond/d3.jpg",
              alt: "A diamond drop earring and cocktail ring in low studio light",
              focus: "54% 30%",
            },
          },
          {
            label: "Polki",
            href: "/jewellery/polki",
            image: {
              src: "/media/categories/polki/sapphire-choker.jpg",
              alt: "A polki choker set with a sapphire drop, seen close",
              focus: "50% 54%",
            },
          },
          {
            label: "Bespoke",
            href: "/bespoke",
            image: {
              src: "/media/bespoke/01.jpg",
              alt: "Hands fastening a heavy gold necklace at a fitting",
              focus: "50% 42%",
            },
          },
        ],
      },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Chheda Promise", href: "/chheda-promise" },
  { label: "Offers & Plans", href: "/offers-and-plans" },
  { label: "Investors", href: "/investors" },
  { label: "Live Gold Rate", href: "/live-gold-rate" },
];

/**
 * Homepage section order - the single place the scroll is choreographed.
 * The homepage renders FROM this list (see app/(marketing)/page.tsx), so
 * reordering the journey is a config edit, never a JSX surgery.
 */
export const homepageSections = [
  "hero",
  "jewellery-types",
  "chheda-promise",
  "vitrine",
  "stories",
  "testimonials",
  "diamond-edit",
  "monthly-plan",
  "film-room",
  "community",
  "branches",
] as const;

export type HomepageSection = (typeof homepageSections)[number];
