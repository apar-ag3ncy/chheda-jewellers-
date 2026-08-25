import type { OccasionEdit } from "@/types/content";

/**
 * Each edit gets one accent, drawn from the brand palette rather than from a
 * new set of colours - the mood shifts the *warmth* of the gold and the tint
 * of the scrim, never the brand's identity. Values are token expressions so
 * nothing here is a raw hex.
 */
export const MOODS: Record<
  OccasionEdit["mood"],
  { accent: string; scrim: string; label: string }
> = {
  ember: {
    accent: "var(--gold-light)",
    scrim: "color-mix(in srgb, var(--maroon) 62%, var(--green-deep))",
    label: "Warm · ceremonial",
  },
  ink: {
    accent: "var(--offwhite)",
    scrim: "var(--green-deep)",
    label: "Cool · restrained",
  },
  rose: {
    accent: "var(--gold-light)",
    scrim: "color-mix(in srgb, var(--maroon) 34%, var(--green-deep))",
    label: "Soft · evening",
  },
  sun: {
    // The festive frames are bright emerald and gold, so this ground stays
    // deep and only warms slightly - enough to hold the copy legibly.
    accent: "var(--gold-light)",
    scrim: "color-mix(in srgb, var(--gold-deep) 14%, var(--green-deep))",
    label: "Warm · festival light",
  },
  dusk: {
    accent: "var(--gold-light)",
    scrim: "color-mix(in srgb, var(--green) 40%, var(--green-deep))",
    label: "Low light · travel",
  },
};
