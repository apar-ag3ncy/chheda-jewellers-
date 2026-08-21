import { categories } from "@/lib/content/categories";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { pageMetadata } from "@/lib/seo";

const category = categories.polki;

export const metadata = pageMetadata({
  title: `${category.name} Jewellery`,
  description: category.intro,
  path: "/jewellery/polki",
});

export default function PolkiPage() {
  return <CategoryShowcase category={category} />;
}
