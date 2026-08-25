import type { CommerceProvider, Product } from "./types";

/**
 * Placeholder commerce provider (Phase 5 not started).
 * Swap this for a Shopify Storefront or Medusa implementation later - the
 * `CommerceProvider` contract is all the frontend depends on.
 */
export const commerce: CommerceProvider = {
  async listProducts(): Promise<Product[]> {
    return [];
  },
  async getProduct(): Promise<Product | null> {
    return null;
  },
};
