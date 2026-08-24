import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { edits } from "@/lib/content/edits";

type Freq = "daily" | "weekly" | "monthly";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  // A stable content date rather than the build time, so deploys don't falsely
  // signal that every page changed. Bump when content is meaningfully updated.
  const lastModified = new Date("2026-08-24");

  const routes: { path: string; priority: number; freq: Freq }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/jewellery", priority: 0.9, freq: "monthly" },
    { path: "/jewellery/gold", priority: 0.8, freq: "monthly" },
    { path: "/jewellery/diamond", priority: 0.8, freq: "monthly" },
    { path: "/jewellery/polki", priority: 0.8, freq: "monthly" },
    { path: "/edits", priority: 0.9, freq: "monthly" },
    ...edits.map((e) => ({
      path: `/edits/${e.slug}`,
      priority: 0.8,
      freq: "monthly" as Freq,
    })),
    { path: "/bespoke", priority: 0.8, freq: "monthly" },
    { path: "/enquire", priority: 0.8, freq: "monthly" },
    { path: "/chheda-promise", priority: 0.7, freq: "monthly" },
    { path: "/offers-and-plans", priority: 0.7, freq: "monthly" },
    { path: "/live-gold-rate", priority: 0.7, freq: "daily" },
    { path: "/investors", priority: 0.5, freq: "monthly" },
    { path: "/journal", priority: 0.4, freq: "monthly" },
    { path: "/privacy", priority: 0.2, freq: "monthly" },
    { path: "/terms", priority: 0.2, freq: "monthly" },
  ];

  return routes.map(({ path, priority, freq }) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: freq,
    priority,
  }));
}
