import type { Metadata } from "next";
import { CheckoutView } from "@/components/paristicketshop/CheckoutView";
import { Providers } from "@/components/paristicketshop/Providers";
import { SiteFooter } from "@/components/paristicketshop/SiteFooter";
import { SiteHeader } from "@/components/paristicketshop/SiteHeader";

export const metadata: Metadata = {
  title: "Paris Ticket Shop | Checkout",
  description: "Complete your Paris Ticket Shop booking.",
};

export default function CheckoutPage() {
  return (
    <Providers>
      <div className="flex min-h-full w-full flex-col bg-white text-zinc-800 leading-6">
        <SiteHeader />
        <main className="w-full">
          <CheckoutView />
        </main>
        <SiteFooter />
      </div>
    </Providers>
  );
}
