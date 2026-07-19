import Link from "next/link";
import type { Product } from "@/data/products";
import { ProductCarousel } from "./ProductCarousel";
import { SectionHeading } from "./SectionHeading";

type AttractionSectionProps = {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref: string;
};

export function AttractionSection({
  title,
  subtitle,
  products,
  viewAllHref,
}: AttractionSectionProps) {
  return (
    <section className="pb-16 md:pb-20">
      <div className="pts-container">
        <SectionHeading title={title} subtitle={subtitle} />
        <ProductCarousel products={products} />
        <div className="pt-6 text-center">
          <Link
            href={viewAllHref}
            className="pts-view-all-btn inline-flex h-16 items-center justify-center rounded-xl border-2 border-solid border-[#e01b1b] px-8 py-4 text-xl leading-[1.88rem] text-[#e01b1b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e01b1b]"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
