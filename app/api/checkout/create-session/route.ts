import { NextResponse } from "next/server";
import type { BookingLegSelection } from "@/data/bookingLegs";
import { getStripe } from "@/lib/stripe/client";
import { createAdminClient } from "@/lib/supabase/admin";
import { validateSelectionsAgainstClosuresServer } from "@/lib/validateBookingSelectionsServer";

type Body = {
  productSlug?: string;
  productTitle?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string | null;
  adults?: number;
  children?: number;
  infants?: number;
  totalAmount?: number;
  currency?: string;
  selections?: BookingLegSelection[];
};

function siteOrigin(request: Request): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (env) return env;
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || "https";
  if (host) return `${proto}://${host}`;
  return "http://localhost:3000";
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const productSlug = body.productSlug?.trim();
  const productTitle = body.productTitle?.trim();
  const customerName = body.customerName?.trim();
  const customerEmail = body.customerEmail?.trim();
  const adults = Number(body.adults ?? 0);
  const children = Number(body.children ?? 0);
  const infants = Number(body.infants ?? 0);
  const totalAmount = Number(body.totalAmount ?? 0);
  const currency = (body.currency || "EUR").toLowerCase();
  const selections = Array.isArray(body.selections) ? body.selections : [];

  if (!productSlug || !productTitle || !customerName || !customerEmail) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!Number.isFinite(adults) || adults < 1) {
    return NextResponse.json({ error: "At least one adult is required" }, { status: 400 });
  }
  if (!selections.length) {
    return NextResponse.json({ error: "Missing visit selections" }, { status: 400 });
  }
  if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
    return NextResponse.json({ error: "Invalid total amount" }, { status: 400 });
  }

  const validation = await validateSelectionsAgainstClosuresServer(selections);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.message }, { status: 409 });
  }

  const supabase = createAdminClient();
  const { data: booking, error: insertError } = await supabase
    .from("pts_bookings")
    .insert({
      product_slug: productSlug,
      product_title: productTitle,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: body.customerPhone?.trim() || null,
      adults,
      children: Number.isFinite(children) ? children : 0,
      infants: Number.isFinite(infants) ? infants : 0,
      total_amount: totalAmount,
      currency: currency.toUpperCase(),
      status: "pending_payment",
      selections,
    })
    .select("id")
    .maybeSingle();

  if (insertError || !booking) {
    return NextResponse.json(
      { error: insertError?.message || "Could not create booking" },
      { status: 500 },
    );
  }

  const origin = siteOrigin(request);
  const ticketCount = adults + children + infants;
  const amountCents = Math.round(totalAmount * 100);

  try {
    const stripe = await getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            unit_amount: amountCents,
            product_data: {
              name: productTitle,
              description: `${ticketCount} ticket${ticketCount === 1 ? "" : "s"} · ${customerName}`,
            },
          },
        },
      ],
      metadata: {
        booking_id: booking.id,
        product_slug: productSlug,
      },
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?cancelled=1`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL");
    }

    const { error: updateError } = await supabase
      .from("pts_bookings")
      .update({ stripe_session_id: session.id })
      .eq("id", booking.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ url: session.url, bookingId: booking.id });
  } catch (e) {
    await supabase
      .from("pts_bookings")
      .update({ status: "failed" })
      .eq("id", booking.id);

    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "Could not start Stripe checkout",
      },
      { status: 500 },
    );
  }
}
