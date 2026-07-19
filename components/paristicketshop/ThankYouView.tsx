"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { clearBookingDraft } from "@/lib/bookingSession";
import { useCurrency } from "./CurrencyContext";

type BookingSummary = {
  id: string;
  product_title: string;
  customer_name: string;
  customer_email: string;
  adults: number;
  children: number;
  infants: number;
  total_amount: number;
  currency: string;
  status: string;
  selections: { legId: string; label: string; date: string; time: string | null }[];
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

  return (
    <div className="pts-container py-10 pb-16">
      <div className="mx-auto max-w-2xl text-center">
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
        <div className="mx-auto max-w-2xl rounded-[10px] border border-solid border-[#d0d0d0] p-6 text-left">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b border-solid border-[#eee] pb-4">
            <div>
              <p className="text-sm text-zinc-500">Order</p>
              <p className="font-mono text-sm font-semibold text-zinc-800">
                {booking.id.slice(0, 8).toUpperCase()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-500">Total</p>
              <p className="text-lg font-semibold tabular-nums text-zinc-900">
                {formatPrice(Number(booking.total_amount))}
              </p>
            </div>
          </div>

          <h2 className="mb-2 text-lg font-semibold text-zinc-800">
            {booking.product_title}
          </h2>
          <p className="mb-4 text-sm text-zinc-600">
            Confirmation email:{" "}
            <span className="font-semibold text-zinc-800">
              {booking.customer_email}
            </span>
          </p>

          <ul className="mb-4 space-y-2 border-t border-solid border-[#eee] pt-4">
            {(booking.selections ?? []).map((sel) => (
              <li
                key={`${sel.legId}-${sel.date}-${sel.time}`}
                className="flex flex-wrap justify-between gap-2 text-sm"
              >
                <span className="font-semibold text-zinc-800">{sel.label}</span>
                <span className="text-zinc-600">
                  {formatDisplayDate(sel.date)}
                  {sel.time ? ` · ${sel.time}` : ""}
                </span>
              </li>
            ))}
          </ul>

          <p className="text-sm text-zinc-600">
            Tickets: {booking.adults} adult{booking.adults === 1 ? "" : "s"}
            {booking.children > 0
              ? ` · ${booking.children} child${booking.children === 1 ? "" : "ren"}`
              : ""}
            {booking.infants > 0
              ? ` · ${booking.infants} infant${booking.infants === 1 ? "" : "s"}`
              : ""}
          </p>
        </div>
      ) : null}

      <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex rounded-lg bg-[#15399b] px-5 py-2.5 text-white"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
