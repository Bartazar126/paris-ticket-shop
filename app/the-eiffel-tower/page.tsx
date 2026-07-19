import type { Metadata } from "next";
import { CategoryHero } from "@/components/paristicketshop/CategoryHero";
import { ProductGrid } from "@/components/paristicketshop/ProductGrid";
import { Providers } from "@/components/paristicketshop/Providers";
import { SiteFooter } from "@/components/paristicketshop/SiteFooter";
import { SiteHeader } from "@/components/paristicketshop/SiteHeader";
import { eiffelTowerProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Eiffel Tower Tickets | Paris Ticket Shop",
  description:
    "Book Eiffel Tower tickets online today, plus Seine cruise, Louvre, Versailles, and Arc de Triomphe combo experiences.",
};

export default function TheEiffelTowerPage() {
  return (
    <Providers>
      <div className="flex min-h-full w-full flex-col bg-white text-zinc-800 leading-6">
        <SiteHeader />
        <main className="w-full py-6">
          <CategoryHero
            imageSrc="/paristicketshop/hero/eiffel-2.webp"
            imageAlt="Eiffel Tower in Paris"
            title="Eiffel Tower Tickets - Book Online Today"
          />

          <div className="pts-container">
            <div className="mb-5">
              <h1 className="font-display text-[2.2em] font-semibold leading-[1.2] text-[#15399b] md:text-4xl md:leading-[2.75rem]">
                The Eiffel Tower
              </h1>
            </div>

            <div className="pb-8">
              <ProductGrid products={eiffelTowerProducts} />
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    </Providers>
  );
}
