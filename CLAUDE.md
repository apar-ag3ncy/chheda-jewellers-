# CLAUDE.md — Chheda Jewellers

Rules for any AI/dev working in this repo. Read fully before writing code.
Full context lives in `CHHEDA-JEWELLERS_BUILD-PLAN.md`.

---

## What this is
A **premium, editorial jewellery brand experience** — a cinematic single-scroll homepage plus deep category pages. **It is NOT an e-commerce store (yet).** Do not build product-grid / "add to cart" UI unless explicitly told we're in the commerce phase.

**Current phase:** structure first, then design, then motion. Do not add heavy motion before the skeleton is stable.

**North star:** it should feel like a luxury brand film, not a Shopify template. Motion is smooth, intentional, restrained — never gimmicky, never janky.

---

## Locked tech stack (do not swap without asking)
- **Next.js 15 (App Router) + React 19 + TypeScript (strict)**
- **Tailwind CSS v4** with design tokens (below); CSS Modules allowed for bespoke motion scenes
- **GSAP** (core + ScrollTrigger + SplitText) via **`@gsap/react` `useGSAP()`**
- **Lenis** for smooth scroll
- **PostHog** for analytics + A/B experiments
- **Sanity** for CMS *(if enabled — confirm before wiring)*
- **Vercel** hosting
- Optional later: **React Three Fiber** (3D), headless commerce (**Shopify** or **Medusa**)

Do **not** introduce new dependencies without a clear reason and sign-off. Keep the bundle lean.

---

## DESIGN SYSTEM (the source of truth)

### Brand name — always the full form
- **Official name: Chheda Jewellers.** Use the full name in page titles, metadata, OG/social share tags, footer, and copy — never shorten the brand to just "Chheda."
- Store it **once** in `config/site` (e.g. `siteName = "Chheda Jewellers"`) and reference it everywhere — never hard-type the name into components.
- Logo/wordmark may render uppercase (CHHEDA JEWELLERS); running text uses "Chheda Jewellers."
- Intentional short feature names are fine as-is: "Chheda Promise," "Stories by Chheda."

### Colours — use tokens, never raw hex in components
```
--green   #0B3A2D   /* PRIMARY brand + main background (deep emerald) */
--maroon  #440002   /* secondary / accent only — NOT body text on green (low contrast) */
--beige   #E8DDC7   /* PROPOSED — confirm. Warm neutral: text on green, surfaces */
--white   #FFFFFF   /* text / highlights */
--offwhite #F7F3EC  /* soft white for large surfaces / luxury negative space */
```
- Default page background = `--green`.
- Text on green = `--beige` or `--white`/`--offwhite`.
- `--maroon` = accent blocks, dividers, hover/active — **never small text on green**.
- **Every text/background pair must pass WCAG AA.** Check before shipping.

### Typography — ONLY these two fonts. No exceptions.
- **Cormorant Infant** (serif) → display, hero lines, section headings. The editorial voice.
- **Montserrat** (sans) → nav, buttons, body, captions, numbers (incl. gold rate). The functional voice.

Rules:
- Self-host both via `next/font/local` from `public/fonts/` (source: `chheda-J` — `Montserrat-Full-Version 2`, `cormorant-infant`). **No Google Fonts CDN.**
- Big Cormorant statement + small structured Montserrat around it.
- Never Montserrat for hero display; never Cormorant for tiny UI labels.
- No third typeface, no unstyled system-font fallback bleeding through.

### Motion tokens
- Define standard easings + durations in one place (`styles/tokens.css` / `lib/motion`).
- Prefer a signature ease (e.g. a custom cubic-bezier) over defaults for a consistent feel.

---

## Coding conventions
- **TypeScript strict.** No `any` without a comment justifying it. Type props, API responses, CMS data.
- **Components:** one component per file, PascalCase files. Sections live in `components/sections/` and map 1:1 to the homepage flow.
- **Server Components by default;** add `"use client"` only where interactivity/motion needs it (keep client bundles small).
- **No inline styles** except genuinely dynamic values. Styling = Tailwind tokens or CSS Modules.
- **No magic numbers/colours** in components — pull from tokens/config.
- **Config-driven:** nav items, section order, feature flags live in `config/`, not hard-coded in JSX.
- Accessible by default: semantic HTML, alt text, focus states, keyboard nav.
- Keep files small and single-purpose. If a component is doing two jobs, split it.

## Folder structure (respect it)
```
public/{brand,fonts,media}
src/app/(marketing)/…        # current experience
src/app/(shop)/…             # future commerce — leave scaffolded/empty for now
src/app/api/gold-rate/route.ts
src/components/{layout,sections,ui,motion}
src/lib · src/config · src/styles · src/content|sanity · src/types
```
- All animation logic in `components/motion/` or co-located `useGSAP` hooks — **never scattered into business logic.**
- Data/CMS/gold-rate access goes through `lib/` — components don't fetch third-party APIs directly.

---

## Motion rules (GSAP)
- Register GSAP plugins **once** in a central setup module; import it, don't re-register per component.
- Use **`useGSAP()`** so animations are scoped and auto-cleaned (no leaks/flicker on route change).
- **Always** wrap motion in `gsap.matchMedia()` and honour `prefers-reduced-motion`. Ship a reduced/mobile-light path.
- Scroll-scrub scenes = **image sequences painted to `<canvas>`**, preloaded, mapped to ScrollTrigger progress. **Never scrub a raw `<video>`** (stutters on mobile/Safari).
- Lenis drives smooth scroll; wire ScrollTrigger to Lenis. Don't run Lenis and GSAP ScrollSmoother together.

## Performance budget (a feature, not an afterthought)
- Target LCP < 2.5s; keep initial JS lean; lazy-load heavy scenes/3D.
- Optimise every image (`next/image`), compress media, preload only what's above the fold.
- Loading screen stays **fast** — no long fake loaders. Let returning visitors skip it. Never hide content from crawlers.

## SEO (this is a local jeweller — it matters)
- Proper metadata per route; `schema.org` `LocalBusiness` for branches (and `Product` later).
- Sitemap + robots. Two real location pages for the branches.
- Server-render content so it's crawlable — don't lock text behind client-only motion.

---

## Guardrails — do NOT
- ❌ Build e-commerce/product-grid UI unless we're explicitly in the commerce phase.
- ❌ Add a font beyond Cormorant Infant + Montserrat.
- ❌ Use raw hex or magic numbers in components — tokens only.
- ❌ Add dependencies casually or reach for a heavy library where GSAP/CSS suffices.
- ❌ Ship motion without a reduced-motion path.
- ❌ Generate or commit real content/assets you weren't given — use placeholders and flag what's needed.
- ❌ Make large changes without stating the plan first.

## When unsure
Stop and ask. Prefer a clean, boring, correct structure over a clever tangled one. This codebase is going to grow into commerce — every decision should keep future-you from inheriting a mess.
