"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAttractionImage } from "@/data/attractions";
import { getProductDetail } from "@/data/productDetails";
import { clearBookingDraft } from "@/lib/bookingSession";
import { LazyFadeImage } from "./LazyFadeImage";
import { useCurrency } from "./CurrencyContext";

type Selection = {
  legId: string;
  label: string;
  date: string;
  time: string | null;
};

type BookingSummary = {
  id: string;
  product_slug: string;
  product_title: string;
  customer_name: string;
  customer_email: string;
  adults: number;
  children: number;
  infants: number;
  total_amount: number;
  currency: string;
  status: string;
  selections: Selection[];
  paid_at: string | null;
};

function formatDisplayDate(iso: string): string {
  const d = new Date(`${iso.slice(0, 10)}T12:00:00`);
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ThankYouView() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { formatPrice } = useCurrency();
  const [booking, setBooking] = useState<BookingSummary | null>(null);
  const [status, setStatus] = useState<"loading" | "paid" | "pending" | "error">(
    "loading",
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setError("Missing payment session.");
      return;
    }

    let cancelled = false;
    let attempts = 0;

    async function confirm() {
      attempts += 1;
      try {
        const res = await fetch(
          `/api/checkout/confirm?session_id=${encodeURIComponent(sessionId!)}`,
          { cache: "no-store" },
        );
        const data = (await res.json()) as {
          booking?: BookingSummary;
          status?: string;
          error?: string;
        };
        if (!res.ok) {
          throw new Error(data.error || "Could not confirm payment");
        }
        if (cancelled) return;

        if (data.booking) setBooking(data.booking);

        if (data.status === "paid") {
          setStatus("paid");
          clearBookingDraft();
          return;
        }

        if (attempts < 3) {
          setStatus("pending");
          setTimeout(() => {
            void confirm();
          }, 1200);
          return;
        }

        setStatus("pending");
      } catch (e) {
        if (cancelled) return;
        setStatus("error");
        setError(e instanceof Error ? e.message : "Confirmation failed");
      }
    }

    void confirm();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const productImage = useMemo(() => {
    if (!booking?.product_slug) return undefined;
    const detail = getProductDetail(booking.product_slug);
    return detail?.gallery?.[0];
  }, [booking?.product_slug]);

  if (status === "loading") {
    return (
      <div className="pts-container py-16 text-center">
        <h1 className="font-display mb-4 text-3xl font-semibold text-[#15399b]">
          Confirming payment…
        </h1>
        <p className="text-zinc-600">Just a moment while we finalize your order.</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="pts-container py-16 text-center">
        <h1 className="font-display mb-4 text-3xl font-semibold text-[#15399b]">
          Something went wrong
        </h1>
        <p className="mb-6 text-zinc-700">{error}</p>
        <Link
          href="/checkout"
          className="inline-flex rounded-lg bg-[#15399b] px-5 py-2.5 text-white"
        >
          Back to checkout
        </Link>
      </div>
    );
  }

  if (status === "pending" && !booking) {
    return (
      <div className="pts-container py-16 text-center">
        <h1 className="font-display mb-4 text-3xl font-semibold text-[#15399b]">
          Payment received
        </h1>
        <p className="mb-6 text-zinc-700">
          We&apos;re still confirming your booking. Refresh this page in a moment
          or check your email.
        </p>
        <Link href="/" className="inline-flex rounded-lg bg-[#15399b] px-5 py-2.5 text-white">
          Back to home
        </Link>
      </div>
    );
  }

  const paid = status === "paid" || booking?.status === "paid";
  const selections = booking?.selections ?? [];
  const ticketCount =
    (booking?.adults ?? 0) + (booking?.children ?? 0) + (booking?.infants ?? 0);

  return (
    <div className="pts-thankyou">
      <div className="pts-container py-10 pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#2f7f6b]">
            {paid ? "Payment successful" : "Order received"}
          </p>
          <h1 className="font-display mb-3 text-3xl font-semibold text-[#15399b] md:text-4xl">
            Thank you{booking?.customer_name ? `, ${booking.customer_name}` : ""}!
          </h1>
          <p className="mb-8 text-zinc-600">
            {paid
              ? "Your tickets are confirmed. A receipt was sent to your email by Stripe."
              : "Your payment is processing. We’ll confirm your booking shortly."}
          </p>
        </div>

        {booking ? (
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[14px] border border-solid border-[#d8dee9] bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
            {productImage ? (
              <div className="relative h-48 w-full md:h-56">
                <LazyFadeImage
                  src={productImage}
                  alt={booking.product_title}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-left text-white md:p-6">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/80">
                    Your package
                  </p>
                  <h2 className="font-display text-xl font-semibold leading-snug md:text-2xl">
                    {booking.product_title}
                  </h2>
                </div>
              </div>
            ) : (
              <div className="border-b border-solid border-[#eee] px-5 py-5 md:px-6">
                <h2 className="font-display text-xl font-semibold text-[#15399b]">
                  {booking.product_title}
                </h2>
              </div>
            )}

            <div className="grid gap-4 border-b border-solid border-[#eee] px-5 py-4 sm:grid-cols-3 md:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Order
                </p>
                <p className="mt-0.5 font-mono text-sm font-semibold text-zinc-800">
                  {booking.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Email
                </p>
                <p className="mt-0.5 truncate text-sm font-semibold text-zinc-800">
                  {booking.customer_email}
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Total
                </p>
                <p className="mt-0.5 text-lg font-semibold tabular-nums text-zinc-900">
                  {formatPrice(Number(booking.total_amount))}
                </p>
              </div>
            </div>

            <div className="px-5 py-5 md:px-6">
              <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#15399b]">
                    Your visits
                  </h3>
                  <p className="text-sm text-zinc-500">
                    {selections.length} attraction
                    {selections.length === 1 ? "" : "s"} · {ticketCount} ticket
                    {ticketCount === 1 ? "" : "s"}
                  </p>
                </div>
              </div>

              <ul className="space-y-3">
                {selections.map((sel, index) => {
                  const image = getAttractionImage(sel.legId);
                  return (
                    <li
                      key={`${sel.legId}-${sel.date}-${sel.time}-${index}`}
                      className="flex gap-3 rounded-[10px] border border-solid border-[#e8edf5] bg-[#f8fafc] p-3 sm:gap-4 sm:p-3.5"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#e5eaf3] sm:h-24 sm:w-24">
                        {image ? (
                          <LazyFadeImage
                            src={image}
                            alt={sel.label}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm font-bold text-[#15399b]">
                            {index + 1}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1 self-center">
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#2f7f6b]">
                          Visit {index + 1}
                        </p>
                        <p className="mt-0.5 text-base font-semibold leading-snug text-zinc-900">
                          {sel.label}
                        </p>
                        <p className="mt-1 text-sm text-zinc-600">
                          {formatDisplayDate(sel.date)}
                          {sel.time && sel.time !== "Flexible / anytime"
                            ? ` · ${sel.time}`
                            : sel.time === "Flexible / anytime"
                              ? " · Flexible entry"
                              : ""}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5 rounded-[10px] border border-solid border-[#e8edf5] bg-white px-4 py-3 text-sm text-zinc-700">
                <p className="font-semibold text-zinc-800">Tickets</p>
                <p className="mt-1">
                  {booking.adults} adult{booking.adults === 1 ? "" : "s"}
                  {booking.children > 0
                    ? ` · ${booking.children} child${booking.children === 1 ? "" : "ren"}`
                    : ""}
                  {booking.infants > 0
                    ? ` · ${booking.infants} infant${booking.infants === 1 ? "" : "s"}`
                    : ""}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex rounded-lg bg-[#15399b] px-5 py-2.5 text-white"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
