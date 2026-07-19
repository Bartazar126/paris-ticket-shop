import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/client";
import {
  getBookingBySessionId,
  markBookingPaidFromSession,
} from "@/lib/stripe/markBookingPaid";

export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "session_id required" }, { status: 400 });
  }

  try {
    const existing = await getBookingBySessionId(sessionId);
    if (existing?.status === "paid") {
      return NextResponse.json({ booking: existing, status: "paid" });
    }

    const stripe = await getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const booking =
        (await markBookingPaidFromSession(session)) ||
        (await getBookingBySessionId(sessionId));
      if (!booking) {
        return NextResponse.json(
          { error: "Booking not found for this session" },
          { status: 404 },
        );
      }
      return NextResponse.json({ booking, status: "paid" });
    }

    const booking =
      existing ||
      (session.metadata?.booking_id
        ? await getBookingBySessionId(sessionId)
        : null);

    return NextResponse.json({
      booking,
      status: session.payment_status || "unpaid",
    });
  } catch (e) {
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "Could not confirm payment",
      },
      { status: 500 },
    );
  }
}
