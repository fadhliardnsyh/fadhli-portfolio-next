const pwPath = "C:\Users\Fadhli\AppData\Local\npm-cache\_npx\e41f203b7505f1fb\node_modules\playwright";
const { chromium } = require(pwPath);
(async () => {
  const browser = await chromium.launch();
  for (const [name, w, h] of [["tablet", 768, 1024], ["mobile", 390, 844]]) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: w, height: h });
    await page.goto("http://localhost:3000/projects/fixwork", { waitUntil: "networkidle" });
    await page.evaluate(() => {
      document.querySelectorAll("[class*='preloader'],[class*='Preloader']").forEach(el => el.style.display = "none");
      document.querySelectorAll("[class*='reveal']").forEach(el => { el.style.opacity="1"; el.style.transform="none"; el.classList.add("visible"); });
    });
    await page.waitForTimeout(800);
    await page.evaluate(() => {
      const v2 = document.querySelector("[class*='v2Section']");
      v2?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: "e:\fadhli-portfolio-next\ss-" + name + ".png" });
    await page.close();
  }
  await browser.close();
  console.log("done");
})().catch(e => { console.error(e.message); process.exit(1); });
