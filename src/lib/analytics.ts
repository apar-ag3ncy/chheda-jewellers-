/**
 * ANALYTICS ABSTRACTION (PostHog-ready).
 *
 * The heavy `posthog-js` SDK is intentionally NOT installed yet - this keeps
 * the bundle lean and requires no key to build/run. Every call here is a safe
 * no-op until NEXT_PUBLIC_POSTHOG_KEY is set and the SDK is wired in.
 *
 * To go live:
 *   1. `npm i posthog-js`
 *   2. init PostHog in `init()` below when a key is present
 *   3. route `capture()` / feature flags to it
 *
 * Components should depend on THIS module, never on the SDK directly.
 */

type Props = Record<string, unknown>;

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const enabled = Boolean(KEY);
const isDev = process.env.NODE_ENV === "development";

export const analytics = {
  enabled,

  init(): void {
    if (!enabled) return;
    // TODO(analytics): initialise PostHog here once posthog-js is installed.
  },

  capture(event: string, props?: Props): void {
    if (!enabled) {
      if (isDev) console.debug("[analytics:noop]", event, props ?? {});
      return;
    }
    // TODO(analytics): posthog.capture(event, props)
  },

  identify(_id: string, _props?: Props): void {
    if (!enabled) return;
    // TODO(analytics): posthog.identify(id, props)
  },

  /** Feature flag read - falls back to the static flag default when off. */
  getFeatureFlag<T = boolean>(_name: string, fallback: T): T {
    if (!enabled) return fallback;
    // TODO(analytics): return posthog.getFeatureFlag(name) ?? fallback
    return fallback;
  },
};
