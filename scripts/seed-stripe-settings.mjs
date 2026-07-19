/**
 * Seeds Stripe keys into pts_settings from env (never hardcode secrets here).
 * Usage: node scripts/seed-stripe-settings.mjs
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const pk =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
  process.env.STRIPE_PUBLISHABLE_KEY;
const sk = process.env.STRIPE_SECRET_KEY;
const wh = process.env.STRIPE_WEBHOOK_SECRET || "";

if (!url || !serviceKey) {
  console.error("Missing Supabase admin env");
  process.exit(1);
}
if (!pk || !sk) {
  console.error("Missing STRIPE keys in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const now = new Date().toISOString();
const rows = [
  { key: "stripe_publishable_key", value: pk, updated_at: now },
  { key: "stripe_secret_key", value: sk, updated_at: now },
  { key: "stripe_webhook_secret", value: wh, updated_at: now },
];

const { error } = await supabase.from("pts_settings").upsert(rows, {
  onConflict: "key",
});

if (error) {
  console.error(error.message);
  process.exit(1);
}

console.log("Stripe settings seeded into pts_settings");
