import type { OccasionEdit } from "@/types/content";

/**
 * THE EDITS — the house sorted by occasion rather than by metal.
 *
 * Five rooms, each with its own light. The names are deliberately spoken
 * rather than merchandised ("Catching Flights, Not Feelings" is the caption a
 * customer would actually write); the copy underneath stays grown-up, because
 * the joke only lands if the jewellery is taken seriously.
 *
 * Photography is drawn from the house archive — no frame is used twice across
 * the site, so each edit reads as its own shoot.
 */
export const edits: OccasionEdit[] = [
  {
    slug: "bridal",
    name: "Bridal",
    eyebrow: "Edit 01 · The long day",
    title: "Everything, and\nit still has to last",
    hook: "The one day the jewellery is photographed from every angle.",
    intro:
      "A bridal set is worn for fourteen hours, hugged in, cried in, and then kept for forty years. It has to survive all of that and still photograph like the first hour. This is the room where weight, balance and the strength of a clasp matter as much as the stones.",
    mood: "ember",
    hero: {
      src: "/media/edits/bridal/hero.jpg",
      alt: "A bride in antique-finish polki seated beside brass urns in a warm maroon room",
      focus: "50% 34%",
    },
    gallery: [
      {
        src: "/media/edits/bridal/01.jpg",
        alt: "A laughing bride in red and gold during the ceremony",
        focus: "50% 26%",
      },
      {
        src: "/media/edits/bridal/02.jpg",
        alt: "The varmala exchange, layered gold haar catching the light",
        focus: "50% 28%",
      },
      {
        src: "/media/edits/bridal/03.jpg",
        alt: "Petals falling over a bride mid-ceremony in a red lehenga",
        focus: "50% 26%",
      },
      {
        src: "/media/edits/bridal/04.jpg",
        alt: "Two brides in polki chokers and maang tikkas against a maroon wall",
        focus: "50% 24%",
      },
      {
        src: "/media/edits/bridal/05.jpg",
        alt: "A bride reclining in a full polki bridal set and nath",
        focus: "50% 26%",
      },
      {
        src: "/media/edits/bridal/06.jpg",
        alt: "A bride in red being helped into her jewellery before the ceremony",
        focus: "50% 24%",
      },
    ],
    notes: [
      { label: "Anchor piece", value: "Rani-haar or a layered polki choker" },
      { label: "Metal", value: "22K gold; polki set in gold foil" },
      { label: "Weight to expect", value: "The set carries; the neck should not" },
      { label: "Book ahead", value: "8–12 weeks for a made-to-order set" },
      { label: "Bring", value: "Your lehenga swatch and your neckline" },
    ],
    picks: [
      {
        id: "haar",
        title: "The rani-haar",
        description:
          "Long, layered, and cut to sit above the blouse line rather than fight it. Chosen against your neckline, never from a catalogue.",
      },
      {
        id: "choker",
        title: "The polki choker",
        description:
          "Uncut stones set by hand in gold foil. Worn high, it does the work of three pieces and photographs from every angle.",
      },
      {
        id: "hathphool",
        title: "The hathphool",
        description:
          "Ring to bracelet in one flourish. The piece that shows in every photograph of your hands — which is most of them.",
      },
    ],
    drawsFrom: ["polki", "gold"],
  },
  {
    slug: "office",
    name: "Office Wear",
    eyebrow: "Edit 02 · Nine to nine",
    title: "Quiet, until\nsomeone looks twice",
    hook: "Jewellery that survives a video call and a dinner after it.",
    intro:
      "The brief is restraint: nothing that swings, nothing that catches on a collar, nothing you have to explain. One considered piece against plain cloth reads as more expensive than three competing ones — and it goes straight from the desk to the table without a change.",
    mood: "ink",
    hero: {
      src: "/media/edits/office/hero.jpg",
      alt: "A model in a black blazer and wide-brimmed hat wearing an emerald pendant",
      focus: "50% 30%",
    },
    gallery: [
      {
        src: "/media/edits/office/01.jpg",
        alt: "A fine diamond line necklace worn against a dark evening dress",
        focus: "50% 30%",
      },
      {
        src: "/media/edits/office/02.jpg",
        alt: "A softly lit portrait wearing a delicate diamond collar",
        focus: "50% 28%",
      },
      {
        src: "/media/edits/office/03.jpg",
        alt: "A green-stone necklace and matching ring in low studio light",
        focus: "50% 28%",
      },
      {
        src: "/media/edits/office/04.jpg",
        alt: "Layered fine chains worn over a deep green dress",
        focus: "50% 30%",
      },
      {
        src: "/media/edits/office/05.jpg",
        alt: "A short pearl and polki necklace worn with a pale sari",
        focus: "50% 26%",
      },
      {
        src: "/media/edits/office/06.jpg",
        alt: "A single polki cocktail ring worn on a hand against sheer fabric",
        focus: "50% 42%",
      },
    ],
    notes: [
      { label: "Anchor piece", value: "One short chain or a single ring" },
      { label: "Metal", value: "18K and fine diamond; 22K in lighter gauges" },
      { label: "Rule of thumb", value: "Ears or neck. Not both, not on a Tuesday" },
      { label: "Length", value: "Short enough to clear a lapel and a lanyard" },
      { label: "Care", value: "Wipe it down on Friday; that is the whole ritual" },
    ],
    picks: [
      {
        id: "line",
        title: "The line necklace",
        description:
          "A single row that sits just below the collarbone. Invisible on camera until the light moves, which is exactly the point.",
      },
      {
        id: "studs",
        title: "Studs you never remove",
        description:
          "Set low and closed at the back so nothing snags. The pair you stop noticing you are wearing.",
      },
      {
        id: "signet",
        title: "One serious ring",
        description:
          "Worn alone. A cocktail stone or a clean band — the piece that does all the talking in a handshake.",
      },
    ],
    drawsFrom: ["diamond", "gold"],
  },
  {
    slug: "outing",
    name: "Outing",
    eyebrow: "Edit 03 · After hours",
    title: "Dressed for the\ntable you're at",
    hook: "Sangeet, supper club, someone's engagement — the going-out drawer.",
    intro:
      "Between the office and the wedding sits most of a life: dinners, sangeets, the friend's party you said you would drop into for an hour. This edit is built for warm indoor light and close conversation — pieces with movement, worn at the height a photograph will find them.",
    mood: "rose",
    hero: {
      src: "/media/edits/outing/hero.jpg",
      alt: "A family group in pastel rose and gold at a sangeet, against a green wall",
      focus: "50% 34%",
    },
    gallery: [
      {
        src: "/media/edits/outing/01.jpg",
        alt: "A couple laughing over a dholak, dressed in rose and ivory",
        focus: "50% 26%",
      },
      {
        src: "/media/edits/outing/02.jpg",
        alt: "A pastel-dressed guest in delicate polki and pearls",
        focus: "50% 24%",
      },
      {
        src: "/media/edits/outing/03.jpg",
        alt: "A guest before a gilt mirror in a blush sari and ruby necklace",
        focus: "50% 26%",
      },
      {
        src: "/media/edits/outing/04.jpg",
        alt: "Friends gathered around a harmonium in pastel evening dress",
        focus: "50% 30%",
      },
      {
        src: "/media/edits/outing/05.jpg",
        alt: "A seated guest in a sequinned rose sari and fine diamond necklace",
        focus: "50% 26%",
      },
      {
        src: "/media/edits/outing/06.jpg",
        alt: "A guest in a blush lehenga before a gold mirror at an evening function",
        focus: "50% 24%",
      },
    ],
    notes: [
      { label: "Anchor piece", value: "Drop earrings, or a necklace — pick one" },
      { label: "Metal", value: "Polki and diamond, kept light" },
      { label: "Movement", value: "Something that swings when you laugh" },
      { label: "Light", value: "Tuned for warm indoor light, not daylight" },
      { label: "Hands", value: "One ring, worn where a glass will show it" },
    ],
    picks: [
      {
        id: "chandbali",
        title: "Chandbalis",
        description:
          "The crescent that catches every candle in the room. Long enough to move, light enough to wear until the end of the night.",
      },
      {
        id: "collar",
        title: "The short collar",
        description:
          "Sits above a neckline instead of behind it, so it reads across a table rather than in a mirror.",
      },
      {
        id: "cocktail",
        title: "A cocktail ring",
        description:
          "Deliberately oversized, deliberately alone. The only piece here allowed to be loud.",
      },
    ],
    drawsFrom: ["polki", "diamond"],
  },
  {
    slug: "festive",
    name: "Festive Vibes",
    eyebrow: "Edit 04 · Marigold season",
    title: "Loud rooms,\nlouder gold",
    hook: "Diwali, Navratri, the sangeet that starts at eleven.",
    intro:
      "Festival dressing is the one time restraint is the wrong answer. Rooms are hung with marigold, everyone is photographed from every angle, and the jewellery is competing with the outfit rather than finishing it. This edit is built to hold its own in that noise — high-karat gold, colour set against colour, and pieces that read across a crowded courtyard.",
    mood: "sun",
    hero: {
      src: "/media/edits/festive/hero.jpg",
      alt: "Three guests in emerald silks and gold, seated beneath a garland of bells",
      focus: "50% 34%",
    },
    gallery: [
      {
        src: "/media/edits/festive/01.jpg",
        alt: "A layered temple-gold choker worn against marigold garlands",
        focus: "50% 30%",
      },
      {
        src: "/media/edits/festive/02.jpg",
        alt: "A guest laughing in a mint-green sari and polki necklace, marigolds behind",
        focus: "50% 26%",
      },
      {
        src: "/media/edits/festive/03.jpg",
        alt: "A polki choker and chandbalis with magenta drops, in profile",
        focus: "50% 26%",
      },
      {
        src: "/media/edits/festive/04.jpg",
        alt: "Three guests in emerald green and gold among marigold strings",
        focus: "50% 30%",
      },
      {
        src: "/media/edits/festive/05.jpg",
        alt: "A couple in ivory and green beneath hanging marigold garlands",
        focus: "50% 28%",
      },
      {
        src: "/media/edits/festive/06.jpg",
        alt: "A guest in green and gold seated on a gilded sofa, marigolds behind",
        focus: "50% 26%",
      },
    ],
    notes: [
      { label: "Anchor piece", value: "A choker that reads from across the room" },
      { label: "Metal", value: "22K gold, warm against festival light" },
      { label: "Colour", value: "Meena and kundan — set colour against your silk" },
      { label: "Layer", value: "Two lengths, so photographs have depth" },
      { label: "Between wears", value: "Wipe the meena; never soak enamel" },
    ],
    picks: [
      {
        id: "temple-choker",
        title: "The temple choker",
        description:
          "Deeply carved, worn high and tight. It catches every diya in the room and needs nothing else beside it.",
      },
      {
        id: "chandbali",
        title: "Chandbalis with drops",
        description:
          "Colour at the ear — ruby, emerald, or pearl — swinging just enough to be caught by a camera mid-laugh.",
      },
      {
        id: "meena",
        title: "Meenakari colour",
        description:
          "Hand-painted enamel on the reverse and the rim. The piece that answers a bright silk instead of arguing with it.",
      },
    ],
    drawsFrom: ["gold", "polki"],
  },
  {
    slug: "flights",
    name: "Catching Flights",
    eyebrow: "Edit 05 · Not feelings",
    title: "Packs small.\nArrives loud.",
    hook: "Three pieces, one roll, zero decisions at the airport.",
    intro:
      "A capsule for people who are somewhere else by Friday. Everything here is chosen to survive a cabin bag and a schedule: no sharp points, no trailing chains, nothing that needs its own box. Three pieces that recombine into a week of outfits — and one of them is always allowed to be dramatic.",
    mood: "dusk",
    hero: {
      src: "/media/edits/flights/hero.jpg",
      alt: "A model in red beside a vintage convertible at dusk",
      focus: "50% 40%",
    },
    gallery: [
      {
        src: "/media/edits/flights/01.jpg",
        alt: "A long gold haar worn over red lace, lit by a low moon",
        focus: "50% 30%",
      },
      {
        src: "/media/edits/flights/02.jpg",
        alt: "A model in red leaning against a vintage car under floodlight",
        focus: "50% 26%",
      },
      {
        src: "/media/edits/flights/03.jpg",
        alt: "Seated on the bonnet of a vintage convertible in a red gown",
        focus: "50% 28%",
      },
      {
        src: "/media/edits/flights/04.jpg",
        alt: "Walking a lantern-lit colonnade in a red lehenga and gold set",
        focus: "50% 32%",
      },
      {
        src: "/media/edits/flights/05.jpg",
        alt: "A traveller in ochre and maroon beside a carved wooden door",
        focus: "50% 26%",
      },
      {
        src: "/media/edits/flights/06.jpg",
        alt: "A gold temple necklace worn with maroon silk and an ochre dupatta",
        focus: "50% 28%",
      },
    ],
    notes: [
      { label: "The capsule", value: "One necklace, one pair, one ring" },
      { label: "Metal", value: "22K gold — recognised at any counter, anywhere" },
      { label: "Packing", value: "Flat, in a roll; never in the hold" },
      { label: "Airport", value: "Wear the heavy piece, pack the rest" },
      { label: "Insurance", value: "Ask us for the valuation before you fly" },
    ],
    picks: [
      {
        id: "convertible",
        title: "The convertible haar",
        description:
          "Long for dinner, unclipped to a choker for the day. One piece doing the work of two, which is the whole trick of packing.",
      },
      {
        id: "studs-travel",
        title: "Studs that stay in",
        description:
          "Screw-back, low profile. They go through security, sleep on a plane, and never end up in a hotel sink.",
      },
      {
        id: "roll",
        title: "The jewellery roll",
        description:
          "Made for us in soft suede, sized for a cabin bag. Yours with any piece from this edit.",
      },
    ],
    drawsFrom: ["gold", "polki"],
  },
];

export const editsBySlug = Object.fromEntries(
  edits.map((e) => [e.slug, e]),
) as Record<string, OccasionEdit>;

/** Intro copy for the /edits index. */
export const editsIntro = {
  eyebrow: "The Edits",
  title: "Not what it's made of.\nWhere you're wearing it.",
  body: "Gold, diamond and polki are the rooms of the house. The edits are the reasons you walk into them — five occasions, each with its own light, its own weight, and its own rules about what to leave at home.",
};
