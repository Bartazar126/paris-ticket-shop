import type { Metadata } from "next";
import { Suspense } from "react";
import { Providers } from "@/components/paristicketshop/Providers";
import { SiteFooter } from "@/components/paristicketshop/SiteFooter";
import { SiteHeader } from "@/components/paristicketshop/SiteHeader";
import { ThankYouView } from "@/components/paristicketshop/ThankYouView";

export const metadata: Metadata = {
  title: "Paris Ticket Shop | Thank you",
  description: "Your Paris Ticket Shop payment confirmation.",
};

export default function ThankYouPage() {
  return (
    <Providers>
      <div className="flex min-h-full w-full flex-col bg-white text-zinc-800 leading-6">
        <SiteHeader />
        <main className="w-full">
          <Suspense
            fallback={
              <div className="pts-container py-16 text-center text-zinc-600">
                Loading…
              </div>
            }
          >
            <ThankYouView />
          </Suspense>
        </main>
        <SiteFooter />
      </div>
    </Providers>
  );
}
