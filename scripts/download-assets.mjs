import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import http from "node:http";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const REF = path.join(ROOT, "Beillesztve text.txt-be");
const OUT = path.join(ROOT, "public", "paristicketshop");

const CATEGORY_RULES = [
  { test: /\/flags\//i, dir: "flags" },
  { test: /shutterstock-705219370/i, dir: "hero" },
  { test: /\/list\//i, dir: "products" },
  { test: /\/editor\//i, dir: "miscellaneous" },
  { test: /\/brand/i, dir: "branding" },
  { test: /\.(svg|png|jpe?g|webp|gif|ico)$/i, dir: "icons" },
];

function categorize(url) {
  for (const rule of CATEGORY_RULES) {
    if (rule.test.test(url)) return rule.dir;
  }
  return "miscellaneous";
}

function cleanUrl(raw) {
  return raw
    .replace(/&quot;/g, "")
    .replace(/&amp;/g, "&")
    .replace(/["')\s]+$/g, "")
    .trim();
}

function safeFilename(url) {
  const u = new URL(url);
  const base = path.basename(u.pathname);
  return base.replace(/[^a-zA-Z0-9._-]/g, "_") || "asset.bin";
}

function extractUrls(html) {
  const found = new Set();
  const patterns = [
    /https:\/\/paristicketshop\.com\/storage\/[^"'\\\s)]+/gi,
    /url\((?:&quot;|\\?["'])?(https:\/\/paristicketshop\.com\/[^"'\\\s)]+)(?:&quot;|\\?["'])?\)/gi,
    /srcset=["'](https:\/\/paristicketshop\.com\/[^"']+)["']/gi,
    /src=["'](https:\/\/paristicketshop\.com\/storage\/[^"']+)["']/gi,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const url = cleanUrl(match[1] || match[0]);
      if (url.includes("/storage/")) found.add(url);
    }
  }

  // Prefer full-size hero over thumbs
  const preferred = new Set();
  for (const url of found) {
    preferred.add(url);
    // Also queue higher-quality product variants when list/thumb paths exist
    if (url.includes("/storage/list/")) {
      const name = path.basename(url).replace(/_576x576|_991x991/g, "");
      preferred.add(`https://paristicketshop.com/storage/${name}`);
      preferred.add(`https://paristicketshop.com/storage/list/${name}`);
    }
  }
  return [...preferred];
}

function download(url, dest) {
  return new Promise((resolve) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Accept: "image/webp,image/*,*/*",
        },
      },
      (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          const next = new URL(res.headers.location, url).toString();
          download(next, dest).then(resolve);
          return;
        }
        if (res.statusCode !== 200) {
          resolve({ ok: false, url, status: res.statusCode });
          return;
        }
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        const stream = fs.createWriteStream(dest);
        res.pipe(stream);
        stream.on("finish", () =>
          resolve({ ok: true, url, dest, bytes: fs.statSync(dest).size }),
        );
        stream.on("error", (err) =>
          resolve({ ok: false, url, error: err.message }),
        );
      },
    );
    req.on("error", (err) => resolve({ ok: false, url, error: err.message }));
    req.setTimeout(30000, () => {
      req.destroy();
      resolve({ ok: false, url, error: "timeout" });
    });
  });
}

async function main() {
  const html = fs.readFileSync(REF, "utf8");
  const urls = extractUrls(html);
  console.log(`Found ${urls.length} candidate asset URLs`);

  const results = [];
  const usedNames = new Map();

  for (const url of urls) {
    const dir = categorize(url);
    let name = safeFilename(url);
    const key = `${dir}/${name}`;
    if (usedNames.has(key) && usedNames.get(key) !== url) {
      const ext = path.extname(name);
      const stem = path.basename(name, ext);
      name = `${stem}_${Buffer.from(url).toString("base64url").slice(0, 8)}${ext}`;
    }
    usedNames.set(`${dir}/${name}`, url);
    const dest = path.join(OUT, dir, name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      console.log(`SKIP (exists): ${dir}/${name}`);
      results.push({ ok: true, url, dest, skipped: true });
      continue;
    }
    const result = await download(url, dest);
    results.push(result);
    if (result.ok) {
      console.log(`OK: ${url} -> ${path.relative(ROOT, dest)} (${result.bytes} bytes)`);
    } else {
      console.log(`FAIL: ${url} (${result.status || result.error})`);
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
    }
  }

  const ok = results.filter((r) => r.ok);
  const fail = results.filter((r) => !r.ok);
  console.log(`\nDownloaded/kept: ${ok.length}`);
  console.log(`Failed: ${fail.length}`);
  if (fail.length) {
    for (const f of fail) console.log(`  - ${f.url}: ${f.status || f.error}`);
  }

  // Write a mapping of cleaned reference URLs to local paths for the required assets
  const required = [
    "https://paristicketshop.com/storage/editor/shutterstock-705219370.webp",
    "https://paristicketshop.com/storage/flags/thumb/united-kingdom_991x991.webp",
    "https://paristicketshop.com/storage/list/untitled-1-recovered3_576x576.webp",
    "https://paristicketshop.com/storage/list/paris-seine-river-cruise_576x576.webp",
    "https://paristicketshop.com/storage/list/eiffelandseineboat-991x991_576x576.webp",
    "https://paristicketshop.com/storage/list/boattourandlouvre-991x991_576x576.webp",
    "https://paristicketshop.com/storage/list/ec5i3hc_576x576.webp",
    "https://paristicketshop.com/storage/list/versailleslouvre_576x576.webp",
  ];

  const map = {};
  for (const url of required) {
    const dir = categorize(url);
    const name = safeFilename(url);
    const dest = path.join(OUT, dir, name);
    map[url] = fs.existsSync(dest)
      ? `/paristicketshop/${dir}/${name}`
      : null;
  }
  fs.writeFileSync(
    path.join(OUT, "asset-map.json"),
    JSON.stringify(map, null, 2),
  );
  console.log("Wrote public/paristicketshop/asset-map.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
