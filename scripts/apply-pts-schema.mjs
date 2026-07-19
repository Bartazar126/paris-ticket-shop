import { readFileSync } from "fs";
import { config } from "dotenv";
import pg from "pg";

config({ path: ".env.local" });

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://postgres:${encodeURIComponent(
    process.env.DB_PASSWORD || "",
  )}@db.${new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname.split(".")[0]}.supabase.co:5432/postgres`;

const sql = readFileSync(new URL("./pts-schema.sql", import.meta.url), "utf8");

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

await client.connect();
try {
  await client.query(sql);
  console.log("Schema applied to", connectionString.replace(/:[^:@]+@/, ":****@"));
} finally {
  await client.end();
}
