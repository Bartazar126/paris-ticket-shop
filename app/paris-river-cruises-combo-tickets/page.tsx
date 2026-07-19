import type { Metadata } from "next";
import { CategoryHero } from "@/components/paristicketshop/CategoryHero";
import { ProductGrid } from "@/components/paristicketshop/ProductGrid";
import { Providers } from "@/components/paristicketshop/Providers";
import { SiteFooter } from "@/components/paristicketshop/SiteFooter";
import { SiteHeader } from "@/components/paristicketshop/SiteHeader";
import { riverCruiseProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Paris Boat Tour Tickets | Paris Ticket Shop",
  description:
    "Book Paris river cruises and combo tickets including Seine boat tours, Eiffel Tower, Louvre and Versailles experiences.",
};

export default function RiverCruisesComboTicketsPage() {
  return (
    <Providers>
      <div className="flex min-h-full w-full flex-col bg-white text-zinc-800 leading-6">
        <SiteHeader />
        <main className="w-full py-6">
          <CategoryHero
            imageSrc="/paristicketshop/hero/shutterstock-1201269418.webp"
            imageAlt="Paris Seine river cruise boat near the city skyline"
          />

          <div className="pts-container">
            <div className="mb-5">
              <h1 className="font-display text-[2.2em] font-semibold leading-[1.2] text-[#15399b] md:text-4xl md:leading-[2.75rem]">
                Paris River Cruises & Combo Tickets
              </h1>
            </div>

            <div className="pb-8">
              <ProductGrid products={riverCruiseProducts} />
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    </Providers>
  );
}
