/**
 * GREATER MUMBAI - the projection the map poster was generated with.
 *
 * `public/media/map/mumbai-network.svg` is drawn in this coordinate space, so
 * anything overlaid on that image (the branch pins) must be placed through
 * `projectPoint` to land on its real position. Regenerate both together with
 * `scripts/generate-mumbai-map.py`.
 *
 * Map data © OpenStreetMap contributors (ODbL) - keep the credit that the
 * Branches map renders alongside this geometry.
 *
 * The district boundary paths this file used to carry are gone: the road
 * network in the poster describes the coastline better than an outline did.
 */

export const MAP_VIEW = { w: 1242.0, h: 776 } as const;

export const MAP_BOUNDS = {
  west: 72.64993,
  east: 73.11017,
  south: 18.95678,
  north: 19.22862,
  /** cos(mid-latitude) - the horizontal scale correction used at generation. */
  kx: 0.945058,
} as const;

/** Project a WGS84 coordinate into MAP_VIEW space. */
export function projectPoint(lat: number, lng: number): { x: number; y: number } {
  const degW = (MAP_BOUNDS.east - MAP_BOUNDS.west) * MAP_BOUNDS.kx;
  const degH = MAP_BOUNDS.north - MAP_BOUNDS.south;
  return {
    x: ((lng - MAP_BOUNDS.west) * MAP_BOUNDS.kx / degW) * MAP_VIEW.w,
    y: ((MAP_BOUNDS.north - lat) / degH) * MAP_VIEW.h,
  };
}
