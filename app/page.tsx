import { AttractionSection } from "@/components/paristicketshop/AttractionSection";
import { HeroSection } from "@/components/paristicketshop/HeroSection";
import { Providers } from "@/components/paristicketshop/Providers";
import { SiteFooter } from "@/components/paristicketshop/SiteFooter";
import { SiteHeader } from "@/components/paristicketshop/SiteHeader";
import { riverCruiseProducts } from "@/data/products";

export default function HomePage() {
  return (
    <Providers>
      <div className="flex min-h-full w-full flex-col bg-white text-zinc-800 leading-6">
        <SiteHeader />
        <HeroSection />
        <main className="w-full py-6">
          <AttractionSection
            title="River Cruises & Combo Tickets"
            subtitle="Select the Best Cruise for you!"
            products={riverCruiseProducts}
            viewAllHref="/paris-river-cruises-combo-tickets"
          />
        </main>
        <SiteFooter />
      </div>
    </Providers>
  );
}
