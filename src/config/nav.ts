/**
 * NAVIGATION CONFIG - the 5 primary items (floating capsule).
 * Section order for the homepage also lives here so it is data,
 * not hard-coded JSX.
 */


export type NavChild = {
  label: string;
  href: string;
  description?: string;
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
        note: "What it is made of",
        items: [
          {
            label: "Gold",
            href: "/jewellery/gold",
            description: "22K heritage gold, handcrafted",
          },
          {
            label: "Diamond",
            href: "/jewellery/diamond",
            description: "Certified brilliance, modern lines",
          },
          {
            label: "Polki",
            href: "/jewellery/polki",
            description: "Uncut diamonds, regal Kundan work",
          },
          {
            label: "Bespoke",
            href: "/bespoke",
            description: "Drawn for one person - or remade from your own gold",
          },
        ],
      },
    ],
  },
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
  "collections",
  "chheda-promise",
  "jewellery-types",
  "vitrine",
  "stories",
  "film-room",
  "testimonials",
  "diamond-edit",
  "atelier",
  "monthly-plan",
  "community",
  "branches",
] as const;

export type HomepageSection = (typeof homepageSections)[number];
