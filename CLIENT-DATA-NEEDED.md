# What the client still owes

Generated from the code - every line below is a real `TODO(client)` marker.
Fill these in and the site is launch-ready; nothing else is blocking.

---

## 1. Contact details - BLOCKER

`src/config/site.ts`

| field | current placeholder | needs |
|---|---|---|
| `contact.phone` | `+91 22 0000 0000` | shop landline |
| `contact.phoneHref` | `tel:+912200000000` | same, as `tel:` |
| `contact.whatsapp` | `+91 00000 00000` | WhatsApp business number |
| `contact.whatsappHref` | `https://wa.me/910000000000` | same, as `wa.me/91XXXXXXXXXX` |
| `contact.email` | `hello@chhedajewellers.com` | confirm or correct |

> **This is now the most urgent item on the list.** Every Call and WhatsApp
> affordance used to fall back to the booking form; that page has been
> removed, so those controls now render as NOTHING until a real number is
> published - the floating WhatsApp button, the WhatsApp icon in the menu,
> the Call button on each branch card, and "Ask us" on the gold-rate page.
> Hiding them is deliberate: a control that dials a placeholder looks like a
> live channel and fails silently. Publish the numbers and all four return
> on their own, with no code change.

## 2. The two shops - BLOCKER

`src/config/site.ts`, per branch: `phone`, `hours`, `addressLines`, `coordinates`, then set `verified: true`.

Send a Google Maps pin for each door and I will set exact coordinates - today's
pins are accurate to the neighbourhood, not the doorway.

## 3. Testimonials - BLOCKER

`src/lib/content/testimonials.ts` - three placeholder reviews, `verified: false`.
Needs real attributable Google reviews plus the true rating and count.
**I will not set `verified: true` without them.**

## 4. Figures to confirm before launch

| what | where | current |
|---|---|---|
| Making-charge % | `src/lib/content/promise.ts` | `makingPct: 12` (example only) |
| Plan tenure + contribution | `src/lib/content/plans.ts` | 11+1 months, from Rs 2,000 |
| Bespoke deposit + design fee | `src/lib/content/bespoke.ts` | unconfirmed |
| Investor figures | `src/app/(marketing)/investors/page.tsx` | every number unconfirmed |

## 5. Optional

- **Live gold rate** - needs a paid provider + key (`GOLD_RATE_PROVIDER`, `GOLD_RATE_API_KEY` in `.env`). Without it the ticker shows a plausible indicative rate, labelled as such.
- **Journal** - five pieces commissioned, subjects listed, copy not written.
- **Socials** - confirm handles; WhatsApp community invite link is a bare `chat.whatsapp.com/`.

---

_15 TODO(client) markers in the codebase at time of writing._
