import type { ImageAsset } from "@/types/content";

/**
 * THE CAMPAIGN WALL - the Collections section as a poster series.
 *
 * Nine frames from the house archive, hung edge to edge like a wall of
 * campaign posters, every tile carrying the same small house slate the way a
 * jewellery maison stamps every ad it runs. Frames alternate portraits and
 * close product studies, and none is used anywhere else on the site.
 */
export interface CampaignTile {
  id: string;
  image: ImageAsset;
  /** The piece, named - revealed on hover like a plate caption. */
  caption: string;
}

export const campaignWall: CampaignTile[] = [
  {
    id: "sapphire-choker",
    image: {
      src: "/media/wall/01.jpg",
      alt: "A model in a rose-pink sari wearing a sapphire-drop polki choker in a palace colonnade",
      focus: "50% 24%",
    },
    caption: "The sapphire choker",
  },
  {
    id: "kundan-haar",
    image: {
      src: "/media/wall/02.jpg",
      alt: "A close study of a kundan and ruby-bead haar against red silk",
      focus: "50% 40%",
    },
    caption: "Kundan & ruby haar",
  },
  {
    id: "matha-patti",
    image: {
      src: "/media/wall/03.jpg",
      alt: "A bride in champagne gold with a pearl matha patti, holding a lotus",
      focus: "50% 22%",
    },
    caption: "The pearl matha patti",
  },
  {
    id: "bridal-set",
    image: {
      src: "/media/wall/04.jpg",
      alt: "A seated bride in red wearing the full gold bridal set",
      focus: "50% 26%",
    },
    caption: "The bridal set",
  },
  {
    id: "cocktail-ring",
    image: {
      src: "/media/wall/05.jpg",
      alt: "A polki cocktail ring worn on a hand resting against sheer embroidery",
      focus: "50% 45%",
    },
    caption: "The polki cocktail ring",
  },
  {
    id: "vine-diamonds",
    image: {
      src: "/media/wall/06.jpg",
      alt: "A profile in dark studio light wearing vine-set diamond earrings, a red rose below",
      focus: "50% 30%",
    },
    caption: "Vine-set diamonds",
  },
  {
    id: "chandbali-set",
    image: {
      src: "/media/wall/07.jpg",
      alt: "A model in peach and pink organza wearing a polki choker and chandbalis in evening sun",
      focus: "50% 24%",
    },
    caption: "The chandbali set",
  },
  {
    id: "jadau-twice",
    image: {
      src: "/media/wall/08.jpg",
      alt: "Two brides in deep maroon jadau sets, seated among clay urns",
      focus: "50% 35%",
    },
    caption: "Jadau, twice over",
  },
  {
    id: "gold-going-places",
    image: {
      src: "/media/wall/09.jpg",
      alt: "A model in red with a gold haar leaning on a vintage car under a low sun",
      focus: "50% 30%",
    },
    caption: "Gold, going places",
  },
];
