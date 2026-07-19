import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
};

/** Matches live Bootstrap: col-12 / col-sm-6 / col-md-4 / col-lg-3 */
export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-2 min-[576px]:grid-cols-2 min-[768px]:grid-cols-3 min-[992px]:grid-cols-4">
      {products.map((product) => (
        <div key={product.id} className="mb-4 flex w-full justify-center">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
