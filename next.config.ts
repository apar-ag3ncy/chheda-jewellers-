import type { NextConfig } from "next";

/**
 * Security headers. Deliberately conservative: only directives that cannot
 * break Next's inline runtime are sent (a nonce-based script-src CSP is a
 * larger change — tracked in README). What these buy:
 *   frame-ancestors/X-Frame-Options  — no clickjacking wrapper sites
 *   nosniff                          — no MIME-confusion execution
 *   object-src/base-uri              — no plugin embeds, no <base> hijack
 *   Referrer-Policy                  — full URLs never leak cross-origin
 *   Permissions-Policy               — the site never asks for sensors
 *   HSTS                             — HTTPS pinned for two years once seen
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Content-Security-Policy",
    value: "object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Local, self-hosted media only for now. Add remote CMS/commerce hosts here
    // (e.g. Sanity CDN, Shopify) when the content/commerce phase begins.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  eslint: {
    // Lint is run in dev and CI (`npm run lint`), not coupled to the production
    // build — so a lint hiccup in the deploy environment can never block a ship.
    // Type-checking stays ON (below is Next's default: build fails on type errors).
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
