import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import pg from "pg";

config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
const fullName = process.env.ADMIN_NAME || "Admin";

if (!url || !serviceKey || !email || !password) {
  console.error("Missing env: URL, SERVICE_ROLE, ADMIN_EMAIL, ADMIN_PASSWORD");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data: listed } = await supabase.auth.admin.listUsers({ perPage: 200 });
let user = listed?.users?.find(
  (u) => u.email?.toLowerCase() === email.toLowerCase(),
);

if (!user) {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });
  if (error) {
    console.error("createUser failed:", error.message);
    process.exit(1);
  }
  user = data.user;
  console.log("Created auth user:", email);
} else {
  console.log("Auth user already exists:", email);
}

const { error: upsertError } = await supabase.from("pts_admins").upsert({
  user_id: user.id,
  full_name: fullName,
  is_active: true,
});

if (upsertError) {
  console.warn("REST upsert failed, falling back to SQL:", upsertError.message);
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  await client.query(
    `insert into public.pts_admins (user_id, full_name, is_active)
     values ($1, $2, true)
     on conflict (user_id) do update
       set full_name = excluded.full_name, is_active = true`,
    [user.id, fullName],
  );
  await client.end();
}

console.log("Admin ready.");
console.log(`  Email: ${email}`);
console.log("  Login: /admin/login");
