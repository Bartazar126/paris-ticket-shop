import type { Metadata } from "next";
import { CategoryHero } from "@/components/paristicketshop/CategoryHero";
import { ProductGrid } from "@/components/paristicketshop/ProductGrid";
import { Providers } from "@/components/paristicketshop/Providers";
import { SiteFooter } from "@/components/paristicketshop/SiteFooter";
import { SiteHeader } from "@/components/paristicketshop/SiteHeader";
import { topAttractionsProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Paris Ticket Shop | Top Attractions",
  description:
    "Discover Paris’ top attractions — Eiffel Tower, Louvre Museum, and unforgettable Seine River cruises.",
};

export default function TopAttractionsPage() {
  return (
    <Providers>
      <div className="flex min-h-full w-full flex-col bg-white text-zinc-800 leading-6">
        <SiteHeader />
        <main className="w-full py-6">
          <CategoryHero
            imageSrc="/paristicketshop/hero/seine1.webp"
            imageAlt="Seine River cruise in Paris"
            title={
              <>
                Discover Paris’ Top Attractions
                <br />
                Eiffel Tower, Louvre Museum, and unforgettable Seine River
                cruises
              </>
            }
          />

          <div className="pts-container">
            <div className="mb-5">
              <h1 className="font-display text-[2.2em] font-semibold leading-[1.2] text-[#15399b] md:text-4xl md:leading-[2.75rem]">
                Top Attractions
              </h1>
            </div>

            <div className="pb-8">
              <ProductGrid products={topAttractionsProducts} />
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    </Providers>
  );
}
