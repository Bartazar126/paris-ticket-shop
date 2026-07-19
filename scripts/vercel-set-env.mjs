import { spawnSync } from "child_process";
import { config } from "dotenv";

config({ path: ".env.local" });

const keys = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  "STRIPE_SECRET_KEY",
];

for (const key of keys) {
  const value = process.env[key];
  if (!value) {
    console.error(`Missing ${key} in .env.local`);
    process.exit(1);
  }

  const sensitive = key.includes("SERVICE_ROLE") || key.includes("SECRET");
  const args = [
    "vercel",
    "env",
    "add",
    key,
    "production,preview,development",
    "--value",
    value,
    "--yes",
    "--force",
  ];
  if (sensitive) args.push("--sensitive");
  else args.push("--no-sensitive");

  const result = spawnSync("npx", args, {
    encoding: "utf8",
    shell: true,
  });

  if (result.status !== 0) {
    console.error(`Failed ${key}`);
    console.error(result.stdout);
    console.error(result.stderr);
    process.exit(result.status ?? 1);
  }
  console.log(`OK ${key}`);
}

console.log("All env vars set.");
