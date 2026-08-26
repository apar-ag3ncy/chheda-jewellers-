/**
 * SITE CONFIG - single source of truth for brand identity & contact.
 * The brand name lives here ONCE and is referenced everywhere.
 * Never hard-type "Chheda Jewellers" into a component.
 *
 * ⚠️ Fields marked `TODO(client)` are placeholders awaiting real data.
 *    Phone numbers / addresses below are PLACEHOLDERS - confirm before launch.
 */

const DEFAULT_SITE_URL = "https://www.chhedajewellers.com";

/**
 * Resolve the public origin defensively. Handles every way NEXT_PUBLIC_SITE_URL
 * can be wrong in a deploy environment - unset, empty/whitespace, or missing a
 * protocol (e.g. "www.chhedajewellers.com") - so `new URL()` in the metadata
 * (metadataBase) can never throw "Invalid URL" during the build.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteConfig = {
  /** Canonical brand name - always the full form. */
  name: "Chheda Jewellers",
  shortName: "Chheda",
  legalName: "Chheda Jewellers",

  tagline: "Heirlooms in the making",
  description:
    "Chheda Jewellers - a house of fine gold, diamond and polki jewellery in Mumbai. Editorial craftsmanship, timeless design, and pieces made to be passed down.",

  /** Public origin - always a valid absolute URL (see resolveSiteUrl). */
  url: resolveSiteUrl(),

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
   * Two branches - real localities (Vile Parle East · Trinity Square, and
   * Ghatkopar East · near Khau Galli). TODO(client): confirm door numbers,
   * phones, hours and the exact map pins.
   */
  branches: [
    {
      id: "vile-parle",
      name: "Chheda Jewellers - Vile Parle",
      area: "Vile Parle East",
      addressLines: ["Trinity Square", "Vile Parle (East)"],
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400057",
      phone: "+91 22 0000 0000", // TODO(client)
      hours: "Mon-Sun · 11:00 AM - 8:30 PM", // TODO(client)
      // Trinity Square, Vile Parle East - near the station. TODO(client):
      // confirm the exact door pin.
      coordinates: { lat: 19.0999, lng: 72.8503 }, // TODO(client): exact door
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Chheda+Jewellers+Trinity+Square+Vile+Parle+East",
      verified: false,
    },
    {
      id: "ghatkopar",
      name: "Chheda Jewellers - Ghatkopar",
      area: "Ghatkopar East",
      addressLines: ["Near Khau Galli, M.G. Road", "Ghatkopar (East)"],
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400077",
      phone: "+91 22 0000 0000", // TODO(client)
      hours: "Mon-Sun · 11:00 AM - 8:30 PM", // TODO(client)
      // M.G. Road by Khau Galli, Ghatkopar East. TODO(client): confirm the
      // exact door pin.
      coordinates: { lat: 19.0855, lng: 72.9098 }, // TODO(client): exact door
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Chheda+Jewellers+Khau+Galli+Ghatkopar+East",
      verified: false,
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type Branch = (typeof siteConfig.branches)[number];
