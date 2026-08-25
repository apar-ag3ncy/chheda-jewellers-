# (shop) - Future commerce scaffold

This route group is **intentionally empty** during the marketing phase. It has
no `page.tsx`, so it produces **no routes** today.

When the commerce phase (Phase 5) begins, product/cart/checkout routes live
here, cleanly separated from the `(marketing)` experience - which stays
untouched.

## What is already in place for a painless transition

- **Data model** - `src/lib/commerce/types.ts` models jewellery with the fields
  Indian retail needs (purity, gross/net weight, making charges, HSN, GST,
  BIS hallmark / HUID).
- **Provider seam** - `src/lib/commerce/provider.ts` implements the
  `CommerceProvider` contract with a no-op. Swap it for a **Shopify Storefront**
  or **Medusa** implementation without changing any UI.
- **Cart context** - `src/lib/commerce/cart.tsx` stubs cart state (`CartProvider`
  / `useCart`), ready to mount around `(shop)` routes.

## Recommended path (from the build plan)

- **Path A - Shopify (headless via Storefront API):** fastest; handles
  payments (Razorpay for India), inventory, GST invoicing.
- **Path B - Medusa.js:** open-source, self-hosted, full control.

Do **not** build product-grid / add-to-cart UI until we are explicitly in the
commerce phase (see `CLAUDE.md` guardrails).
