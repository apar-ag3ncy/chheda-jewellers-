/**
 * FUTURE COMMERCE - data model (Phase 5).
 *
 * Nothing here is wired into the live marketing site. It exists so that when
 * we bolt on headless commerce (Shopify Storefront or Medusa), the jewellery
 * data already carries the fields Indian retail needs - purity, weight,
 * making charges, HSN, hallmark - and the frontend contracts don't change.
 */

export type Purity = "22K" | "18K" | "14K" | "24K" | "Silver" | "Platinum";
export type MetalType = "gold" | "diamond" | "polki" | "silver" | "platinum";

export interface Money {
  amount: number;
  currency: "INR";
}

export interface MakingCharge {
  /** "percentage" of metal value, or a flat "perGram" / "flat" amount. */
  type: "percentage" | "perGram" | "flat";
  value: number;
}

export interface HallmarkInfo {
  bis: boolean;
  huid?: string; // 6-digit Hallmark Unique ID
}

export interface ProductVariant {
  id: string;
  sku: string;
  purity: Purity;
  /** Gross weight in grams. */
  grossWeightG: number;
  /** Net metal weight in grams (excludes stones). */
  netWeightG?: number;
  makingCharge: MakingCharge;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  metalType: MetalType;
  category: "gold" | "diamond" | "polki";
  images: { src: string; alt: string }[];
  variants: ProductVariant[];
  hallmark: HallmarkInfo;
  /** HSN code for GST invoicing (e.g. 7113 for gold jewellery). */
  hsn: string;
  gstRate: number;
  /** Computed at read-time from the live gold rate + making + GST. */
  indicativePrice?: Money;
  tags: string[];
}

/** The provider contract - one implementation per backend. */
export interface CommerceProvider {
  listProducts(params?: { category?: Product["category"]; limit?: number }): Promise<Product[]>;
  getProduct(slug: string): Promise<Product | null>;
}
