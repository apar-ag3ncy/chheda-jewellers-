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
  experimental: {
    optimizePackageImports: ["gsap"],
  },
};

export default nextConfig;
