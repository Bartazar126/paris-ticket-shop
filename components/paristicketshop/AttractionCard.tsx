import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

/** Attraction listings reuse the same card treatment as product tickets. */
export function AttractionCard({ product }: { product: Product }) {
  return <ProductCard product={product} />;
}
