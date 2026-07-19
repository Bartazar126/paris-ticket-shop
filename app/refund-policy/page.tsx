import type { Metadata } from "next";
import Link from "next/link";
import { Providers } from "@/components/paristicketshop/Providers";
import { SiteFooter } from "@/components/paristicketshop/SiteFooter";
import { SiteHeader } from "@/components/paristicketshop/SiteHeader";

export const metadata: Metadata = {
  title: "Paris Ticket Shop | Refund Policy",
  description:
    "Refund Policy for Paris Ticket Shop. Terms and conditions regarding refunds for attraction ticket purchases.",
};

export default function RefundPolicyPage() {
  return (
    <Providers>
      <div className="flex min-h-full w-full flex-col bg-white text-zinc-800 leading-6">
        <SiteHeader />
        <main className="w-full py-6">
          <div className="pts-container pb-6">
            <div className="mb-5">
              <h1 className="font-display text-4xl font-semibold leading-[2.75rem] text-[#15399b]">
                Refund Policy
              </h1>
            </div>

            <div className="max-w-none">
              <p className="mb-4">
                Thank you for choosing our attraction ticket seller website. We
                strive to provide you with the best possible service and ensure
                your satisfaction with your ticket purchases. However, we
                understand that situations may arise where you may need to
                request a refund. This refund policy outlines the terms and
                conditions regarding refunds for ticket purchases made through
                our website. Please read this policy carefully before making a
                purchase.
              </p>
            </div>

            <div className="pt-6">
              <Link
                href="/"
                className="inline-block rounded-lg border-2 border-solid border-[#15399b] bg-[#15399b] px-3 py-1.5 text-center text-white transition hover:opacity-90"
              >
                Back
              </Link>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    </Providers>
  );
}
