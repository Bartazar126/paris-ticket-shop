import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe/client";
import { getStripeSettings } from "@/lib/stripe/settings";
import { markBookingPaidFromSession } from "@/lib/stripe/markBookingPaid";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { webhookSecret } = await getStripeSettings();
  if (!webhookSecret) {
    return NextResponse.json(
      {
        error:
          "Stripe webhook secret is not configured yet. Use thank-you confirm for now.",
      },
      { status: 501 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const payload = await request.text();
  const stripe = await getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (e) {
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "Invalid webhook signature",
      },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status === "paid") {
      await markBookingPaidFromSession(session);
    }
  }

  return NextResponse.json({ received: true });
}
