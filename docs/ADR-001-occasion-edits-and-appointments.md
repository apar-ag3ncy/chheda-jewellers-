# ADR-001: Occasion edits, the appointment desk, and the bespoke atelier

**Status:** Accepted
**Date:** 2026-08-24
**Deciders:** Chheda Jewellers (brand owner) · build team
**Supersedes:** nothing. **Superseded by:** nothing.

---

## Context

The site had one navigational axis — **metal** (`/jewellery/gold|diamond|polki`)
— one contact route (a raw WhatsApp deep link labelled "Book a Visit"), and no
place at all for custom work, which is roughly a quarter of what leaves the
counter. Interior pages (`/investors`, `/journal`, `/live-gold-rate`) shared a
bare `PageHeader` and read as afterthoughts next to the cinematic covers.

Forces at play:

- **Customers do not shop by metal.** They arrive with an occasion ("I have a
  wedding in November", "something for the office"). Metal is how a jeweller
  organises stock; occasion is how a customer organises their life.
- **No backend, no CMS, no CRM** is provisioned, and none may be for some time.
  Anything requiring a server has to degrade to something real today.
- **Not a commerce phase.** `CLAUDE.md` forbids product-grid / add-to-cart UI.
- **A large photographic archive** (~120 usable unseen frames) was unused, while
  the live site reused a handful of images across several pages.
- **Motion is a feature, but a fragile one.** The codebase carries a documented
  landmine: any transform on a wrapper makes it a containing block and silently
  breaks `position: fixed` and every ScrollTrigger pin inside it.

---

## Decision

Add a **second, independent navigation axis** (`/edits/[slug]`), a **first-party
appointment desk** (`/enquire`) with a channel-agnostic submission seam, and a
**bespoke atelier** (`/bespoke` + a homepage scene), and give interior pages a
third page-opening register (`PagePlate`).

---

## Options considered

### Axis placement — where do occasion categories live?

| Option | Complexity | IA cost | Commerce-readiness |
|---|---|---|---|
| **A. `/jewellery/[occasion]`** | Low | Collides with the metal slugs; one namespace, two meanings | Poor — the collision hardens |
| **B. `/edits/[slug]` (chosen)** | Low | Two clean axes, explicitly crossed in the nav and on both indexes | Good — a piece can carry both facets |
| **C. Query facets `/jewellery?occasion=` | Medium | No landing pages, no SEO surface | Fine, but nothing to rank |

**Chosen: B.** Occasion and metal are orthogonal — a bridal edit draws from all
three metals, and one piece can appear in several edits. Nesting either inside
the other creates a taxonomy that has to be unpicked the moment commerce lands.
The "All Jewellery" mega menu now shows both columns side by side, which is also
the cheapest way to *teach* the two axes.

### Appointment submission — how does a booking reach the shop?

| Option | Complexity | Cost | Works today |
|---|---|---|---|
| **A. API route → email/CRM** | Medium | Needs credentials + a data-retention answer | No |
| **B. Composed WhatsApp/email message (chosen)** | Low | None | Yes |
| **C. Third-party scheduler embed** | Low | Subscription, off-brand UI, a new dependency | Yes |

**Chosen: B**, behind a seam. All message construction lives in
`src/lib/enquiry.ts`; the UI never touches a channel. Swapping in option A later
changes one function and no components. The customer sees the exact message
before sending it, and nothing is stored or transmitted in the background —
which is both the honest design and the one that needs no privacy review.

### Sticky scroll scenes — pin or sticky?

| Option | Complexity | Risk | Perf |
|---|---|---|---|
| **A. `ScrollTrigger { pin: true }`** | Low to write | High — injects wrappers + pin-spacing; interacts badly with Lenis and a per-route remounting curtain | Reflow on refresh |
| **B. CSS `position: sticky` + ScrollTrigger read-only (chosen)** | Low | Low — ScrollTrigger never touches layout | No reflow |

**Chosen: B**, factored into `components/motion/useStickyScene.ts` and used by
all three sticky scenes (promise chapters, bespoke atelier, edit lookbook).
React state updates once per **step change**, not per frame.

---

## Trade-off analysis

- **Two axes vs. one** costs a second set of landing pages to keep in content
  sync, and buys an information architecture that survives commerce. Mitigated
  by both axes being typed data in `src/lib/content/`, not JSX.
- **No-backend booking** means no confirmation email, no calendar hold, and no
  analytics on drop-off. It buys a feature that ships today and needs no
  credentials or data-retention policy. The seam is the mitigation.
- **Sticky over pin** gives up frame-accurate scrubbed choreography (the stage
  changes in steps, not continuously). It buys immunity to the transform /
  containing-block class of bug that has already bitten this codebase once.
- **A third page-opening register** (`PagePlate`) adds a component to maintain.
  It buys interior pages that read as part of the same publication. `PageHeader`
  is retained for the promise page, which wants a bare opening.

---

## Consequences

**Easier**

- Adding an occasion edit is one object in `src/lib/content/edits.ts`; the nav,
  footer, sitemap, `/edits` index and cross-links all pick it up.
- Every CTA that used to dead-end in WhatsApp now has a destination, and edit
  and bespoke pages deep-link into it (`?edit=`, `?intent=`).
- Interior pages have a shared, structured "spec rail" idiom.

**Harder**

- Two axes mean two places a piece can be mis-filed. There is no cross-check
  yet that an edit's `drawsFrom` matches the pieces actually shown.
- The appointment flow cannot be A/B tested or measured until a backend exists.

**To revisit**

- When a CRM or inbox exists → implement `deliver()` in `lib/enquiry.ts`, add
  double-submit protection and a privacy notice.
- When commerce lands → edits become saved filters over the catalogue rather
  than hand-curated galleries; the `OccasionEdit` type is the migration seam.
- If a third axis is ever proposed (price, metal weight), stop — three axes in a
  capsule nav is where this IA stops being legible.

---

## Action items

1. [x] `OccasionEdit` / `BespokeStep` types; `edits.ts`, `bespoke.ts` content.
2. [x] `/edits`, `/edits/[slug]`, `/bespoke`, `/enquire` routes + sitemap.
3. [x] Two-axis mega menu; footer rail driven from `config/nav.ts`.
4. [x] `useStickyScene`; promise chapters migrated onto it.
5. [x] ~50 new web assets extracted from the archive; no frame reused.
6. [ ] **Client:** confirm WhatsApp number, email, and the bespoke deposit terms
       and lead times (currently marked indicative in the UI).
7. [ ] **Client:** decide the `/investors` direction (see the scope note in that
       page) before it is linked from anywhere public.
8. [ ] Implement `deliver()` once an inbox/CRM exists.
