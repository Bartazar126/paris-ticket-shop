import type { Metadata } from "next";
import { CategoryHero } from "@/components/paristicketshop/CategoryHero";
import { ProductGrid } from "@/components/paristicketshop/ProductGrid";
import { Providers } from "@/components/paristicketshop/Providers";
import { SiteFooter } from "@/components/paristicketshop/SiteFooter";
import { SiteHeader } from "@/components/paristicketshop/SiteHeader";
import { versaillesPalaceProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Versailles Palace Tickets | Paris Ticket Shop",
  description:
    "Book Versailles Palace tickets, garden access, and combo experiences with the Eiffel Tower, Louvre, and Seine cruises.",
};

export default function VersaillesPalacePage() {
  return (
    <Providers>
      <div className="flex min-h-full w-full flex-col bg-white text-zinc-800 leading-6">
        <SiteHeader />
        <main className="w-full py-6">
          <CategoryHero
            imageSrc="/paristicketshop/hero/dddd.webp"
            imageAlt="Palace of Versailles exterior"
            title="Versailles Palace"
          />

          <div className="pts-container">
            <div className="mb-5">
              <h1 className="font-display text-[2.2em] font-semibold leading-[1.2] text-[#15399b] md:text-4xl md:leading-[2.75rem]">
                Versailles Tickets
              </h1>
            </div>

            <div className="pb-8">
              <ProductGrid products={versaillesPalaceProducts} />
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    </Providers>
  );
}
