import type Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export type PaidBookingSummary = {
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
  selections: unknown;
  paid_at: string | null;
  stripe_session_id: string | null;
};

export async function markBookingPaidFromSession(
  session: Stripe.Checkout.Session,
): Promise<PaidBookingSummary | null> {
  const bookingId = session.metadata?.booking_id;
  if (!bookingId) return null;

  const paymentIntent =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? null;

  const supabase = createAdminClient();
  const paidAt = new Date().toISOString();

  const { data, error } = await supabase
    .from("pts_bookings")
    .update({
      status: "paid",
      paid_at: paidAt,
      stripe_session_id: session.id,
      stripe_payment_intent: paymentIntent,
    })
    .eq("id", bookingId)
    .select(
      "id, product_title, customer_name, customer_email, adults, children, infants, total_amount, currency, status, selections, paid_at, stripe_session_id",
    )
    .maybeSingle();

  if (error || !data) return null;
  return data as PaidBookingSummary;
}

export async function getBookingBySessionId(
  sessionId: string,
): Promise<PaidBookingSummary | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("pts_bookings")
    .select(
      "id, product_title, customer_name, customer_email, adults, children, infants, total_amount, currency, status, selections, paid_at, stripe_session_id",
    )
    .eq("stripe_session_id", sessionId)
    .maybeSingle();
  return (data as PaidBookingSummary | null) ?? null;
}
