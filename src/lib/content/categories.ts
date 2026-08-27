import type { CategoryPage } from "@/types/content";

/**
 * Category / showcase pages - Gold · Diamond · Polki.
 * Editorial, not a product grid. Each has a hero + a few "signatures".
 */
export const categories: Record<CategoryPage["slug"], CategoryPage> = {
  gold: {
    slug: "gold",
    name: "Gold",
    eyebrow: "22 Karat Heritage",
    headline: "Gold that\nremembers",
    intro:
      "The metal at the heart of every Indian family. From featherlight daily wear to the heaviest bridal sets, our 22K gold is hallmarked, hand-finished, and priced at the day's rate - nothing hidden.",
    hero: {
      src: "/media/categories/gold.jpg",
      alt: "Model in a palace corridor wearing a traditional gold necklace",
      focus: "50% 30%",
    },
    signatures: [
      {
        id: "temple",
        title: "Temple & antique gold",
        description:
          "Nakashi and antique-finish work inspired by the temples of the south - deeply carved, timeless.",
        image: { src: "/media/types/necklace.jpg", alt: "Traditional gold necklace", focus: "50% 30%" },
      },
      {
        id: "everyday",
        title: "Everyday 22K",
        description:
          "Chains, studs and bangles light enough to never take off, built to last a lifetime of wear.",
        image: { src: "/media/collections/collection-02.jpg", alt: "Everyday gold jewellery", focus: "50% 28%" },
      },
      {
        id: "bridal-gold",
        title: "Bridal gold",
        description:
          "The full sohaag - haar, vaddanam, bangles and jhumkas - for the bride who carries her family's gold.",
        image: { src: "/media/hero/hero-03.jpg", alt: "Model wearing gold jewellery in daylight", focus: "50% 26%" },
      },
    ],
    picks: [
      {
        id: "temple-choker",
        name: "The Temple Choker",
        spec: "22K gold · repoussé temple work",
        note: "The piece a bride's mother usually chooses first.",
        image: { src: "/media/categories/gold/g1.jpg", alt: "Model in a pink lehenga wearing a gold choker", focus: "50% 28%" },
      },
      {
        id: "jhumka-set",
        name: "Haar & Jhumkas",
        spec: "22K gold · pearl drops",
        note: "Worn as a set, or split across two occasions.",
        image: { src: "/media/categories/gold/g2.jpg", alt: "Close portrait with a gold necklace and jhumkas", focus: "50% 28%" },
      },
      {
        id: "corridor-haar",
        name: "The Long Haar",
        spec: "22K gold · hand-drawn chain",
        note: "Long enough to layer over a closed neckline.",
        image: { src: "/media/categories/gold/g3.jpg", alt: "Gold necklace worn in a sunlit palace corridor", focus: "50% 28%" },
      },
      {
        id: "layered-temple",
        name: "Layered Temple Gold",
        spec: "22K gold · three strands",
        note: "Three necklaces built to be worn together.",
        image: { src: "/media/categories/gold/g4.jpg", alt: "Bride in red with layered temple-gold jewellery", focus: "50% 28%" },
      },
      {
        id: "bridal-suite",
        name: "The Bridal Suite",
        spec: "22K gold · matched set",
        note: "Necklace, earrings and maang tikka, made as one.",
        image: { src: "/media/categories/gold/g5.jpg", alt: "Seated model in orange with a gold bridal set", focus: "50% 28%" },
      },
      {
        id: "daylight-pair",
        name: "Everyday Gold",
        spec: "22K gold · lightweight",
        note: "Light enough for a working day, hallmarked all the same.",
        image: { src: "/media/categories/gold/g6.jpg", alt: "Gold necklace and earrings in soft daylight", focus: "50% 28%" },
      },
    ],
    note: "Every gold piece carries a BIS hallmark and a transparent making-charge breakup.",
  },
  diamond: {
    slug: "diamond",
    name: "Diamond",
    eyebrow: "Certified Brilliance",
    headline: "Light,\nset in place",
    intro:
      "Certified, conflict-free diamonds in settings that move between a boardroom and a black-tie evening. Modern silhouettes for a wardrobe that is anything but traditional.",
    hero: {
      src: "/media/categories/diamond.jpg",
      alt: "Model wearing a delicate diamond necklace in soft light",
      focus: "50% 30%",
    },
    signatures: [
      {
        id: "solitaire",
        title: "Solitaires",
        description:
          "The single stone that says everything - graded, certified, and set to catch every angle of light.",
        image: { src: "/media/community/community-02.jpg", alt: "Diamond jewellery with a rose", focus: "50% 40%" },
      },
      {
        id: "modern",
        title: "Everyday diamond",
        description:
          "Tennis bracelets, line necklaces and studs - quiet brilliance for the days in between the occasions.",
        image: { src: "/media/collections/collection-03.jpg", alt: "Contemporary diamond necklace", focus: "50% 35%" },
      },
      {
        id: "statement",
        title: "Statement pieces",
        description:
          "Cocktail rings and cuffs designed to be noticed - architectural, contemporary, unmistakably yours.",
        image: { src: "/media/community/community-06.jpg", alt: "Emerald and diamond statement necklace", focus: "50% 35%" },
      },
    ],
    picks: [
      {
        id: "delicate-line",
        name: "The Delicate Line",
        spec: "18K gold · certified brilliants",
        note: "A first diamond, and the one worn most.",
        image: { src: "/media/categories/diamond/d1.jpg", alt: "Soft portrait with a delicate diamond necklace", focus: "50% 28%" },
      },
      {
        id: "statement-pair",
        name: "Statement Ear & Ring",
        spec: "18K gold · brilliant-cut",
        note: "Bought together, worn to the same rooms.",
        image: { src: "/media/categories/diamond/d2.jpg", alt: "Diamond earrings and ring caught in dramatic light", focus: "50% 28%" },
      },
      {
        id: "drop-earrings",
        name: "The Drop Earrings",
        spec: "18K white gold · pear cuts",
        note: "Long, moving, and quiet enough for the office.",
        image: { src: "/media/categories/diamond/d3.jpg", alt: "Side profile wearing diamond drop earrings", focus: "50% 28%" },
      },
      {
        id: "evening-collar",
        name: "The Evening Collar",
        spec: "18K gold · graduated stones",
        note: "Cut to sit exactly at the collarbone.",
        image: { src: "/media/categories/diamond/d4.jpg", alt: "Model in a green gown with a diamond necklace", focus: "50% 28%" },
      },
      {
        id: "line-necklace",
        name: "The Line Necklace",
        spec: "18K gold · rub-over setting",
        note: "One row of light, nothing else.",
        image: { src: "/media/categories/diamond/d5.jpg", alt: "Moody portrait with a diamond line necklace", focus: "50% 28%" },
      },
      {
        id: "solitaire-study",
        name: "Solitaire Study",
        spec: "18K gold · single stone",
        note: "The one piece we are asked to certify most often.",
        image: { src: "/media/categories/diamond/d6.jpg", alt: "Diamonds catching the light against dark tones", focus: "50% 28%" },
      },
    ],
    note: "Each diamond is accompanied by its certification. Ask us about lab-grown options.",
  },
  polki: {
    slug: "polki",
    name: "Polki",
    eyebrow: "Uncut & Regal",
    headline: "The court,\nrecreated",
    intro:
      "Uncut diamonds set in gold with the kundan and jadau techniques of the royal ateliers. Polki is India's most regal jewellery - worn by queens, and now by our brides.",
    hero: {
      src: "/media/categories/polki.jpg",
      alt: "Model wearing an elaborate polki and kundan bridal set",
      focus: "50% 28%",
    },
    signatures: [
      {
        id: "bridal-polki",
        title: "Bridal polki sets",
        description:
          "The full rani-haar, choker, maang tikka and earrings - the centrepiece of a bride's day.",
        image: { src: "/media/hero/hero-01.jpg", alt: "Bridal polki necklace set", focus: "50% 26%" },
      },
      {
        id: "jadau",
        title: "Jadau & kundan",
        description:
          "Stones set in pure gold foil by hand, the way the karigars of Bikaner and Jaipur have always done it.",
        image: { src: "/media/collections/collection-04.jpg", alt: "Antique-finish jadau jewellery", focus: "50% 30%" },
      },
      {
        id: "meenakari",
        title: "Meenakari reverse",
        description:
          "Turn a polki piece over and find hand-painted enamel - a secret beauty only the wearer knows.",
        image: { src: "/media/types/earrings.jpg", alt: "Ornate polki chandbali earrings", focus: "50% 30%" },
      },
    ],
    picks: [
      {
        id: "bridal-polki",
        name: "The Bridal Polki",
        spec: "Uncut diamonds · 22K gold",
        note: "Uncut stones, set the way they were found.",
        image: { src: "/media/categories/polki/p1.jpg", alt: "Close portrait in polki bridal jewellery", focus: "50% 28%" },
      },
      {
        id: "full-suite",
        name: "The Full Suite",
        spec: "Polki · kundan · pearl",
        note: "Everything the day needs, made to match.",
        image: { src: "/media/categories/polki/p2.jpg", alt: "Bride seated in a palace setting in full polki", focus: "50% 28%" },
      },
      {
        id: "layered-kundan",
        name: "Layered Kundan Haar",
        spec: "Polki · kundan · emerald beads",
        note: "Three lengths, so the neckline is never bare.",
        image: { src: "/media/categories/polki/p3.jpg", alt: "Layered polki and kundan bridal necklace", focus: "50% 28%" },
      },
      {
        id: "maroon-set",
        name: "The Maroon Set",
        spec: "Polki · ruby · 22K gold",
        note: "Built against deep red, where polki reads warmest.",
        image: { src: "/media/categories/polki/p4.jpg", alt: "Bride in maroon wearing a polki set", focus: "50% 28%" },
      },
      {
        id: "standing-set",
        name: "The Ceremony Set",
        spec: "Polki · jadau work",
        note: "Heavy on purpose - it is worn for one long day.",
        image: { src: "/media/categories/polki/p5.jpg", alt: "Standing bride adorned in polki jewellery", focus: "50% 28%" },
      },
      {
        id: "antique-finish",
        name: "Antique-Finish Polki",
        spec: "Polki · oxidised 22K gold",
        note: "Finished to look inherited from the first day.",
        image: { src: "/media/categories/polki/p6.jpg", alt: "Bride holding a rose in antique-finish polki", focus: "50% 28%" },
      },
    ],
    note: "Polki is graded by the quality of its uncut stones and the finesse of the setting - we will walk you through both.",
  },
};

export const categoryList = Object.values(categories);
