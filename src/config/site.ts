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

  /**
   * TODO(client): confirm all contact details.
   *
   * Until they are confirmed these are placeholder digits, and anything that
   * would DIAL or MESSAGE them has to degrade instead of firing into the void.
   * `contactIsReal()` below is the single test for that - derived from the
   * numbers rather than a second flag someone can forget to flip.
   */
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
      addressLines: ["Vardhaman Business Bay", "Khau Galli, Ghatkopar (East)"],
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400077",
      phone: "+91 22 0000 0000", // TODO(client)
      hours: "Mon-Sun · 11:00 AM - 8:30 PM", // TODO(client)
      // Vardhaman Business Bay, Khau Galli, Ghatkopar East. TODO(client): confirm the
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

/**
 * Are the published phone/WhatsApp details real yet?
 *
 * Derived, not declared: a placeholder is a number whose digits are all zeros
 * after the country code. This cannot drift out of sync with the data the way
 * a hand-maintained boolean would - the day a real number is pasted in, every
 * call and WhatsApp affordance on the site turns itself back on.
 */
export function contactIsReal(): boolean {
  // A placeholder betrays itself with a long run of one repeated digit
  // ("+91 22 0000 0000"). Testing for six in a row catches every filler we
  // use without rejecting a real number - no Indian subscriber number has a
  // run that long. Checking "all digits identical" is NOT enough: the STD
  // code in front of the zeros defeats it.
  const meaningful = (v: string) => {
    const d = v.replace(/\D/g, "");
    // Indian numbers are exactly ten subscriber digits, with or without the
    // 91 country code in front. Anything else is a stub, and degrading is the
    // safe direction: better to route to email than to dial a wrong number.
    const full = d.startsWith("91") ? d.length === 12 : d.length === 10;
    return full && !/(\d)\1{5,}/.test(d);
  };
  return meaningful(siteConfig.contact.phoneHref) && meaningful(siteConfig.contact.whatsappHref);
}

/**
 * The brand name split into the two lines the wordmark and the sign-off both
 * set it on. Implemented twice before, and both copies silently discarded
 * anything past the second word - so a three-word name would have lost one.
 */
export function houseLines(): [string, string] {
  const [first, ...rest] = siteConfig.name.split(" ");
  return [first ?? siteConfig.name, rest.join(" ")];
}

/**
 * The brand emerald as a literal, for the handful of places that cannot read
 * a CSS custom property: the web manifest, the browser theme colour, and the
 * root error boundary (which must render before any stylesheet is guaranteed).
 * Everything else uses the --green token. Keep in step with tokens.css.
 */
export const BRAND_EMERALD = "#0b3a2d";
