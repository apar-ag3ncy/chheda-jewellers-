import { NextResponse } from "next/server";
import { getGoldRate } from "@/lib/gold-rate";

/**
 * Live gold-rate endpoint. The UI reads this - never a third-party API
 * directly. Cached at the edge (~10 min) so we never hammer the provider.
 */
export const revalidate = 600;

export async function GET() {
  const data = await getGoldRate();
  return NextResponse.json(data, {
    headers: {
      // Browser caches for 5 min; CDN for 10 min with background revalidation.
      "Cache-Control": "public, max-age=300, s-maxage=600, stale-while-revalidate=1800",
    },
  });
}
