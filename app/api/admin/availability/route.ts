import { NextResponse } from "next/server";
import { BASE_ATTRACTIONS, resolveAttractionId } from "@/data/attractions";
import { requireAdminApi } from "@/lib/admin/requireAdminApi";

const VALID_IDS = new Set(BASE_ATTRACTIONS.map((a) => a.id));

function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function normalizeClosedTimes(
  value: unknown,
): string[] | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (!Array.isArray(value)) return undefined;
  if (!value.every((t) => typeof t === "string")) return undefined;
  return value as string[];
}

function eachDateInclusive(from: string, to: string): string[] {
  const start = new Date(`${from}T12:00:00`);
  const end = new Date(`${to}T12:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return [];
  if (start > end) return [];
  const out: string[] = [];
  const cur = new Date(start);
  while (cur <= end) {
    const y = cur.getFullYear();
    const m = String(cur.getMonth() + 1).padStart(2, "0");
    const d = String(cur.getDate()).padStart(2, "0");
    out.push(`${y}-${m}-${d}`);
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}

export async function GET(request: Request) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const { searchParams } = new URL(request.url);
  const attractionIdRaw = searchParams.get("attractionId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!attractionIdRaw || !VALID_IDS.has(resolveAttractionId(attractionIdRaw))) {
    return NextResponse.json({ error: "Invalid attractionId" }, { status: 400 });
  }
  if (!isIsoDate(from) || !isIsoDate(to)) {
    return NextResponse.json({ error: "from and to required (YYYY-MM-DD)" }, { status: 400 });
  }

  const attractionId = resolveAttractionId(attractionIdRaw);
  const { data, error } = await auth.supabase
    .from("pts_attraction_closures")
    .select("id, attraction_id, closed_date, closed_times, note, created_at")
    .eq("attraction_id", attractionId)
    .gte("closed_date", from)
    .lte("closed_date", to)
    .order("closed_date");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ closures: data ?? [] });
}

export async function PUT(request: Request) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const body = (await request.json()) as {
    attractionId?: string;
    date?: string;
    closedTimes?: unknown;
    note?: string | null;
  };

  if (!body.attractionId || !VALID_IDS.has(resolveAttractionId(body.attractionId))) {
    return NextResponse.json({ error: "Invalid attractionId" }, { status: 400 });
  }
  if (!isIsoDate(body.date)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const closedTimes = normalizeClosedTimes(body.closedTimes);
  if (closedTimes === undefined && body.closedTimes !== undefined) {
    return NextResponse.json({ error: "Invalid closedTimes" }, { status: 400 });
  }

  const attractionId = resolveAttractionId(body.attractionId);
  const row = {
    attraction_id: attractionId,
    closed_date: body.date,
    closed_times: closedTimes === undefined ? null : closedTimes,
    note: typeof body.note === "string" ? body.note : body.note ?? null,
  };

  const { data, error } = await auth.supabase
    .from("pts_attraction_closures")
    .upsert(row, { onConflict: "attraction_id,closed_date" })
    .select("id, attraction_id, closed_date, closed_times, note, created_at")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ closure: data });
}

export async function DELETE(request: Request) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const body = (await request.json()) as {
    attractionId?: string;
    date?: string;
  };

  if (!body.attractionId || !VALID_IDS.has(resolveAttractionId(body.attractionId))) {
    return NextResponse.json({ error: "Invalid attractionId" }, { status: 400 });
  }
  if (!isIsoDate(body.date)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const attractionId = resolveAttractionId(body.attractionId);
  const { error } = await auth.supabase
    .from("pts_attraction_closures")
    .delete()
    .eq("attraction_id", attractionId)
    .eq("closed_date", body.date);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const body = (await request.json()) as {
    attractionId?: string;
    from?: string;
    to?: string;
    mode?: "close_days" | "open_days";
  };

  if (!body.attractionId || !VALID_IDS.has(resolveAttractionId(body.attractionId))) {
    return NextResponse.json({ error: "Invalid attractionId" }, { status: 400 });
  }
  if (!isIsoDate(body.from) || !isIsoDate(body.to)) {
    return NextResponse.json({ error: "from and to required" }, { status: 400 });
  }
  if (body.mode !== "close_days" && body.mode !== "open_days") {
    return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  }

  const attractionId = resolveAttractionId(body.attractionId);
  const dates = eachDateInclusive(body.from, body.to);
  if (!dates.length) {
    return NextResponse.json({ error: "Empty date range" }, { status: 400 });
  }
  if (dates.length > 93) {
    return NextResponse.json(
      { error: "Range too large (max 93 days)" },
      { status: 400 },
    );
  }

  if (body.mode === "open_days") {
    const { error } = await auth.supabase
      .from("pts_attraction_closures")
      .delete()
      .eq("attraction_id", attractionId)
      .in("closed_date", dates);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, count: dates.length, mode: body.mode });
  }

  const rows = dates.map((closed_date) => ({
    attraction_id: attractionId,
    closed_date,
    closed_times: null as string[] | null,
    note: null as string | null,
  }));

  const { error } = await auth.supabase
    .from("pts_attraction_closures")
    .upsert(rows, { onConflict: "attraction_id,closed_date" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, count: dates.length, mode: body.mode });
}
