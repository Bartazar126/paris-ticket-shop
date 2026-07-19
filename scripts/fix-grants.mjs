import { config } from "dotenv";
import pg from "pg";

config({ path: ".env.local" });

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

await client.connect();

await client.query(`
  grant usage on schema public to postgres, anon, authenticated, service_role;

  grant all on table public.pts_admins to postgres, service_role;
  grant all on table public.pts_products to postgres, service_role;
  grant all on table public.pts_bookings to postgres, service_role;
  grant all on table public.pts_articles to postgres, service_role;

  grant select on table public.pts_products to anon, authenticated;
  grant select, insert on table public.pts_bookings to anon, authenticated;
  grant select, update, delete on table public.pts_bookings to authenticated;
  grant select on table public.pts_articles to anon, authenticated;
  grant select, insert, update, delete on table public.pts_products to authenticated;
  grant select, insert, update, delete on table public.pts_articles to authenticated;
  grant select, insert, update, delete on table public.pts_admins to authenticated;

  grant all on all sequences in schema public to postgres, anon, authenticated, service_role;

  notify pgrst, 'reload schema';
`);

const grants = await client.query(`
  select grantee, table_name, privilege_type
  from information_schema.role_table_grants
  where table_schema = 'public'
    and table_name like 'pts_%'
    and grantee in ('anon','authenticated','service_role')
  order by table_name, grantee, privilege_type
`);
console.log(grants.rows);
await client.end();
console.log("Grants fixed.");
