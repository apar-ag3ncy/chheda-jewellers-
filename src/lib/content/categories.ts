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
    intro:
      "The metal at the heart of every Indian family. From featherlight daily wear to the heaviest bridal sets, our 22K gold is hallmarked, hand-finished, and priced at the day's rate - nothing hidden.",
    hero: {
      src: "/media/categories/gold.jpg",
      alt: "Model in a palace corridor wearing a traditional gold necklace",
      focus: "50% 30%",
    },
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
    intro:
      "Certified, conflict-free diamonds in settings that move between a boardroom and a black-tie evening. Modern silhouettes for a wardrobe that is anything but traditional.",
    hero: {
      src: "/media/categories/diamond.jpg",
      alt: "Model wearing a delicate diamond necklace in soft light",
      focus: "50% 30%",
    },
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
    intro:
      "Uncut diamonds set in gold with the kundan and jadau techniques of the royal ateliers. Polki is India's most regal jewellery - worn by queens, and now by our brides.",
    hero: {
      src: "/media/categories/polki.jpg",
      alt: "Model in profile wearing a polki choker and matching drop earrings",
      focus: "50% 32%",
    },
    /**
     * Every frame here is from the house's own July 2024 campaign - a set of
     * 58 negatives that had never been used anywhere on the site. They are
     * chosen for CONTRAST rather than for being individually prettiest: a
     * detail crop, then four different grounds (blue, black, deep red,
     * ivory), then a pair of earrings rather than a seventh necklace. Six
     * frames of the same shot at the same distance is a lookbook page; this
     * is meant to read as six different pieces, which is what it is.
     *
     * The files are named for the piece rather than p1..p6, which is not
     * tidiness: the previous frames lived at those exact paths, and
     * /_next/image URLs carry no content hash, so anyone who had already
     * loaded the page would have kept seeing the old photographs out of their
     * browser cache. New names, new URLs, no stale frames.
     */
    picks: [
      {
        id: "sapphire-choker",
        name: "The Sapphire Choker",
        spec: "Polki · sapphire drop · 22K gold",
        note: "Close enough to count the settings - which is the point of polki.",
        image: { src: "/media/categories/polki/sapphire-choker.jpg", alt: "Close study of a polki choker with a sapphire drop and matching earrings", focus: "50% 52%" },
      },
      {
        id: "evening-choker",
        name: "The Evening Choker",
        spec: "Polki · kundan setting",
        note: "Polki against colour, where the uncut stones catch the most light.",
        image: { src: "/media/categories/polki/evening-choker.jpg", alt: "Model in royal blue wearing a polki and kundan choker", focus: "50% 30%" },
      },
      {
        id: "midnight-set",
        name: "The Midnight Set",
        spec: "Polki · jadau work · 22K gold",
        note: "The set that does not need a wedding to be worn.",
        image: { src: "/media/categories/polki/midnight-set.jpg", alt: "Model in black wearing a polki choker in low light", focus: "50% 34%" },
      },
      {
        id: "bridal-red",
        name: "The Bridal Polki",
        spec: "Polki · kundan · maang tikka",
        note: "Choker and tikka made as one, for the day they are worn together.",
        image: { src: "/media/categories/polki/bridal-red.jpg", alt: "Bride in deep red wearing a polki choker and maang tikka", focus: "50% 30%" },
      },
      {
        id: "ivory-suite",
        name: "The Ivory Suite",
        spec: "Polki · pearl · uncut diamond",
        note: "Pearl strung through the polki, for the lighter half of a wedding.",
        image: { src: "/media/categories/polki/ivory-suite.jpg", alt: "Model in ivory wearing a polki necklace strung with pearl", focus: "50% 30%" },
      },
      {
        id: "drop-earrings",
        name: "The Long Drops",
        spec: "Polki · 22K gold · hand-strung",
        note: "Long enough to move when you do - worn without a necklace.",
        image: { src: "/media/categories/polki/drop-earrings.jpg", alt: "Profile study of a long polki drop earring", focus: "56% 34%" },
      },
    ],
    note: "Polki is graded by the quality of its uncut stones and the finesse of the setting - we will walk you through both.",
  },
};

export const categoryList = Object.values(categories);
