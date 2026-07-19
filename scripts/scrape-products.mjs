import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import http from "node:http";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PRODUCTS_TS = path.join(ROOT, "data", "products.ts");
const SCRAPED_DIR = path.join(ROOT, "data", "scraped");
const PUBLIC_DIR = path.join(ROOT, "public", "paristicketshop", "products");
const OUT_TS = path.join(ROOT, "data", "productDetails.ts");
const BASE = "https://paristicketshop.com";

const CATEGORY_PAGES = new Set([
  "top-attractionss",
  "versailles-palace",
  "the-eiffel-tower",
  "paris-river-cruises-combo-tickets",
  "louvre-tickets",
]);

const CATEGORY_PRIORITY = [
  "paris-river-cruises-combo-tickets",
  "the-eiffel-tower",
  "versailles-palace",
  "louvre-tickets",
  "top-attractionss",
];

const FEATURES = [
  "Free Cancellation",
  "Instant Confirm",
  "Mobile Ticket",
  "Flexible Hours",
  "Full Day Ticket",
];

function extractProductPaths(source) {
  const re = /href:\s*"(\/[^"?]+)"/g;
  const bySlug = new Map();
  let match;
  while ((match = re.exec(source)) !== null) {
    const href = match[1];
    const parts = href.split("/").filter(Boolean);
    if (parts.length !== 2) continue;
    const [category, slug] = parts;
    if (!CATEGORY_PAGES.has(category)) continue;
    if (!bySlug.has(slug)) bySlug.set(slug, []);
    bySlug.get(slug).push(category);
  }
  return bySlug;
}

function pickCanonical(categories) {
  for (const preferred of CATEGORY_PRIORITY) {
    if (categories.includes(preferred)) return preferred;
  }
  return categories[0];
}

function cleanText(text) {
  return text
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function splitBullets(block) {
  return block
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !/^buy your ticket now!?$/i.test(line));
}

function findSectionStart(text, startLabel) {
  const label = startLabel.toLowerCase();
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Prefer a heading on its own line (avoids "392 Reviews" in the hero)
  const lineRe = new RegExp(`(?:^|\\n)\\s*(${escaped})\\s*(?=\\n|$)`, "i");
  const lineMatch = lineRe.exec(text);
  if (lineMatch) {
    return lineMatch.index + lineMatch[0].indexOf(lineMatch[1]);
  }

  return text.toLowerCase().indexOf(label);
}

function sectionBetween(text, startLabel, endLabels) {
  const startIdx = findSectionStart(text, startLabel);
  if (startIdx === -1) return "";
  let contentStart = startIdx + startLabel.length;
  // skip optional colon/newline after label
  while (
    text[contentStart] === ":" ||
    text[contentStart] === "\n" ||
    text[contentStart] === " "
  ) {
    contentStart += 1;
  }
  let endIdx = text.length;
  for (const end of endLabels) {
    const idx = findSectionStart(text.slice(contentStart), end);
    if (idx !== -1) {
      const abs = contentStart + idx;
      if (abs < endIdx) endIdx = abs;
    }
  }
  return cleanText(text.slice(contentStart, endIdx));
}

function parseMainText(mainText) {
  const text = cleanText(mainText);
  const beforeOverview = text.split(/Overview:/i)[0] || "";

  let badge;
  if (/Triple Combo/i.test(beforeOverview)) {
    badge = { label: "Triple Combo", variant: "red" };
  } else if (/Highly Recommended/i.test(beforeOverview)) {
    badge = { label: "Highly Recommended", variant: "blue" };
  }

  const ratingMatch = beforeOverview.match(
    /(\d+(?:[.,]\d+)?)\s*\/\s*5\s+(\d+)\s*Reviews/i,
  );
  const rating = ratingMatch
    ? Number(ratingMatch[1].replace(",", "."))
    : undefined;
  const reviewCount = ratingMatch ? Number(ratingMatch[2]) : undefined;

  const features = FEATURES.filter((f) =>
    new RegExp(f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(
      beforeOverview,
    ),
  );

  const overviewBlock = sectionBetween(text, "Overview:", [
    "What's Included",
    "Informations",
    "Additional info",
    "Booking process",
    "Location",
    "Cancellation Policy",
    "Similar offers",
    "Reviews",
  ]);
  const overview = overviewBlock
    .split(/\n\n+/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter(Boolean);

  const whatsIncluded = splitBullets(
    sectionBetween(text, "What's Included", [
      "Buy your ticket now",
      "Informations",
      "Additional info",
      "Booking process",
      "Location",
      "Cancellation Policy",
      "Similar offers",
      "Reviews",
    ]),
  ).filter((line) => !/^buy your ticket now/i.test(line));

  const informations = splitBullets(
    sectionBetween(text, "Informations", [
      "Additional info",
      "Booking process",
      "Location",
      "Cancellation Policy",
      "Similar offers",
      "Reviews",
    ]),
  );

  const additionalInfo = splitBullets(
    sectionBetween(text, "Additional info", [
      "Booking process",
      "Location",
      "Cancellation Policy",
      "Similar offers",
      "Reviews",
    ]),
  );

  const bookingProcess = sectionBetween(text, "Booking process:", [
    "Location",
    "Cancellation Policy",
    "Similar offers",
    "Reviews",
  ]).replace(/\n+/g, "\n\n");

  const locationBlock = sectionBetween(text, "Location", [
    "Cancellation Policy",
    "Similar offers",
    "Reviews",
  ]);
  const locationLines = locationBlock
    .split("\n")
    .map((l) => l.trim())
    .filter(
      (l) =>
        l &&
        !/^open in google maps$/i.test(l) &&
        !/^[+\-−]+$/.test(l) &&
        !/^leaflet$/i.test(l) &&
        !/^-+$/.test(l),
    );
  const locationName = locationLines[0] || undefined;
  const location = {
    name: locationName,
    lines: locationLines.slice(locationName ? 1 : 0),
  };

  const cancellationPolicy = splitBullets(
    sectionBetween(text, "Cancellation Policy", [
      "Similar offers",
      "Reviews",
    ]),
  );

  const reviewsBlock = sectionBetween(text, "Reviews", []);
  const reviewSummaryMatch = reviewsBlock.match(
    /^(\d+(?:[.,]\d+)?)\s*(?:\n|\s)+(\d+)\s*reviews/im,
  );
  const stars = {};
  for (let i = 5; i >= 1; i -= 1) {
    const m = reviewsBlock.match(
      new RegExp(`${i}\\s*stars?\\s*(\\d+)`, "i"),
    );
    if (m) stars[i] = Number(m[1]);
  }
  const reviewSummary =
    reviewSummaryMatch || Object.keys(stars).length
      ? {
          rating: reviewSummaryMatch
            ? Number(reviewSummaryMatch[1].replace(",", "."))
            : rating,
          reviewCount: reviewSummaryMatch
            ? Number(reviewSummaryMatch[2])
            : reviewCount,
          stars,
        }
      : undefined;

  return {
    badge,
    rating,
    reviewCount,
    features,
    overview,
    whatsIncluded,
    informations,
    additionalInfo,
    bookingProcess,
    location,
    cancellationPolicy,
    reviewSummary,
  };
}

function preferFullImageUrl(url) {
  try {
    const u = new URL(url);
    u.pathname = u.pathname
      .replace(/\/list\//g, "/")
      .replace(/\/thumb\//g, "/")
      .replace(/_576x576(?=\.)/i, "")
      .replace(/_991x991(?=\.)/i, "");
    return u.toString();
  } catch {
    return url;
  }
}

function safeFilename(url, index) {
  try {
    const u = new URL(url);
    const base = path.basename(decodeURIComponent(u.pathname));
    const cleaned = base.replace(/[^a-zA-Z0-9._-]/g, "_");
    return cleaned || `image-${index}.webp`;
  } catch {
    return `image-${index}.webp`;
  }
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(dest);
    const req = client.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (
        res.statusCode &&
        res.statusCode >= 300 &&
        res.statusCode < 400 &&
        res.headers.location
      ) {
        file.close();
        fs.unlinkSync(dest);
        downloadFile(res.headers.location, dest).then(resolve, reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      res.pipe(file);
      file.on("finish", () => file.close(() => resolve()));
    });
    req.on("error", (err) => {
      file.close();
      try {
        fs.unlinkSync(dest);
      } catch {
        /* ignore */
      }
      reject(err);
    });
  });
}

async function downloadGallery(slug, remoteUrls) {
  const dir = path.join(PUBLIC_DIR, slug);
  fs.mkdirSync(dir, { recursive: true });
  const local = [];
  const seen = new Set();

  for (let i = 0; i < remoteUrls.length; i += 1) {
    const preferred = preferFullImageUrl(remoteUrls[i]);
    const candidates = [preferred, remoteUrls[i]].filter(
      (u, idx, arr) => arr.indexOf(u) === idx,
    );
    let saved = null;
    for (const url of candidates) {
      const name = safeFilename(url, i);
      if (seen.has(name)) continue;
      const dest = path.join(dir, name);
      try {
        await downloadFile(url, dest);
        seen.add(name);
        saved = `/paristicketshop/products/${slug}/${name}`;
        break;
      } catch {
        /* try next candidate */
      }
    }
    if (saved) local.push(saved);
  }
  return local;
}

function serializeTs(details) {
  const asTs = JSON.stringify(details, null, 2);

  return `import type { BadgeVariant, ProductFeature } from "./products";

export type ProductDetailLocation = {
  name?: string;
  lines: string[];
  mapsUrl?: string;
};

export type ProductDetailReviewSummary = {
  rating?: number;
  reviewCount?: number;
  stars: Partial<Record<"1" | "2" | "3" | "4" | "5", number>>;
};

export type ProductDetail = {
  slug: string;
  title: string;
  gallery: string[];
  overview: string[];
  whatsIncluded: string[];
  informations: string[];
  additionalInfo: string[];
  bookingProcess: string;
  location: ProductDetailLocation;
  cancellationPolicy: string[];
  badge?: { label: string; variant: BadgeVariant };
  rating?: number;
  reviewCount?: number;
  features: ProductFeature[];
  reviewSummary?: ProductDetailReviewSummary;
  canonicalPath: string;
  sourceUrl: string;
};

export const productDetailsBySlug = ${asTs} as Record<string, ProductDetail>;

export function getProductDetail(slug: string): ProductDetail | undefined {
  return productDetailsBySlug[slug];
}

export function listProductSlugs(): string[] {
  return Object.keys(productDetailsBySlug);
}
`;
}

async function scrapeOne(page, slug, category) {
  const sourceUrl = `${BASE}/${category}/${slug}`;
  console.log(`Scraping ${sourceUrl}`);
  await page.goto(sourceUrl, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(1500);

  const raw = await page.evaluate(() => {
    const title =
      document.querySelector("h1")?.textContent?.trim() ||
      document.title.replace(/^Paris Ticket Shop\s*\|\s*/i, "").trim();
    const main = document.querySelector("main") || document.body;
    const mainText = main.innerText || "";

    const imgEls = [
      ...document.querySelectorAll(
        "main img, [class*='gallery'] img, [class*='carousel'] img, [class*='slider'] img",
      ),
    ];
    const gallery = [];
    for (const img of imgEls) {
      const src =
        img.currentSrc ||
        img.getAttribute("src") ||
        img.getAttribute("data-src") ||
        "";
      if (!src) continue;
      if (!src.includes("/storage/")) continue;
      if (src.includes("social_icons")) continue;
      gallery.push(src.split("?")[0]);
    }

    const mapsA = [...document.querySelectorAll("a")].find((a) =>
      /open in google maps|google\.com\/maps|maps\.google/i.test(
        `${a.textContent} ${a.href}`,
      ),
    );
    const mapsUrl = mapsA?.href || undefined;

    return { title, mainText, gallery: [...new Set(gallery)], mapsUrl };
  });

  const parsed = parseMainText(raw.mainText);
  if (raw.mapsUrl) parsed.location.mapsUrl = raw.mapsUrl;

  const galleryLocal = await downloadGallery(slug, raw.gallery);

  const detail = {
    slug,
    title: raw.title,
    gallery: galleryLocal.length
      ? galleryLocal
      : [],
    overview: parsed.overview,
    whatsIncluded: parsed.whatsIncluded,
    informations: parsed.informations,
    additionalInfo: parsed.additionalInfo,
    bookingProcess: parsed.bookingProcess,
    location: parsed.location,
    cancellationPolicy: parsed.cancellationPolicy,
    badge: parsed.badge,
    rating: parsed.rating,
    reviewCount: parsed.reviewCount,
    features: parsed.features,
    reviewSummary: parsed.reviewSummary,
    canonicalPath: `/${category}/${slug}`,
    sourceUrl,
  };

  // If gallery empty, keep remote URLs as fallback (prefer full)
  if (!detail.gallery.length && raw.gallery.length) {
    detail.gallery = raw.gallery.map(preferFullImageUrl);
  }

  return detail;
}

const onlySlug = process.argv.includes("--only")
  ? process.argv[process.argv.indexOf("--only") + 1]
  : null;

fs.mkdirSync(SCRAPED_DIR, { recursive: true });
fs.mkdirSync(PUBLIC_DIR, { recursive: true });

const source = fs.readFileSync(PRODUCTS_TS, "utf8");
const bySlug = extractProductPaths(source);

const targets = [...bySlug.entries()]
  .map(([slug, categories]) => ({
    slug,
    category: pickCanonical(categories),
    categories,
  }))
  .filter((t) => (onlySlug ? t.slug === onlySlug : true))
  .sort((a, b) => a.slug.localeCompare(b.slug));

if (!targets.length) {
  console.error("No products to scrape");
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
});

const details = {};

// Load existing catalog if doing --only, so we don't wipe others
if (onlySlug && fs.existsSync(OUT_TS)) {
  try {
    const existingJsonFiles = fs.readdirSync(SCRAPED_DIR).filter((f) =>
      f.endsWith(".json"),
    );
    for (const file of existingJsonFiles) {
      const data = JSON.parse(
        fs.readFileSync(path.join(SCRAPED_DIR, file), "utf8"),
      );
      details[data.slug] = data;
    }
  } catch {
    /* ignore */
  }
}

for (const target of targets) {
  try {
    const detail = await scrapeOne(page, target.slug, target.category);
    details[detail.slug] = detail;
    fs.writeFileSync(
      path.join(SCRAPED_DIR, `${detail.slug}.json`),
      JSON.stringify(detail, null, 2),
    );
    console.log(
      `  OK: ${detail.title.slice(0, 60)} | gallery=${detail.gallery.length} overview=${detail.overview.length}`,
    );
  } catch (err) {
    console.error(`  FAIL ${target.slug}:`, err.message || err);
  }
}

await browser.close();

// If full run (or enough json), rebuild from scraped dir
const allFromDisk = {};
for (const file of fs.readdirSync(SCRAPED_DIR).filter((f) => f.endsWith(".json"))) {
  const data = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, file), "utf8"));
  allFromDisk[data.slug] = data;
}

const finalDetails = Object.keys(allFromDisk).length ? allFromDisk : details;
fs.writeFileSync(OUT_TS, serializeTs(finalDetails));
console.log(`Wrote ${Object.keys(finalDetails).length} products to ${OUT_TS}`);
