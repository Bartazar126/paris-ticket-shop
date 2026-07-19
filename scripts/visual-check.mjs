import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("scripts/screenshots");
fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: "1920x1080", width: 1920, height: 1080 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "390x844", width: 390, height: 844 },
];

const browser = await chromium.launch();
const results = [];

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(String(err)));

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const metrics = await page.evaluate(() => {
    const doc = document.documentElement;
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      hasHorizontalOverflow: doc.scrollWidth > doc.clientWidth + 1,
      title: document.title,
      h1: document.querySelector("h1")?.textContent?.trim(),
      productCards: document.querySelectorAll("article").length,
      stickyHeader: !!document.querySelector(".sticky"),
    };
  });

  const file = path.join(outDir, `${vp.name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  results.push({ viewport: vp.name, ...metrics, consoleErrors, screenshot: file });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
