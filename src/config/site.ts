/**
 * SITE CONFIG — single source of truth for brand identity & contact.
 * The brand name lives here ONCE and is referenced everywhere.
 * Never hard-type "Chheda Jewellers" into a component.
 *
 * ⚠️ Fields marked `TODO(client)` are placeholders awaiting real data.
 *    Phone numbers / addresses below are PLACEHOLDERS — confirm before launch.
 */

export const siteConfig = {
  /** Canonical brand name — always the full form. */
  name: "Chheda Jewellers",
  shortName: "Chheda",
  legalName: "Chheda Jewellers",

  tagline: "Heirlooms in the making",
  description:
    "Chheda Jewellers — a house of fine gold, diamond and polki jewellery in Mumbai. Editorial craftsmanship, timeless design, and pieces made to be passed down.",

  /** Public origin. Falls back to production domain for SSR/metadata. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://www.chhedajewellers.com",

  locale: "en_IN",

  /** TODO(client): confirm all contact details. */
  contact: {
    phone: "+91 22 0000 0000", // TODO(client)
    phoneHref: "tel:+912200000000", // TODO(client)
    whatsapp: "+91 00000 00000", // TODO(client)
    whatsappHref: "https://wa.me/910000000000", // TODO(client)
    email: "hello@chhedajewellers.com", // TODO(client)
  },

  /** Social + community. TODO(client): confirm handles/links. */
  socials: {
    instagram: "https://www.instagram.com/chhedajewellers",
    instagramHandle: "@chhedajewellers",
    whatsappCommunity: "https://chat.whatsapp.com/", // TODO(client): invite link
    facebook: "https://www.facebook.com/chhedajewellers",
    youtube: "",
    linkedin: "https://www.linkedin.com/company/chhedajewellers",
  },

  /**
   * Two branches. Designed location section, not raw embeds.
   * TODO(client): confirm exact addresses, phones, hours, coordinates.
   */
  branches: [
    {
      id: "vile-parle",
      name: "Chheda Jewellers — Vile Parle",
      area: "Vile Parle",
      addressLines: ["Ground Floor, Chheda House", "Vile Parle (West)"], // TODO(client)
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400056", // TODO(client)
      phone: "+91 22 0000 0000", // TODO(client)
      hours: "Mon–Sun · 11:00 AM – 8:30 PM", // TODO(client)
      coordinates: { lat: 19.0968, lng: 72.8465 }, // approx Vile Parle — TODO(client)
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Chheda+Jewellers+Vile+Parle",
      verified: false,
    },
    {
      id: "second-branch",
      name: "Chheda Jewellers — Second Branch",
      area: "Mumbai", // TODO(client): which locality?
      addressLines: ["Second Branch Address", "Mumbai"], // TODO(client)
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400000", // TODO(client)
      phone: "+91 22 0000 0000", // TODO(client)
      hours: "Mon–Sun · 11:00 AM – 8:30 PM", // TODO(client)
      coordinates: { lat: 19.076, lng: 72.8777 }, // TODO(client)
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Chheda+Jewellers+Mumbai",
      verified: false,
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type Branch = (typeof siteConfig.branches)[number];
