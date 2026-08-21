import type { PromiseValue } from "@/types/content";

/** Chheda Promise — brand strip storytelling (not a corporate "About Us"). */
export const promiseIntro = {
  eyebrow: "The Chheda Promise",
  headline: "A jeweller is only\nas good as their word",
  body: "For families across Mumbai, Chheda Jewellers has been the quiet name behind the biggest days — the first mangalsutra, the wedding set, the gift that marks a milestone. We measure our worth not in carats alone, but in the trust worn on the skin of the people we serve.",
};

export const promiseValues: PromiseValue[] = [
  {
    id: "purity",
    title: "Hallmarked purity",
    description:
      "Every piece carries a BIS hallmark. What we say is 22 karat, is 22 karat — verifiable, always.",
  },
  {
    id: "transparency",
    title: "Transparent pricing",
    description:
      "Gold at the day's rate, making charges shown openly. No riddles, no surprises at the counter.",
  },
  {
    id: "craft",
    title: "Handcrafted by artisans",
    description:
      "Karigars who have shaped gold for decades, working each setting by hand the way it has always been done.",
  },
  {
    id: "buyback",
    title: "Lifetime of trust",
    description:
      "Fair exchange and buy-back, cleaning and care — a relationship that outlasts the purchase.",
  },
];

/** Expanded story for /chheda-promise. */
export const promiseStory = {
  chapters: [
    {
      id: "roots",
      title: "Roots in the neighbourhood",
      body: "We began the way the best jewellers do — one family at a time, in a lane where everyone knew our name. Word travelled by trust, not advertising, and that is still how most of Mumbai finds their way to us.",
    },
    {
      id: "hand",
      title: "The hand behind the piece",
      body: "Behind the vitrine is a workshop. Wax is carved, gold is drawn into wire, stones are set under a loupe. Nothing here is anonymous — a piece leaves us only when the karigar who made it would wear it themselves.",
    },
    {
      id: "forever",
      title: "Made to be inherited",
      body: "Fashion changes; an heirloom does not. We design for the long arc of a family — jewellery that a daughter will one day open a velvet box to find, and understand exactly why it was kept.",
    },
  ],
};
