import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Local, self-hosted media only for now. Add remote CMS/commerce hosts here
    // (e.g. Sanity CDN, Shopify) when the content/commerce phase begins.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  eslint: {
    // Lint is run in dev and CI (`npm run lint`), not coupled to the production
    // build — so a lint hiccup in the deploy environment can never block a ship.
    // Type-checking stays ON (below is Next's default: build fails on type errors).
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
