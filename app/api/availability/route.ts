import { NextResponse } from "next/server";
import { resolveAttractionId } from "@/data/attractions";
import { createClient } from "@/lib/supabase/server";

function isIsoDate(value: string | null): value is string {
  return Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawIds = searchParams.get("attractionIds") ?? "";
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const attractionIds = Array.from(
    new Set(
      rawIds
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map(resolveAttractionId),
    ),
  );

  if (!attractionIds.length) {
    return NextResponse.json({ closures: [] });
  }
  if (!isIsoDate(from) || !isIsoDate(to)) {
    return NextResponse.json(
      { error: "from and to required (YYYY-MM-DD)" },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pts_attraction_closures")
    .select("attraction_id, closed_date, closed_times, note")
    .in("attraction_id", attractionIds)
    .gte("closed_date", from)
    .lte("closed_date", to);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ closures: data ?? [] });
}
