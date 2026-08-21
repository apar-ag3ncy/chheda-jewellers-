import type { SavingsPlan } from "@/types/content";

/**
 * Offers & Plans. The Monthly Plan is the flagship savings scheme —
 * emotional first, details second.
 * ⚠️ TODO(client): confirm plan mechanics, tenure and benefit before launch.
 */
export const monthlyPlanTeaser = {
  eyebrow: "The Chheda Monthly Plan",
  headline: "Save a little,\nevery month",
  body: "Set aside a fixed amount each month toward the piece you have been dreaming of. When your plan matures, we add our contribution — and you walk in to choose, at the day's rate.",
  cta: { label: "See how the plan works", href: "/offers-and-plans" },
};

export const plans: SavingsPlan[] = [
  {
    id: "monthly",
    name: "Chheda Monthly Plan",
    summary:
      "A simple monthly savings scheme toward gold and diamond jewellery, with a bonus on maturity.",
    highlights: [
      "Fixed monthly instalment, chosen by you",
      "Bonus contribution on maturity",
      "Redeem against any piece at the day's rate",
    ],
    features: [
      { label: "Tenure", value: "11 + 1 months" },
      { label: "Instalment", value: "From ₹2,000 / month" },
      { label: "Maturity benefit", value: "1 instalment added" },
      { label: "Redemption", value: "Gold, diamond & polki" },
    ],
    cta: { label: "Enquire about the plan", href: "/offers-and-plans" },
    flagship: true,
  },
  {
    id: "wedding",
    name: "Bridal Advance",
    summary:
      "Planning a wedding? Reserve your bridal set early and lock craftsmanship time with our atelier.",
    highlights: [
      "Priority atelier appointments",
      "Design consultation with our karigars",
      "Flexible part-payment toward the set",
    ],
    features: [
      { label: "Best for", value: "Bridal & trousseau" },
      { label: "Booking", value: "By appointment" },
      { label: "Includes", value: "Design + fittings" },
    ],
    cta: { label: "Book a bridal consult", href: "/offers-and-plans" },
  },
];
