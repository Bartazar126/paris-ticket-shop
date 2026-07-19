import { config } from "dotenv";
import pg from "pg";

config({ path: ".env.local" });
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
await client.connect();
await client.query(`
  revoke all on table public.pts_admins from anon;
  revoke truncate, references, trigger on table public.pts_products from anon;
  revoke truncate, references, trigger on table public.pts_articles from anon;
  revoke truncate, references, trigger, select on table public.pts_bookings from anon;
  grant insert on table public.pts_bookings to anon;
`);
await client.end();
console.log("Anon grants tightened.");
