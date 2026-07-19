import {
  getProductDetail,
  type ProductDetail,
} from "./productDetails";
import {
  eiffelTowerProducts,
  louvreTicketsProducts,
  riverCruiseProducts,
  topAttractionsProducts,
  versaillesPalaceProducts,
  type Product,
} from "./products";

const CATEGORY_PRODUCTS: Record<string, Product[]> = {
  "paris-river-cruises-combo-tickets": riverCruiseProducts,
  "the-eiffel-tower": eiffelTowerProducts,
  "versailles-palace": versaillesPalaceProducts,
  "louvre-tickets": louvreTicketsProducts,
  "top-attractionss": topAttractionsProducts,
};

export function getAllProducts(): Product[] {
  return Object.values(CATEGORY_PRODUCTS).flat();
}

export function getCategoryProducts(category: string): Product[] {
  return CATEGORY_PRODUCTS[category] ?? [];
}

export function getProductByPath(
  category: string,
  slug: string,
): Product | undefined {
  const href = `/${category}/${slug}`;
  return getCategoryProducts(category).find((product) => product.href === href);
}

export function getProductPageData(
  category: string,
  slug: string,
): { card: Product; detail: ProductDetail } | undefined {
  const card = getProductByPath(category, slug);
  const detail = getProductDetail(slug);
  if (!card || !detail) return undefined;
  return { card, detail };
}

export function getSimilarProducts(
  category: string,
  slug: string,
  limit = 6,
): Product[] {
  return getCategoryProducts(category)
    .filter((product) => {
      const parts = product.href.split("/").filter(Boolean);
      return parts[1] !== slug;
    })
    .slice(0, limit);
}

export function getProductStaticParams(): { category: string; slug: string }[] {
  const params: { category: string; slug: string }[] = [];
  for (const [category, products] of Object.entries(CATEGORY_PRODUCTS)) {
    for (const product of products) {
      const parts = product.href.split("/").filter(Boolean);
      if (parts.length !== 2) continue;
      const [hrefCategory, slug] = parts;
      if (hrefCategory !== category) continue;
      if (!getProductDetail(slug)) continue;
      params.push({ category, slug });
    }
  }
  return params;
}
