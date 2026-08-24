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
      edits/[slug]/         THE EDITS — the occasion axis (bridal, office, …)
      bespoke/              the custom-jewellery commission
      enquire/              the appointment desk (no backend — see lib/enquiry)
    (shop)/                 FUTURE commerce — empty scaffold (no routes yet)
    api/gold-rate/route.ts  live gold-rate endpoint (cached)
    layout.tsx · loading.tsx · not-found.tsx · sitemap.ts · robots.ts · manifest.ts
  components/
    layout/    Nav (floating capsule), Footer, Loader, WhatsAppButton
    sections/  Hero, ChhedaPromise, JewelleryTypes, EditsRail, Stories, Collections,
               Atelier, DiamondEdit, CommunityStrip, Testimonials, MonthlyPlan,
               Branches, CategoryShowcase
    edits/     EditsIndex (departures board), EditGallery (sticky lookbook), EditMood
    enquire/   BookingFlow (4-step), AppointmentCard
    promise/   Chapters, Hallmark + HuidCheck, Estimator, Refusals, Checklist, Signature
    ui/        Button, Section, SectionHeading, PageHeader, PagePlate, Monogram,
               Wordmark, GoldRateTicker
    motion/    SmoothScroll (Lenis), Reveal, ParallaxImage, SplitLines,
               RouteCurtain, ScrollThemer, useStickyScene
  config/      site.ts, nav.ts, flags.ts   ← config-driven, not hard-coded
  lib/         fonts, gsap (single registration), seo, gold-rate, analytics,
               content/ (typed CMS-swappable content), commerce/ (future)
  styles/      tokens.css (single source of truth), globals.css
  types/       content + commerce types
```

## Key decisions (see the build plan, and `docs/ADR-001`)

- **Two navigation axes.** `/jewellery/[metal]` answers *what it is made of*;
  `/edits/[slug]` answers *where you are wearing it*. They do not nest — see
  `docs/ADR-001-occasion-edits-and-appointments.md` for why, and for what has to
  change when commerce arrives.
- **Appointments need no backend.** `/enquire` composes a message the customer
  sends themselves; every channel decision lives behind `lib/enquiry.ts`, so
  wiring a CRM later touches one file. Nothing is stored or sent in the
  background.
- **Sticky scenes never pin.** All scroll scenes use CSS `position: sticky`
  with ScrollTrigger reading progress only (`motion/useStickyScene`). GSAP is
  never allowed to move layout — see the comment in `RouteCurtain` for the bug
  that rule exists to prevent.
- **The footer is a one-screen sign-off** (`h-[100svh]`): a single full-bleed
  landscape frame with the monogram, CHHEDA at poster scale and a small
  JEWELLERS beneath it, centred — and nothing else. No link rail, no legal row.
  It composes its own lockup rather than reusing `<Wordmark>` (that one is the
  nav ratio, where the second line ends up nearly as wide); the name still
  comes from `config/site`. **Note:** with the legal row gone, `/privacy` and
  `/terms` are reachable only by URL and the sitemap — add links back wherever
  the client wants them before launch.
- **The ring turns only when the visitor turns it.** `/media/reels/turn` is a
  72-frame WebP sequence cut from a 360° turntable generated on the house's
  Magnific account (Kling 3.0, image-to-video from a background-cut still).
  The playhead is `scroll progress × turns + drag/keys` — nothing rotates on
  its own (`motion/useFrameScrub`; pure math in `lib/scrub.ts`). Frames are
  painted to canvas and cross-blended at fractional playheads, which is what
  makes a slow turn glide rather than step. The stage is borderless: a radial
  mask feathers the footage into the page. Frames load lazily; the SSR layer
  is a plain poster.
- **The vitrine gives each piece a whole screen.** One Magnific cutout at a
  time on a full-height section, switched by three small thumbnail buttons; the
  ground IS the screen, so switching washes the whole section between the brand's
  three colours (emerald → cream → oxblood, dark/light/dark). Each piece is held
  at a fixed three-quarter tilt with a sheen masked by the piece itself. Nothing
  tracks the pointer and nothing sways — a case does not wobble when you walk
  past; the only thing that moves is what the visitor presses.
- **The homepage renders from `homepageSections`** in `config/nav.ts` — the
  scroll's choreography is config, not JSX order.
- **Structure → design → motion.** Sections map 1:1 to the homepage flow.
- **Content** lives in typed files under `src/lib/content/` — swap for
  Sanity/Payload later behind the same types; no component changes.
- **Hero A** (cinematic slides) is live; a scroll-driven Hero B can slot into
  the same position when it exists (no dead flag is kept for it).
- **Gold rate** flows through a provider abstraction (`lib/gold-rate.ts`) with a
  clearly-marked indicative fallback + disclaimer. Add a key to go live.
- **Analytics (PostHog)** and **CMS (Sanity)** are scaffolded as abstractions,
  not installed — keeps the bundle lean and needs no keys to build.
- **Motion** honours `prefers-reduced-motion` everywhere via `gsap.matchMedia()`;
  Lenis drives smooth scroll and is disabled under reduced motion.
- **SEO/local**: per-route metadata, `schema.org` JewelryStore for both
  branches, sitemap, robots, OG image.

## Security posture

- Headers are set in `next.config.ts`: nosniff, frame denial (header + CSP
  `frame-ancestors`), referrer policy, a sensors-off Permissions-Policy, HSTS,
  and a conservative CSP (`object-src 'none'; base-uri 'self'`). A nonce-based
  `script-src` CSP is the known next step and needs middleware — do it when a
  backend appears.
- The JSON-LD script escapes `<` so config values can never close the tag; no
  other `dangerouslySetInnerHTML` exists besides the static no-JS style block.
- No secrets ship to the client: gold-rate provider keys are read server-side
  only (`lib/gold-rate.ts`), `.env*` is git-ignored, and the appointment flow
  stores and transmits nothing — the visitor sends the composed message
  themselves.
- `npm audit`: 3 highs live inside Next 15's own bundled `postcss`/`sharp` and
  are only fixed by Next 16 (a breaking major, needs sign-off). Exposure today
  is nil — no user-supplied CSS or images (`images.remotePatterns` is empty).
  Revisit at the Next 16 upgrade.

## ⚠️ Before launch — content to confirm (`TODO(client)`)

Placeholders are flagged in `config/site.ts` and content files:

- Real **branch addresses, phones, hours, coordinates** (both branches).
- **Contact** phone / WhatsApp / email and the **WhatsApp community** link.
- **Investors** direction (investor relations vs. gold-investment scheme) —
  the page states a position and a roadmap but publishes no figures.
- **Bespoke** deposit split, design-fee policy and lead times
  (`lib/content/bespoke.ts`) — currently labelled indicative in the UI.
- **Appointment routing**: which number/inbox bookings should reach, and whether
  after-hours viewings are actually offered at both branches.
- Real, attributable **Google reviews** + review counts.
- Live **gold-rate provider** + key; confirm 22K/24K + city.
- **Plan mechanics** (tenure, instalment, benefit) and full T&Cs.
- Legal review of **Privacy** and **Terms** templates.
```
