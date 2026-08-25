import type { ImageAsset } from "@/types/content";

/**
 * THE CAMPAIGN WALL - the Collections section as a bento of frames.
 *
 * Nine frames from the house archive, laid into mixed tile sizes. The section
 * carries no words at all, so the `focus` hint on each image is doing real
 * work: a tile can be cropped to a tall portrait, a wide landscape or a square
 * depending on where it lands in the bento, and the hint is what keeps the
 * subject in frame through all three. None of these frames is used elsewhere.
 */
export interface CampaignTile {
  id: string;
  image: ImageAsset;
  /**
   * White serif label at the tile's foot, as in the reference grid. Six of
   * the nine tiles carry one; the hero and the two closing tiles stay bare,
   * exactly as in the reference.
   */
  label?: string;
}

export const campaignWall: CampaignTile[] = [
  {
    id: "sapphire-choker",
    label: "Necklaces",
    image: {
      src: "/media/wall/01.jpg",
      alt: "A model in a rose-pink sari wearing a sapphire-drop polki choker in a palace colonnade",
      focus: "45% 20%",
    },
  },
  {
    id: "cocktail-ring",
    label: "Rings",
    image: {
      src: "/media/wall/05.jpg",
      alt: "A polki cocktail ring worn on a hand resting against sheer embroidery",
      focus: "50% 46%",
    },
  },
  {
    id: "matha-patti",
    label: "Maangtika",
    image: {
      src: "/media/wall/03.jpg",
      alt: "A bride in champagne gold with a pearl maangtika, holding a lotus",
      focus: "50% 10%",
    },
  },
  {
    id: "bridal-set",
    label: "Bridal",
    image: {
      src: "/media/wall/04.jpg",
      alt: "A seated bride in red wearing the full gold bridal set",
      focus: "50% 30%",
    },
  },
  {
    id: "kundan-haar",
    label: "Kundan",
    image: {
      src: "/media/wall/02.jpg",
      alt: "A close study of a kundan and ruby-bead haar against red silk",
      focus: "50% 35%",
    },
  },
  {
    id: "vine-diamonds",
    image: {
      src: "/media/wall/06.jpg",
      alt: "A profile in dark studio light wearing vine-set diamond earrings, a red rose below",
      focus: "50% 12%",
    },
  },
  {
    id: "chandbali-set",
    label: "Chandbalis",
    image: {
      src: "/media/wall/07.jpg",
      alt: "A model in peach and pink organza wearing a polki choker and chandbalis in evening sun",
      focus: "50% 15%",
    },
  },
  {
    id: "jadau-twice",
    image: {
      src: "/media/wall/08.jpg",
      alt: "Two brides in deep maroon jadau sets, seated among clay urns",
      focus: "50% 60%",
    },
  },
  {
    id: "gold-going-places",
    image: {
      src: "/media/wall/09.jpg",
      alt: "A model in red with a gold haar leaning on a vintage car under a low sun",
      focus: "50% 5%",
    },
  },
];
