import { categories } from "@/lib/content/categories";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { pageMetadata } from "@/lib/seo";

const category = categories.gold;

export const metadata = pageMetadata({
  title: `${category.name} Jewellery`,
  description: category.intro,
  path: "/jewellery/gold",
});

export default function GoldPage() {
  return <CategoryShowcase category={category} />;
}
