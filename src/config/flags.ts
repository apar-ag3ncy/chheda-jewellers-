/**
 * FEATURE FLAGS — build-time toggles for experiments & swappable slots.
 * Later these can be driven by PostHog (see lib/analytics.ts) for real
 * A/B tests; for now they are static, typed defaults.
 */

export const flags = {
  /** Show the on-brand cinematic loader on first visit. */
  loaderEnabled: true,

  /** Persistent floating WhatsApp/chat button. */
  floatingChatEnabled: true,

  /** Live gold-rate ticker in the nav. */
  navGoldRate: true,
} as const;

export type Flags = typeof flags;
