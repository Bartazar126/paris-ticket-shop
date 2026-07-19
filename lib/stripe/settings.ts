import { createAdminClient } from "@/lib/supabase/admin";

export const STRIPE_SETTING_KEYS = {
  publishable: "stripe_publishable_key",
  secret: "stripe_secret_key",
  webhook: "stripe_webhook_secret",
} as const;

export type StripeSettings = {
  publishableKey: string;
  secretKey: string;
  webhookSecret: string;
};

export function maskSecret(value: string): string {
  if (!value) return "";
  if (value.length <= 8) return "••••";
  return `${value.slice(0, 7)}…${value.slice(-4)}`;
}

export async function getStripeSettings(): Promise<StripeSettings> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("pts_settings")
    .select("key, value")
    .in("key", Object.values(STRIPE_SETTING_KEYS));

  const map = new Map((data ?? []).map((row) => [row.key, row.value ?? ""]));

  return {
    publishableKey:
      map.get(STRIPE_SETTING_KEYS.publishable) ||
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
      "",
    secretKey:
      map.get(STRIPE_SETTING_KEYS.secret) ||
      process.env.STRIPE_SECRET_KEY ||
      "",
    webhookSecret:
      map.get(STRIPE_SETTING_KEYS.webhook) ||
      process.env.STRIPE_WEBHOOK_SECRET ||
      "",
  };
}

export async function upsertStripeSettings(input: {
  publishableKey?: string;
  secretKey?: string;
  webhookSecret?: string;
}): Promise<void> {
  const supabase = createAdminClient();
  const rows: { key: string; value: string; updated_at: string }[] = [];
  const now = new Date().toISOString();

  if (typeof input.publishableKey === "string") {
    rows.push({
      key: STRIPE_SETTING_KEYS.publishable,
      value: input.publishableKey.trim(),
      updated_at: now,
    });
  }
  if (typeof input.secretKey === "string" && input.secretKey.trim()) {
    rows.push({
      key: STRIPE_SETTING_KEYS.secret,
      value: input.secretKey.trim(),
      updated_at: now,
    });
  }
  if (typeof input.webhookSecret === "string" && input.webhookSecret.trim()) {
    rows.push({
      key: STRIPE_SETTING_KEYS.webhook,
      value: input.webhookSecret.trim(),
      updated_at: now,
    });
  }

  if (!rows.length) return;

  const { error } = await supabase.from("pts_settings").upsert(rows, {
    onConflict: "key",
  });
  if (error) throw new Error(error.message);
}
