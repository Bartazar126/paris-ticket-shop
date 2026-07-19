import type { Metadata } from "next";
import { CategoryHero } from "@/components/paristicketshop/CategoryHero";
import { ProductGrid } from "@/components/paristicketshop/ProductGrid";
import { Providers } from "@/components/paristicketshop/Providers";
import { SiteFooter } from "@/components/paristicketshop/SiteFooter";
import { SiteHeader } from "@/components/paristicketshop/SiteHeader";
import { louvreTicketsProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Paris Ticket Shop | The Louvre",
  description:
    "Book Louvre Museum tickets with digital E-Guides, Seine cruise combos, and entry to Paris’s most iconic landmarks.",
};

export default function LouvreTicketsPage() {
  return (
    <Providers>
      <div className="flex min-h-full w-full flex-col bg-white text-zinc-800 leading-6">
        <SiteHeader />
        <main className="w-full py-6">
          <CategoryHero
            imageSrc="/paristicketshop/hero/shutterstock-485167240.webp"
            imageAlt="Louvre Museum pyramid and courtyard"
            title="Explore the Louvre - Louvre Museum Tickets"
          />

          <div className="pts-container">
            <div className="mb-4">
              <p className="mb-4 text-base leading-6 text-zinc-800">
                Make the most of your trip to the City of Light. We provide
                seamless entry to Paris’s most iconic landmarks, paired with a
                digital E-Guide to bring the history to life. Need help? We are
                more than just a booking platform—our dedicated phone support
                team is just a call away to ensure your experience is perfect.
              </p>
            </div>

            <div className="mb-5">
              <h1 className="font-display text-[2.2em] font-semibold leading-[1.2] text-[#15399b] md:text-4xl md:leading-[2.75rem]">
                The Louvre
              </h1>
            </div>

            <div className="pb-8">
              <ProductGrid products={louvreTicketsProducts} />
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    </Providers>
  );
}
