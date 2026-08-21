/**
 * NAVIGATION CONFIG — the 5 primary items (floating capsule).
 * Section order for the homepage also lives here so it is data,
 * not hard-coded JSX.
 */

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  /** Optional mega/dropdown children. */
  children?: NavChild[];
};

export const primaryNav: NavItem[] = [
  {
    label: "All Jewellery",
    href: "/jewellery",
    children: [
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
    ],
  },
  { label: "Chheda Promise", href: "/chheda-promise" },
  { label: "Offers & Plans", href: "/offers-and-plans" },
  { label: "Investors", href: "/investors" },
  { label: "Live Gold Rate", href: "/live-gold-rate" },
];

/**
 * Homepage section order. `swapWithNext` lets the Community and
 * Testimonials strips trade places (per spec §6, order ⇄ swappable)
 * without touching JSX — flip the flag in config/flags.ts.
 */
export const homepageSections = [
  "hero",
  "chheda-promise",
  "jewellery-types",
  "stories",
  "collections",
  "community",
  "testimonials",
  "monthly-plan",
  "branches",
] as const;

export type HomepageSection = (typeof homepageSections)[number];
