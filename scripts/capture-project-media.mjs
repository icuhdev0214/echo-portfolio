// Run this on your own machine (not in the sandboxed session) to capture a
// hero screenshot, a mid-scroll screenshot, and a raw screen-recording
// walkthrough of each live project site.
//
// Usage:
//   npm install -D playwright
//   node scripts/capture-project-media.mjs
//
// Uses your locally installed Google Chrome (channel: "chrome") instead of
// downloading Playwright's own bundled Chromium — needed on macOS versions
// Playwright's latest Chromium build no longer supports. Make sure Chrome is
// installed at the usual /Applications location.
//
// Output lands in ./media/<project>/ — a couple of PNGs plus a .webm
// recording per site. Upload the PNGs into the project's "Screenshots"
// field in Sanity Studio. For the video, upload the .webm to somewhere
// that gives you a shareable link (YouTube unlisted, Vimeo, Loom), then
// paste that link into the project's "Video / screen recording URL" field.

import { chromium } from "playwright";
import path from "node:path";

const OUT = new URL("../media", import.meta.url).pathname;

const sites = [
  { name: "itsourstudio", url: "https://itsourstudio.net" },
  { name: "echotifeed", url: "https://main.d1rmwnn6dyfd67.amplifyapp.com/" },
];

const browser = await chromium.launch({ channel: "chrome" });

for (const site of sites) {
  const dir = path.join(OUT, site.name);
  console.log(`\n=== ${site.name} (${site.url}) ===`);
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir, size: { width: 1440, height: 900 } },
  });
  const page = await context.newPage();
  try {
    await page.goto(site.url, { waitUntil: "load", timeout: 30000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(dir, `${site.name}-hero.png`) });
    console.log("captured hero screenshot");

    const height = await page.evaluate(() => document.body.scrollHeight);
    const steps = Math.min(6, Math.max(2, Math.round(height / 900)));
    for (let i = 1; i <= steps; i++) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: "smooth" }), (height / steps) * i);
      await page.waitForTimeout(1000);
      if (i === Math.ceil(steps / 2)) {
        await page.screenshot({ path: path.join(dir, `${site.name}-mid.png`) });
        console.log("captured mid-scroll screenshot");
      }
    }
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await page.waitForTimeout(1000);
  } catch (err) {
    console.error(`FAILED for ${site.name}:`, err.message);
  } finally {
    await context.close();
    const video = await page.video();
    if (video) console.log("video saved at", await video.path());
  }
}

await browser.close();
console.log("\ndone");
