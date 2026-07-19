import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/requireAdminApi";
import {
  getStripeSettings,
  maskSecret,
  upsertStripeSettings,
} from "@/lib/stripe/settings";

export async function GET() {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const settings = await getStripeSettings();
  return NextResponse.json({
    publishableKey: settings.publishableKey,
    secretKeyMasked: maskSecret(settings.secretKey),
    hasSecretKey: Boolean(settings.secretKey),
    webhookSecretMasked: maskSecret(settings.webhookSecret),
    hasWebhookSecret: Boolean(settings.webhookSecret),
  });
}

export async function PUT(request: Request) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const body = (await request.json()) as {
    publishableKey?: string;
    secretKey?: string;
    webhookSecret?: string;
  };

  try {
    await upsertStripeSettings({
      publishableKey: body.publishableKey,
      secretKey: body.secretKey,
      webhookSecret: body.webhookSecret,
    });
    const settings = await getStripeSettings();
    return NextResponse.json({
      ok: true,
      publishableKey: settings.publishableKey,
      secretKeyMasked: maskSecret(settings.secretKey),
      hasSecretKey: Boolean(settings.secretKey),
      webhookSecretMasked: maskSecret(settings.webhookSecret),
      hasWebhookSecret: Boolean(settings.webhookSecret),
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Save failed" },
      { status: 500 },
    );
  }
}
