// Batch-render every step of a presentation to PNG using Playwright.
// Usage: node scripts/render-frames.mjs --manifest steps.json --out ../screenshots --key <storageKey> [--url http://localhost:5173/] [--wait 8500]
// manifest: [{ "id": "01-coldopen", "steps": 4 }, ...] — array order = chapter order.
import { chromium } from "playwright";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const argv = process.argv.slice(2);
const arg = (name, def) => {
  const i = argv.indexOf("--" + name);
  return i >= 0 ? argv[i + 1] : def;
};
const here = dirname(fileURLToPath(import.meta.url));

const manifestPath = arg("manifest");
if (!manifestPath) { console.error("need --manifest"); process.exit(1); }
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const url = arg("url", "http://localhost:5173/");
const key = arg("key");
const waitMs = Number(arg("wait", "8500"));
const outDir = arg("out", join(here, "..", "screenshots"));

const jobs = [];
manifest.forEach((ch, idx) => {
  const chapterIndex = ch.idx ?? idx; // explicit idx overrides positional
  for (let s = 0; s < ch.steps; s++) jobs.push({ id: ch.id, idx: chapterIndex, step: s });
});

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(url, { waitUntil: "domcontentloaded" });

const t0 = Date.now();
for (const job of jobs) {
  if (key) {
    await page.evaluate(
      ({ k, idx, s }) =>
        localStorage.setItem(k, JSON.stringify({ chapter: idx, step: s })),
      { k: key, idx: job.idx, s: job.step },
    );
  }
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(waitMs);
  const dir = join(outDir, job.id);
  mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: join(dir, `${job.step + 1}.png`) });
  console.log(`shot ${job.id}/${job.step + 1} (${Math.round((Date.now() - t0) / 1000)}s)`);
}
await browser.close();
writeFileSync(join(outDir, "render-manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`DONE ${jobs.length} frames in ${Math.round((Date.now() - t0) / 1000)}s`);
