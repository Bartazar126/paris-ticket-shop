"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useCurrency } from "./CurrencyContext";
import { LazyFadeImage } from "./LazyFadeImage";
import {
  clearBookingDraft,
  loadBookingDraft,
  type BookingDraft,
} from "@/lib/bookingSession";
import { createClient } from "@/lib/supabase/client";

const MAX_PER_TYPE = 10;

type TicketType = "adult" | "child" | "infant";

const TICKET_META: Record<
  TicketType,
  { label: string; ages: string; multiplier: number }
> = {
  adult: { label: "Adult", ages: "Ages 18+", multiplier: 1 },
  child: { label: "Child", ages: "Ages 4–17", multiplier: 0.7 },
  infant: { label: "Infant", ages: "Ages 0–3", multiplier: 0 },
};

function formatDisplayDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function unitPriceFor(base: number, type: TicketType): number {
  return Math.round(base * TICKET_META[type].multiplier * 100) / 100;
}

function QuantityStepper({
  label,
  ages,
  value,
  unitPrice,
  formatPrice,
  onChange,
  min = 0,
}: {
  label: string;
  ages: string;
  value: number;
  unitPrice: number;
  formatPrice: (n: number) => string;
  onChange: (next: number) => void;
  min?: number;
}) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(MAX_PER_TYPE, value + 1));

  return (
    <div className="flex items-center justify-between gap-4 border-b border-solid border-[#eee] py-4 last:border-0">
      <div className="min-w-0">
        <p className="font-semibold text-zinc-800">{label}</p>
        <p className="text-sm text-zinc-500">{ages}</p>
        <p className="mt-0.5 text-sm text-zinc-600">
          {unitPrice === 0 ? "Free" : formatPrice(unitPrice)} each
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
          onClick={dec}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-solid border-[#d0d0d0] text-xl font-semibold text-[#15399b] transition hover:border-[#15399b] disabled:cursor-not-allowed disabled:opacity-35"
        >
          −
        </button>
        <span
          className="w-8 text-center text-lg font-semibold tabular-nums text-zinc-800"
          aria-live="polite"
        >
          {value}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          disabled={value >= MAX_PER_TYPE}
          onClick={inc}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-solid border-[#d0d0d0] text-xl font-semibold text-[#15399b] transition hover:border-[#15399b] disabled:cursor-not-allowed disabled:opacity-35"
        >
          +
        </button>
      </div>
    </div>
  );
}

export function CheckoutView() {
  const { formatPrice } = useCurrency();
  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [acceptTos, setAcceptTos] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(loadBookingDraft());
  }, []);

  const base = draft?.price ?? 0;
  const lines = useMemo(() => {
    const items: { type: TicketType; qty: number; unit: number; sub: number }[] =
      [
        {
          type: "adult",
          qty: adults,
          unit: unitPriceFor(base, "adult"),
          sub: 0,
        },
        {
          type: "child",
          qty: children,
          unit: unitPriceFor(base, "child"),
          sub: 0,
        },
        {
          type: "infant",
          qty: infants,
          unit: unitPriceFor(base, "infant"),
          sub: 0,
        },
      ];
    return items
      .map((row) => ({ ...row, sub: Math.round(row.unit * row.qty * 100) / 100 }))
      .filter((row) => row.qty > 0);
  }, [adults, base, children, infants]);

  const total = useMemo(
    () => Math.round(lines.reduce((sum, row) => sum + row.sub, 0) * 100) / 100,
    [lines],
  );
  const ticketCount = adults + children + infants;
  const canPay =
    Boolean(name.trim()) &&
    Boolean(email.trim()) &&
    acceptTos &&
    adults >= 1 &&
    ticketCount >= 1;

  async function submitBooking() {
    if (!draft || !canPay || saving) return;
    setSaving(true);
    setSubmitError(null);
    const supabase = createClient();
    const { error } = await supabase.from("pts_bookings").insert({
      product_slug: draft.slug,
      product_title: draft.productTitle,
      customer_name: name.trim(),
      customer_email: email.trim(),
      customer_phone: phone.trim() || null,
      adults,
      children,
      infants,
      total_amount: total,
      currency: "EUR",
      status: "pending",
      selections: draft.selections,
    });
    setSaving(false);
    if (error) {
      setSubmitError(error.message);
      return;
    }
    setSubmitted(true);
  }

  if (!draft) {
    return (
      <div className="pts-container py-16 text-center">
        <h1 className="font-display mb-4 text-3xl font-semibold text-[#15399b]">
          Checkout
        </h1>
        <p className="mb-6 text-zinc-700">
          No booking in progress. Pick a date on a product page first.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-lg bg-[#15399b] px-5 py-2.5 text-white"
        >
          Back to home
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="pts-container py-16 text-center">
        <h1 className="font-display mb-4 text-3xl font-semibold text-[#15399b]">
          Request received
        </h1>
        <p className="mb-2 text-zinc-700">
          Thanks{name ? `, ${name}` : ""}. Payment integration is coming soon —
          we saved your selection for:
        </p>
        <p className="mb-2 font-semibold text-zinc-800">{draft.productTitle}</p>
        <p className="mb-6 text-sm text-zinc-600">
          {adults} adult{adults === 1 ? "" : "s"}
          {children > 0
            ? ` · ${children} child${children === 1 ? "" : "ren"}`
            : ""}
          {infants > 0
            ? ` · ${infants} infant${infants === 1 ? "" : "s"}`
            : ""}
        </p>
        <Link
          href={draft.productHref}
          className="inline-flex rounded-lg bg-[#2f7f6b] px-5 py-2.5 text-white"
          onClick={() => clearBookingDraft()}
        >
          Back to product
        </Link>
      </div>
    );
  }

  return (
    <div className="pts-container py-8 pb-16">
      <h1 className="font-display mb-2 text-3xl font-semibold text-[#15399b] md:text-4xl">
        Checkout
      </h1>
      <p className="mb-6 text-zinc-600">
        Review your visit details, choose tickets, then continue when you&apos;re
        ready.
      </p>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="space-y-6">
          <section className="rounded-[10px] border border-solid border-[#d0d0d0] p-5">
            <h2 className="font-display mb-4 text-xl font-semibold text-[#15399b]">
              Your visit
            </h2>
            <ul className="space-y-3">
              {draft.selections.map((sel) => (
                <li
                  key={`${sel.legId}-${sel.date}-${sel.time}`}
                  className="flex flex-wrap items-baseline justify-between gap-2 border-b border-solid border-[#eee] pb-3 last:border-0"
                >
                  <span className="font-semibold text-zinc-800">{sel.label}</span>
                  <span className="text-zinc-700">
                    {formatDisplayDate(sel.date)}
                    {sel.time ? ` · ${sel.time}` : ""}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[10px] border border-solid border-[#d0d0d0] p-5">
            <h2 className="font-display mb-1 text-xl font-semibold text-[#15399b]">
              Tickets
            </h2>
            <p className="mb-2 text-sm text-zinc-600">
              Select how many people are visiting. At least one adult is
              required.
            </p>
            <QuantityStepper
              label={TICKET_META.adult.label}
              ages={TICKET_META.adult.ages}
              value={adults}
              unitPrice={unitPriceFor(base, "adult")}
              formatPrice={formatPrice}
              onChange={setAdults}
              min={1}
            />
            <QuantityStepper
              label={TICKET_META.child.label}
              ages={TICKET_META.child.ages}
              value={children}
              unitPrice={unitPriceFor(base, "child")}
              formatPrice={formatPrice}
              onChange={setChildren}
            />
            <QuantityStepper
              label={TICKET_META.infant.label}
              ages={TICKET_META.infant.ages}
              value={infants}
              unitPrice={unitPriceFor(base, "infant")}
              formatPrice={formatPrice}
              onChange={setInfants}
            />
          </section>

          <section className="rounded-[10px] border border-solid border-[#d0d0d0] p-5">
            <h2 className="font-display mb-4 text-xl font-semibold text-[#15399b]">
              Contact details
            </h2>
            <p className="mb-4 text-sm text-zinc-600">
              We&apos;ll send your tickets and booking confirmation to this email.
            </p>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-semibold" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-solid border-[#d0d0d0] px-3 py-2"
                autoComplete="name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-semibold" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-solid border-[#d0d0d0] px-3 py-2"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold" htmlFor="phone">
                Phone{" "}
                <span className="font-normal text-zinc-500">(optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-solid border-[#d0d0d0] px-3 py-2"
                autoComplete="tel"
              />
            </div>
          </section>

          <section className="rounded-[10px] border border-solid border-[#d0d0d0] p-5">
            <h2 className="font-display mb-3 text-xl font-semibold text-[#15399b]">
              Before you continue
            </h2>
            <ul className="mb-4 space-y-2 text-sm text-zinc-700">
              <li>Free cancellation on most tickets (see product details).</li>
              <li>Mobile tickets delivered by email after payment.</li>
              <li>Instant confirmation once payment is completed.</li>
            </ul>
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-zinc-700">
              <input
                type="checkbox"
                checked={acceptTos}
                onChange={(e) => setAcceptTos(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-[#2f7f6b]"
              />
              <span>
                I have read and agree to the{" "}
                <Link
                  href="/terms-and-conditions"
                  className="font-semibold text-[#15399b] underline"
                  target="_blank"
                >
                  Terms &amp; Conditions
                </Link>
                ,{" "}
                <Link
                  href="/refund-policy"
                  className="font-semibold text-[#15399b] underline"
                  target="_blank"
                >
                  Refund Policy
                </Link>
                , and{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-[#15399b] underline"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </section>
        </div>

        <aside className="h-fit rounded-[10px] border border-solid border-[#d0d0d0] p-5 lg:sticky lg:top-28">
          {draft.image ? (
            <div className="relative mb-4 overflow-hidden rounded-lg pt-[56%]">
              <LazyFadeImage
                src={draft.image}
                alt=""
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : null}
          <h2 className="mb-3 text-lg font-semibold leading-snug text-zinc-800">
            {draft.productTitle}
          </h2>

          {typeof draft.originalPrice === "number" &&
          typeof draft.price === "number" &&
          draft.originalPrice > draft.price ? (
            <p className="mb-3 text-sm text-[#2f7f6b]">
              You save {formatPrice(draft.originalPrice - draft.price)} per adult
              vs list price.
            </p>
          ) : null}

          <div className="mb-3 space-y-2 border-t border-solid border-[#eee] pt-3 text-sm">
            {lines.length === 0 ? (
              <p className="text-zinc-500">Add at least one ticket.</p>
            ) : (
              lines.map((row) => (
                <div
                  key={row.type}
                  className="flex justify-between gap-3 text-zinc-700"
                >
                  <span>
                    {TICKET_META[row.type].label} × {row.qty}
                  </span>
                  <span className="tabular-nums">
                    {row.sub === 0 ? "Free" : formatPrice(row.sub)}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="mb-4 flex justify-between border-t border-solid border-[#eee] pt-3 text-base font-semibold">
            <span>Total · {ticketCount} ticket{ticketCount === 1 ? "" : "s"}</span>
            <span className="tabular-nums">{formatPrice(total)}</span>
          </div>

          <button
            type="button"
            disabled={!canPay || saving}
            onClick={() => void submitBooking()}
            className="pts-availability-btn inline-flex h-12 w-full items-center justify-center rounded-lg border border-solid border-[#2f7f6b] bg-[#2f7f6b] text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving…" : "Continue to payment"}
          </button>
          {submitError ? (
            <p className="mt-2 text-center text-xs text-red-600">{submitError}</p>
          ) : null}
          {!acceptTos ? (
            <p className="mt-2 text-center text-xs text-zinc-500">
              Accept the terms above to continue.
            </p>
          ) : null}
          <p className="mt-3 text-center text-xs text-zinc-500">
            Payment (Stripe / PayPal) coming soon — this step confirms your
            selection only.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-center text-sm">
            <Link
              href={draft.productHref}
              className="text-[#15399b] underline"
            >
              Edit dates
            </Link>
            <Link href="/refund-policy" className="text-zinc-500 underline">
              Cancellation &amp; refund info
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
