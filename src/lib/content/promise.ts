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

/* ============================================================
   /chheda-promise — the page reframed as a document of record.
   ============================================================ */

/** Contents index, rendered as an archival ruled table. */
export const promiseIndex = [
  { n: "01", label: "The house", note: "Where the name comes from" },
  { n: "02", label: "The mark on the metal", note: "How to read a hallmark" },
  { n: "03", label: "What you actually pay for", note: "A bill, itemised" },
  { n: "04", label: "What we do not do", note: "Stated plainly" },
] as const;

/**
 * BIS hallmark anatomy — the three marks required on hallmarked gold jewellery
 * in India since the HUID system came into force (2021).
 *
 * These are the PUBLIC national standard, not claims about our own stock —
 * the whole point of the section is that the customer can verify a hallmark
 * independently, with the government's own BIS Care app.
 */
export const hallmarkMarks = [
  {
    id: "bis",
    label: "The BIS mark",
    short: "BIS",
    body:
      "The triangular standard mark of the Bureau of Indian Standards. Its presence means the piece was assayed at a BIS-recognised centre — not certified by the shop that sold it to you.",
  },
  {
    id: "purity",
    label: "Purity & fineness",
    short: "22K916",
    body:
      "The karatage with its fineness in parts per thousand. 22K reads 916 (91.6% gold), 18K reads 750, 14K reads 585. If the number and the karat do not agree, walk away.",
  },
  {
    id: "huid",
    label: "The HUID",
    short: "HUID",
    body:
      "A six-digit alphanumeric code, unique to that one piece. Type it into the BIS Care app and the piece's own record appears — article, purity, and the jeweller who registered it.",
  },
] as const;

/**
 * A worked example of how a bill is built.
 * ⚠️ TODO(client): confirm the real making-charge range before launch. The
 * rate line is pulled live; the making charge below is ILLUSTRATIVE and is
 * labelled as such in the UI so nothing is passed off as a quoted price.
 */
export const ledger = {
  netWeight: 24.6, // grams of fine gold in the example piece
  makingPct: 12, // TODO(client): confirm. Shown as an example only.
  gstPct: 3, // statutory GST on gold jewellery in India
  note: "An illustration, not a quotation. Your bill shows these same lines, with your piece's real weight and the rate at the moment you buy.",
};

/** Negative promises — what we refuse to do. Credible because they are specific. */
export const refusals = [
  "We do not charge gold rate on the weight of stones.",
  "We do not hide making charges inside a single bundled figure.",
  "We do not sell an unhallmarked piece, at any price.",
  "We do not deduct for 'wastage' you were never told about.",
] as const;
