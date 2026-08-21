# Chheda Jewellers

A premium, editorial jewellery brand experience — a cinematic single-scroll
homepage plus deep category pages. Built to grow into headless commerce later
without a rewrite.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript (strict) ·
Tailwind CSS v4 · GSAP + ScrollTrigger + SplitText (`@gsap/react`) · Lenis.

> Read `CLAUDE.md` before contributing — it holds the design system, motion
> rules and guardrails. Full context is in
> `../CHHEDA-PREBUILD-CLAUDE-files/CHHEDA-JEWELLERS_BUILD-PLAN.md`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Optional live-data features read from `.env.local` (copy `.env.example`).
Everything builds and runs with safe fallbacks and **no keys required**.

```bash
npm run build    # production build
npm run typecheck
npm run lint
```

## Project structure

```
public/
  brand/     monogram.svg, logos, og-image, favicons
  fonts/     Cormorant Infant + Montserrat (self-hosted woff2)
  media/     curated, web-optimised photography (hero, stories, …)
src/
  app/
    (marketing)/            the current experience (home + deep pages)
    (shop)/                 FUTURE commerce — empty scaffold (no routes yet)
    api/gold-rate/route.ts  live gold-rate endpoint (cached)
    layout.tsx · loading.tsx · not-found.tsx · sitemap.ts · robots.ts · manifest.ts
  components/
    layout/    Nav (floating capsule), Footer, Loader, WhatsAppButton
    sections/  Hero, ChhedaPromise, JewelleryTypes, Stories, Collections,
               CommunityStrip, Testimonials, MonthlyPlan, Branches, CategoryShowcase
    ui/        Button, Section, SectionHeading, PageHeader, Monogram, Wordmark, GoldRateTicker
    motion/    SmoothScroll (Lenis), Reveal, ParallaxImage
  config/      site.ts, nav.ts, flags.ts   ← config-driven, not hard-coded
  lib/         fonts, gsap (single registration), seo, gold-rate, analytics,
               content/ (typed CMS-swappable content), commerce/ (future)
  styles/      tokens.css (single source of truth), globals.css
  types/       content + commerce types
```

## Key decisions (see the build plan)

- **Structure → design → motion.** Sections map 1:1 to the homepage flow.
- **Content** lives in typed files under `src/lib/content/` — swap for
  Sanity/Payload later behind the same types; no component changes.
- **Hero A** (cinematic slides) is live behind a swappable flag
  (`config/flags.ts`, `heroVariant`). Hero B (scroll-driven) can slot in.
- **Gold rate** flows through a provider abstraction (`lib/gold-rate.ts`) with a
  clearly-marked indicative fallback + disclaimer. Add a key to go live.
- **Analytics (PostHog)** and **CMS (Sanity)** are scaffolded as abstractions,
  not installed — keeps the bundle lean and needs no keys to build.
- **Motion** honours `prefers-reduced-motion` everywhere via `gsap.matchMedia()`;
  Lenis drives smooth scroll and is disabled under reduced motion.
- **SEO/local**: per-route metadata, `schema.org` JewelryStore for both
  branches, sitemap, robots, OG image.

## ⚠️ Before launch — content to confirm (`TODO(client)`)

Placeholders are flagged in `config/site.ts` and content files:

- Real **branch addresses, phones, hours, coordinates** (both branches).
- **Contact** phone / WhatsApp / email and the **WhatsApp community** link.
- **Investors** direction (investor relations vs. gold-investment scheme).
- Real, attributable **Google reviews** + review counts.
- Live **gold-rate provider** + key; confirm 22K/24K + city.
- **Plan mechanics** (tenure, instalment, benefit) and full T&Cs.
- Legal review of **Privacy** and **Terms** templates.
```
