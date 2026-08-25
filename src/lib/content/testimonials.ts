import type { Testimonial } from "@/types/content";

/**
 * Testimonials - curated for now, typed to mirror Google review data so a
 * live Places API sync can replace this array later with zero UI changes.
 * ⚠️ TODO(client): replace with real, attributable reviews before launch.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    author: "Priya M.",
    location: "Vile Parle, Mumbai",
    rating: 5,
    quote:
      "We bought my wedding set here and the transparency on rate and making charges was refreshing. It never felt like a sale - it felt like being looked after.",
    source: "Google",
  },
  {
    id: "t2",
    author: "Rahul & Sneha",
    location: "Andheri, Mumbai",
    rating: 5,
    quote:
      "They redesigned my mother's old necklace into something my wife actually wears. Same gold, brand new piece. Genuinely emotional to see.",
    source: "Google",
  },
  {
    id: "t3",
    author: "Anjali D.",
    location: "Santacruz, Mumbai",
    rating: 5,
    quote:
      "Hallmarked, fairly priced, and the polki work is stunning up close. The buy-back terms were exactly what they promised a year later.",
    source: "Google",
  },
  {
    id: "t4",
    author: "Meera Shah",
    location: "Vile Parle, Mumbai",
    rating: 5,
    quote:
      "Three generations of my family have bought from Chheda Jewellers. That says more than any review can.",
    source: "Google",
  },
];

/**
 * Aggregate shown alongside the reviews.
 * `verified` MUST become true only once real, attributable Google reviews and
 * the true rating/count are wired in (Places API or a manual sync). While
 * false, the UI shows an "illustrative" flag so nothing fabricated is passed
 * off as genuine. TODO(client): confirm real numbers and set verified: true.
 */
export const reviewsSummary = {
  rating: 4.9,
  count: 480,
  platform: "Google",
  verified: false,
} as const;
