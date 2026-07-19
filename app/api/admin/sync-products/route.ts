import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAllProducts } from "@/data/productCatalog";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: admin } = await supabase
    .from("pts_admins")
    .select("user_id")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .maybeSingle();

  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const bySlug = new Map<
    string,
    {
      slug: string;
      title: string;
      category: string | null;
      price: number | null;
      original_price: number | null;
      image_url: string | null;
      is_active: boolean;
      updated_at: string;
    }
  >();

  for (const product of getAllProducts()) {
    const parts = product.href.split("/").filter(Boolean);
    const slug = parts[1];
    const category = parts[0] ?? null;
    if (!slug || bySlug.has(slug)) continue;
    bySlug.set(slug, {
      slug,
      title: product.title,
      category,
      price: typeof product.price === "number" ? product.price : null,
      original_price:
        typeof product.originalPrice === "number" ? product.originalPrice : null,
      image_url: product.image || null,
      is_active: true,
      updated_at: new Date().toISOString(),
    });
  }

  const rows = Array.from(bySlug.values());
  const { error } = await supabase.from("pts_products").upsert(rows, {
    onConflict: "slug",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, count: rows.length });
}
