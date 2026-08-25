import type { ImageAsset } from "@/types/content";
import { siteConfig } from "@/config/site";

/** Community strip - WhatsApp community + Instagram follow. */
export const community = {
  eyebrow: "Join the house",
  headline: "Be the first to see\nwhat we make next",
  whatsapp: {
    title: "The Chheda Circle",
    description:
      "New collections, private previews and the day's gold rate - shared first with our WhatsApp community.",
    cta: { label: "Join on WhatsApp", href: siteConfig.socials.whatsappCommunity },
  },
  instagram: {
    title: "Follow the atelier",
    description: "Behind the vitrine, in the workshop, and on the brides who wear us.",
    handle: siteConfig.socials.instagramHandle,
    cta: { label: "Follow on Instagram", href: siteConfig.socials.instagram },
  },
  /** Instagram-style gallery. */
  gallery: [
    { src: "/media/community/community-01.jpg", alt: "Model in gold jewellery" },
    { src: "/media/community/community-02.jpg", alt: "Diamond earrings with a rose" },
    { src: "/media/community/community-03.jpg", alt: "Model in red and gold against an emerald wall" },
    { src: "/media/community/community-04.jpg", alt: "Diamond ring worn with the hand raised" },
    { src: "/media/community/community-05.jpg", alt: "Close portrait with gold earrings and necklace" },
    { src: "/media/community/community-06.jpg", alt: "Contemporary emerald and diamond necklace" },
  ] satisfies ImageAsset[],
};
