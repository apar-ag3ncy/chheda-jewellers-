import type { BespokeStep } from "@/types/content";

/**
 * BESPOKE — the custom-jewellery commission, written as a process rather
 * than a service menu.
 *
 * The reason this exists as content and not as a form: the thing standing
 * between a customer and a commission is almost never price, it is not knowing
 * what happens next. So every step names what the customer walks away with,
 * and the melt-down route (remaking inherited gold) is given the same weight
 * as a new piece — for most families it is the more common commission.
 */
export const bespokeIntro = {
  eyebrow: "Made to your measure",
  title: "The piece that\n*doesn't exist yet*",
  hook: "Bring us a drawing, a photograph, or your grandmother's set.",
  body: "Roughly one in four pieces that leaves our counter was drawn for the person collecting it. Some are designed from nothing; more often we take gold a family already owns — a set that has gone out of fashion, or been split between siblings — and make it into something that gets worn again.",
};

export const bespokeSteps: BespokeStep[] = [
  {
    id: "conversation",
    n: "01",
    title: "The conversation",
    body:
      "Forty minutes at the counter, or on a video call if you are not in Mumbai. Bring references, a photograph of the old piece, the outfit it has to sit against — anything. We will tell you honestly what is possible in your budget before a single sketch is made.",
    outcome: "A written brief and an honest price band. No obligation, no deposit.",
    image: {
      src: "/media/bespoke/01.jpg",
      alt: "Hands adjusting a heavy polki necklace at the counter",
      focus: "50% 40%",
    },
  },
  {
    id: "drawing",
    n: "02",
    title: "The drawing",
    body:
      "Our designer returns two or three directions on paper, drawn at actual size so you can hold them against your own neck. This is the stage to be difficult — moving a stone costs nothing here and a great deal later.",
    outcome: "Hand drawings at scale, plus a stone and weight schedule.",
    image: {
      src: "/media/bespoke/02.jpg",
      alt: "A bridal set reflected in a hand mirror, seen as a design reference",
      focus: "50% 34%",
    },
  },
  {
    id: "wax",
    n: "03",
    title: "Wax and metal",
    body:
      "The approved drawing is carved in wax, cast, and finished by the same karigar from start to end. If you are remaking inherited gold, you are invited to watch it go into the crucible — most families choose to.",
    outcome: "A wax model to try on, and your old gold weighed in front of you.",
    image: {
      src: "/media/bespoke/03.jpg",
      alt: "Stacked gold bangles and rings worn on a hand, showing the finished metalwork",
      focus: "50% 40%",
    },
  },
  {
    id: "setting",
    n: "04",
    title: "Setting and hallmark",
    body:
      "Stones are set under a loupe, the piece is polished, and it goes to a BIS-recognised assay centre like everything else we sell. It comes back with its own HUID — a number you can type into the government's app and see your piece appear.",
    outcome: "The finished piece, hallmarked, with its drawing and its bill of weights.",
    image: {
      src: "/media/bespoke/04.jpg",
      alt: "A finished polki bridal set worn with a rose, photographed in warm light",
      focus: "50% 28%",
    },
  },
];

/** The two ways a commission usually starts. */
export const bespokeRoutes = [
  {
    id: "new",
    label: "From nothing",
    title: "A piece drawn for one person",
    body:
      "An engagement ring, a fortieth-birthday haar, a mangalsutra that does not look like everyone else's. You bring the occasion; we bring the drawing.",
    lead: "6–10 weeks",
  },
  {
    id: "remake",
    label: "From your own gold",
    title: "The set nobody wears any more",
    body:
      "Inherited gold, melted and remade into something of this decade. You pay for making and the difference in weight — the gold you already own stays yours, and is weighed in front of you.",
    lead: "4–8 weeks",
  },
] as const;

/**
 * Straight answers to the four questions people are too polite to ask.
 * ⚠️ TODO(client): confirm the deposit percentage and the design fee before
 * launch — the figures below are the ones stated in the brief and are marked
 * as indicative in the UI.
 */
export const bespokeAnswers = [
  {
    q: "What does the design stage cost?",
    a: "Nothing, up to three drawings. We only ask for a deposit once you approve a design and we start buying stones.",
  },
  {
    q: "How much deposit?",
    a: "Half at approval, half on collection. The deposit is against the stones and the making, never against the gold rate.",
  },
  {
    q: "What if I don't like it?",
    a: "At the wax stage, changes are free. After casting, we will remake anything that does not match the approved drawing at our cost.",
  },
  {
    q: "Can you copy a photograph?",
    a: "We can work from one, but we will not reproduce another house's signature design. We will draw you something that does what you loved about it.",
  },
] as const;
