import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const productsTs = fs.readFileSync(path.join(ROOT, "data", "products.ts"), "utf8");
const detailsTs = fs.readFileSync(path.join(ROOT, "data", "productDetails.ts"), "utf8");

const hrefs = [...productsTs.matchAll(/href:\s*"(\/[^"?]+)"/g)].map((m) => m[1]);
const cardHrefs = hrefs.filter((h) => h.split("/").filter(Boolean).length === 2);
const slugs = new Set(
  [...detailsTs.matchAll(/"slug":\s*"([^"]+)"/g)].map((m) => m[1]),
);

const missing = cardHrefs.filter((h) => {
  const slug = h.split("/").filter(Boolean)[1];
  return !slugs.has(slug);
});

console.log(
  JSON.stringify(
    {
      uniqueSlugs: slugs.size,
      productCardLinks: cardHrefs.length,
      uniqueCardLinks: new Set(cardHrefs).size,
      missingDetailForCards: missing,
    },
    null,
    2,
  ),
);
