import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

async function requirePtsAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    } as const;
  }

  const { data: admin } = await supabase
    .from("pts_admins")
    .select("user_id, full_name")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .maybeSingle();

  if (!admin) {
    return {
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    } as const;
  }

  return { user, admin, supabase } as const;
}

export async function GET() {
  const gate = await requirePtsAdmin();
  if ("error" in gate) return gate.error;

  const adminClient = createAdminClient();
  const { data: admins, error } = await adminClient
    .from("pts_admins")
    .select("user_id, full_name, is_active, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: listed } = await adminClient.auth.admin.listUsers({
    perPage: 200,
  });
  const emailById = new Map(
    (listed?.users ?? []).map((u) => [u.id, u.email ?? ""]),
  );

  const users = (admins ?? []).map((row) => ({
    ...row,
    email: emailById.get(row.user_id) || "—",
  }));

  return NextResponse.json({ users });
}

export async function POST(request: Request) {
  const gate = await requirePtsAdmin();
  if ("error" in gate) return gate.error;

  const body = (await request.json()) as {
    email?: string;
    password?: string;
    fullName?: string;
  };

  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? "";
  const fullName = body.fullName?.trim() || "Admin";

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email és jelszó kötelező." },
      { status: 400 },
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "A jelszónak legalább 8 karakternek kell lennie." },
      { status: 400 },
    );
  }

  const adminClient = createAdminClient();
  const { data, error } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });

  if (error || !data.user) {
    return NextResponse.json(
      { error: error?.message || "Nem sikerült létrehozni a fiókot." },
      { status: 400 },
    );
  }

  const { error: upsertError } = await adminClient.from("pts_admins").upsert({
    user_id: data.user.id,
    full_name: fullName,
    is_active: true,
  });

  if (upsertError) {
    await adminClient.auth.admin.deleteUser(data.user.id);
    return NextResponse.json({ error: upsertError.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    user: {
      user_id: data.user.id,
      email,
      full_name: fullName,
      is_active: true,
    },
  });
}

export async function PATCH(request: Request) {
  const gate = await requirePtsAdmin();
  if ("error" in gate) return gate.error;

  const body = (await request.json()) as {
    userId?: string;
    isActive?: boolean;
  };

  if (!body.userId || typeof body.isActive !== "boolean") {
    return NextResponse.json({ error: "Érvénytelen kérés." }, { status: 400 });
  }

  if (body.userId === gate.user.id && body.isActive === false) {
    return NextResponse.json(
      { error: "Saját fiókot nem lehet deaktiválni." },
      { status: 400 },
    );
  }

  const adminClient = createAdminClient();
  const { error } = await adminClient
    .from("pts_admins")
    .update({ is_active: body.isActive })
    .eq("user_id", body.userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
