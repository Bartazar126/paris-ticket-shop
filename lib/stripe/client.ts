import Stripe from "stripe";
import { getStripeSettings } from "@/lib/stripe/settings";

export async function getStripe(): Promise<Stripe> {
  const { secretKey } = await getStripeSettings();
  if (!secretKey) {
    throw new Error("Stripe secret key is not configured");
  }
  return new Stripe(secretKey);
}
