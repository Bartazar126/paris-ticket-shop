import { config } from "dotenv";
import pg from "pg";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

await client.connect();
const tables = await client.query(
  `select table_name from information_schema.tables where table_schema='public' and table_name like 'pts_%' order by 1`,
);
console.log(
  "tables:",
  tables.rows.map((r) => r.table_name),
);

const email = process.env.ADMIN_EMAIL;
const fullName = process.env.ADMIN_NAME || "Admin";

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } },
);

const { data: listed } = await sb.auth.admin.listUsers({ perPage: 200 });
const user = listed?.users?.find(
  (u) => u.email?.toLowerCase() === email.toLowerCase(),
);
if (!user) {
  console.error("Auth user missing — run npm run admin:create first");
  process.exit(1);
}

await client.query(
  `insert into public.pts_admins (user_id, full_name, is_active)
   values ($1, $2, true)
   on conflict (user_id) do update set full_name = excluded.full_name, is_active = true`,
  [user.id, fullName],
);
console.log("Admin row inserted via SQL for", email);

await client.query(`notify pgrst, 'reload schema'`);
await client.end();

await new Promise((r) => setTimeout(r, 2500));

const { data, error } = await sb.from("pts_admins").select("user_id, full_name").limit(5);
console.log("REST pts_admins:", { data, error: error?.message });

const { data: arts, error: artsErr } = await sb
  .from("pts_articles")
  .select("slug")
  .limit(3);
console.log("REST pts_articles:", { data: arts, error: artsErr?.message });
