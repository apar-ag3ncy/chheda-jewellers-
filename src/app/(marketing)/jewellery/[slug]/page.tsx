import { categories, categoryList } from "@/lib/content/categories";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { pageMetadata } from "@/lib/seo";

/**
 * THE METAL ROOMS - /jewellery/gold, /jewellery/diamond, /jewellery/polki.
 *
 * One dynamic route instead of three hand-copied folders: the pages were
 * identical except for a literal, and the sibling axis (/edits/[slug])
 * already established the convention. `dynamicParams = false` turns any
 * other slug into a hard 404 rather than a soft one, exactly as on /edits.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return categoryList.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories[slug as keyof typeof categories];
  return pageMetadata({
    title: `${category.name} Jewellery`,
    description: category.intro,
    path: `/jewellery/${category.slug}`,
  });
}

export default async function CategoryRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories[slug as keyof typeof categories];
  return <CategoryShowcase category={category} />;
}
