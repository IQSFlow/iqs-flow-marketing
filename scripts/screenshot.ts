import { chromium } from "playwright";

const BASE = "http://localhost:3001";
const rawRoute = process.argv[2] || "index";
// Normalize: "index" -> "/", "about" -> "/about"
const route = rawRoute === "index" ? "/" : `/${rawRoute.replace(/^\/+/, "")}`;
const label = process.argv[3] || "page";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });

  // Full-page screenshot
  const slug = route === "/" ? "homepage" : route.replace(/\//g, "-").replace(/^-/, "");
  await page.screenshot({
    path: `screenshots/${slug}-${label}.png`,
    fullPage: true,
  });

  await browser.close();
  console.log(`Screenshot saved: screenshots/${slug}-${label}.png`);
})();
