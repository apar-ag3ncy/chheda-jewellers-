/**
 * THE HALLMARK - the About page, told as five marks.
 *
 * A hallmark is the stamp that certifies a piece is what it claims to be,
 * which is also what a brand is. So the page is five of them - Origin,
 * Intent, Proof, Singularity, Belonging - one scene each, rather than the
 * five stacked essays it replaces.
 *
 * Copy lives here and not in the page for the usual reason: the page is a
 * layout, and the words are the thing most likely to change.
 */

export type Mark = {
  /** 01-05. Rendered as-is. */
  n: string;
  id: string;
  heading: string;
  /** Paragraphs. Kept short on purpose - this page must feel brief. */
  body: string[];
  /** The line that gets set large and alone. */
  pull?: string;
};

/**
 * NO REPEATS - the strongest claim on the page, and the only one we cannot
 * check ourselves.
 *
 * "We retire the design; it is never remade" is absolute. If there is any
 * standing exception - bridal remade on request, staple chains, plain
 * bangles - then publishing the absolute version on the same page that sells
 * the house on its paperwork does more damage than the claim earns.
 *
 * So it is gated, the same way the review aggregate and the phone numbers
 * are. Until the owner confirms it is literal, the page states what is
 * certainly true - that pieces are one-off and the design is retired at the
 * house's own inconvenience - without the unqualified "never".
 *
 * TODO(client): confirm No Repeats is absolute, with no standing exceptions.
 * Set `literal: true` and the fuller wording ships.
 */
export const noRepeats = {
  literal: false,
} as const;

export const aboutHero = {
  eyebrow: "About the house",
  display: "Every piece we make carries a mark.\nSo does every promise.",
} as const;

export const marks: Mark[] = [
  {
    n: "01",
    id: "origin",
    heading: "It started small.\nThat was the point.",
    body: [
      // TODO(client): the old site's origin line reads "a promise to mend
      // jewellery that means something". Read here as `make`. If the house
      // genuinely began in repair and restoration before it sold anything,
      // that is a rarer and better origin and this mark should be rewritten
      // around it.
      "A neighbourhood shop in Mumbai. No billboards, no famous faces - a counter, a set of tools, and a promise that the work would be worth what people paid for it.",
      "The families who walked in that first year were not buying investments. They were buying a daughter's first pair of earrings. A wife's anniversary chain. The one good thing a household saves a whole year for.",
      "We have grown since. We have not changed who we open the door for.",
    ],
    pull: "We were never in the ornament business.\nWe were in the occasion business.",
  },
  {
    n: "02",
    id: "intent",
    heading: "To be the legend\nin every story.",
    body: [
      "Jewellery should be worn, not stored. Flaunted, not guarded. Passed down, not locked away.",
      "We want to be in the room for the moments that get retold - the sixteenth birthday, the wedding morning, the promotion she bought herself a ring for. Not the purchase. The story the purchase becomes.",
      "And we design for everyone who wants to wear it. The man with the bold gold ring. The teenager experimenting. The mother. The woman who buys her own.",
    ],
    pull: "Heritage isn't something you inherit.\nIt's something you wear out of the house.",
  },
  {
    n: "03",
    id: "proof",
    heading: "Trust is a claim.\nHere's the paperwork.",
    body: [
      "Every jeweller in India will tell you they are honest. Fewer will hand you the documentation.",
      "Every piece that leaves us is hallmarked, certified, and accompanied by papers that say exactly what it is - metal, purity, weight, stone, origin. Not because a customer asked. Because that is the minimum.",
      "And before you buy, we would rather you understood what you are buying. If it is a diamond, we will walk you through the 4Cs until the grading report reads like plain language. If it is polki, we will show you where the craft is, and where the cost went.",
    ],
    pull: "You should be able to explain\nyour own jewellery to someone else.",
  },
  {
    n: "04",
    id: "singularity",
    heading: "No repeats.",
    body: noRepeats.literal
      ? [
          "When a piece is sold, we retire the design. It is not remade, not reissued, not quietly reproduced in a smaller size for someone else next season.",
          "This is an inconvenient way to run a jewellery house. It means no bestsellers to lean on and no shortcuts to fall back on - every collection starts from nothing.",
          "We do it because the alternative is a stranger walking into the same wedding wearing your necklace.",
        ]
      : [
          "Pieces here are made one at a time, and when one is sold its design is retired rather than run again for the next customer who asks.",
          "It is an inconvenient way to run a jewellery house. There are no bestsellers to lean on and no shortcuts to fall back on - a collection starts from nothing.",
          "We work this way because the alternative is a stranger walking into the same wedding wearing your necklace.",
        ],
    pull: "What you're wearing exists once.",
  },
  {
    n: "05",
    id: "belonging",
    heading: "The customers who came back\nwith their daughters.",
    body: [
      "The measure of this shop is not in what we have sold. It is in who returned.",
      "The woman who bought her first chain here now brings her daughter for a bridal set. Fathers who came for a wedding necklace come back for a granddaughter's ear-piercing. Long enough for a family to arrive three times, for three different reasons.",
      "That is the only review that has ever mattered to us.",
    ],
  },
];

/** The three proofs under Mark 03 - stated as a spec rail, not a paragraph. */
export const proofPoints = [
  { label: "Hallmarked & certified", value: "Every piece, without exception" },
  { label: "Full documentation", value: "Purity, weight, stone, origin - in writing" },
  { label: "Explained before it's sold", value: "4Cs, craft and cost, in plain language" },
] as const;
