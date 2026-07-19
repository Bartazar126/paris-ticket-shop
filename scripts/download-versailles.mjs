import fs from "node:fs";
import path from "node:path";
import https from "node:https";

const OUT_HERO = "public/paristicketshop/hero";
const OUT_PRODUCTS = "public/paristicketshop/products";
fs.mkdirSync(OUT_HERO, { recursive: true });
fs.mkdirSync(OUT_PRODUCTS, { recursive: true });

const urls = [
  "https://paristicketshop.com/storage/dddd.webp",
  "https://paristicketshop.com/storage/thumb/dddd_991x991.webp",
  "https://paristicketshop.com/storage/list/versailles1_576x576.webp",
  "https://paristicketshop.com/storage/list/eiffelandversaillecastle_576x576.webp",
  "https://paristicketshop.com/storage/list/versailles3_576x.webp",
  "https://paristicketshop.com/storage/list/versailles-paris-4_576x576.webp",
  "https://paristicketshop.com/storage/list/seineversailles_576x576.webp",
  "https://paristicketshop.com/storage/list/versailles-paris-2_576x576.webp",
];

function download(url, dest) {
  return new Promise((resolve) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          download(res.headers.location, dest).then(resolve);
          return;
        }
        if (res.statusCode !== 200) {
          console.log("FAIL", res.statusCode, url);
          resolve(false);
          return;
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log("OK", dest, fs.statSync(dest).size);
          resolve(true);
        });
      })
      .on("error", (err) => {
        console.log("ERR", url, err.message);
        resolve(false);
      });
  });
}

for (const url of urls) {
  const name = path.basename(url);
  const isHero = url.includes("dddd");
  const dest = path.join(isHero ? OUT_HERO : OUT_PRODUCTS, name);
  await download(url, dest);
}
