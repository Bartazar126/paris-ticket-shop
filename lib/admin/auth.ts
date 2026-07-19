import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type AdminUser = {
  id: string;
  email: string | undefined;
  fullName: string;
};

export async function requireAdmin(): Promise<AdminUser> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: admin } = await supabase
    .from("pts_admins")
    .select("full_name, is_active")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!admin?.is_active) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=not_admin");
  }

  return {
    id: user.id,
    email: user.email,
    fullName: admin.full_name || user.email || "Admin",
  };
}
