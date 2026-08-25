import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const baseUrl = siteConfig.url;

/** Root metadata - extended per route via `pageMetadata`. */
export const baseMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    siteConfig.name,
    "jewellers in Mumbai",
    "gold jewellery Vile Parle",
    "polki jewellery",
    "diamond jewellery Mumbai",
    "bridal jewellery",
    "22K gold",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: baseUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: "/brand/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/brand/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export function pageMetadata(opts: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const { title, description, path } = opts;
  const desc = description ?? siteConfig.description;
  const ogTitle = `${title} · ${siteConfig.name}`;
  // Next merges metadata shallowly: a child `openGraph`/`twitter` REPLACES the
  // parent's, so each must be re-declared in full (incl. the OG image) or deep
  // pages would share the homepage card / lose their thumbnail.
  return {
    title,
    description: desc,
    alternates: path ? { canonical: path } : undefined,
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: ogTitle,
      description: desc,
      url: path ?? "/",
      images: [
        {
          url: "/brand/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${siteConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: desc,
      images: ["/brand/og-image.jpg"],
    },
  };
}

/**
 * schema.org JSON-LD. Organization is always emitted; JewelryStore
 * (LocalBusiness) nodes are only published once a branch is `verified`, so we
 * never ship placeholder NAP (name/address/phone) - which would hurt local
 * ranking and trust. Each store carries a stable @id so the two branches are
 * never de-duplicated.
 */
export function localBusinessJsonLd() {
  const stores = siteConfig.branches
    .filter((b) => b.verified)
    .map((b) => ({
      "@context": "https://schema.org",
      "@type": "JewelryStore",
      "@id": `${baseUrl}/#${b.id}`,
      name: b.name,
      image: `${baseUrl}/brand/og-image.jpg`,
      url: `${baseUrl}/#${b.id}`,
      hasMap: b.directionsUrl,
      telephone: b.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: b.addressLines.join(", "),
        addressLocality: b.area,
        addressRegion: b.state,
        postalCode: b.pincode,
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: b.coordinates.lat,
        longitude: b.coordinates.lng,
      },
      openingHours: "Mo-Su 11:00-20:30",
      priceRange: "₹₹₹",
    }));

  const organization = {
    "@id": `${baseUrl}/#organization`,
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: baseUrl,
    logo: `${baseUrl}/brand/logo-stacked.png`,
    sameAs: [
      siteConfig.socials.instagram,
      siteConfig.socials.facebook,
      siteConfig.socials.linkedin,
    ].filter(Boolean),
  };

  return [organization, ...stores];
}
