import { categories } from "@/lib/content/categories";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { pageMetadata } from "@/lib/seo";

const category = categories.diamond;

export const metadata = pageMetadata({
  title: `${category.name} Jewellery`,
  description: category.intro,
  path: "/jewellery/diamond",
});

export default function DiamondPage() {
  return <CategoryShowcase category={category} />;
}
