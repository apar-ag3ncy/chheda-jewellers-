/**
 * FEATURE FLAGS — build-time toggles for experiments & swappable slots.
 * Later these can be driven by PostHog (see lib/analytics.ts) for real
 * A/B tests; for now they are static, typed defaults.
 */

export type HeroVariant = "A" | "B";

export const flags = {
  /**
   * Hero A/B. Build A first (stable cinematic slides); B is the
   * scroll-driven variant. The hero is a swappable slot behind this flag.
   */
  heroVariant: "A" as HeroVariant,


  /** Show the on-brand cinematic loader on first visit. */
  loaderEnabled: true,

  /** Persistent floating WhatsApp/chat button. */
  floatingChatEnabled: true,

  /** Live gold-rate ticker in the nav. */
  navGoldRate: true,
} as const;

export type Flags = typeof flags;
