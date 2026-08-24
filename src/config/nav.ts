/**
 * NAVIGATION CONFIG — the 5 primary items (floating capsule).
 * Section order for the homepage also lives here so it is data,
 * not hard-coded JSX.
 */

import { edits } from "@/lib/content/edits";

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

/** A titled column inside a mega menu. */
export type NavGroup = {
  title: string;
  /** Optional note under the column title. */
  note?: string;
  items: NavChild[];
};

export type NavItem = {
  label: string;
  href: string;
  /**
   * Optional two-axis mega menu. The house is navigable BY METAL (what it is
   * made of) and BY OCCASION (where you are wearing it); those are separate
   * axes, so the menu shows them side by side rather than nesting one inside
   * the other.
   */
  groups?: NavGroup[];
};

const editChildren: NavChild[] = edits.map((e) => ({
  label: e.name,
  href: `/edits/${e.slug}`,
  description: e.hook,
}));

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
            description: "Drawn for one person — or remade from your own gold",
          },
        ],
      },
      {
        title: "The Edits",
        note: "Where you are wearing it",
        items: editChildren,
      },
    ],
  },
  { label: "Chheda Promise", href: "/chheda-promise" },
  { label: "Offers & Plans", href: "/offers-and-plans" },
  { label: "Investors", href: "/investors" },
  { label: "Live Gold Rate", href: "/live-gold-rate" },
];

/**
 * Homepage section order — the single place the scroll is choreographed.
 * The homepage renders FROM this list (see app/(marketing)/page.tsx), so
 * reordering the journey is a config edit, never a JSX surgery.
 */
export const homepageSections = [
  "hero",
  "chheda-promise",
  "jewellery-types",
  "edits",
  "stories",
  "manifesto",
  "collections",
  "atelier",
  "diamond-edit",
  "film-room",
  "vitrine",
  "testimonials",
  "monthly-plan",
  "branches",
  "community",
] as const;

export type HomepageSection = (typeof homepageSections)[number];
