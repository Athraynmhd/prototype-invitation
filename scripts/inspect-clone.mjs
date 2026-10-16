import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000');
await page.evaluate(() => document.fonts.ready);
console.log(await page.evaluate(() => [...document.querySelectorAll('.couple-message,.guest-intro,.family-message,.medallion-inner,.medallion-rotation,.medallion-outer,.medallion-copy,.meet-flourish,.guest-grid,.event-copy,.hero-title,.watermark')].map(el => {
  const r = el.getBoundingClientRect(), s = getComputedStyle(el);
  return { class: el.className, x: r.x, y: r.y + scrollY, width: r.width, height: r.height, position: s.position, display: s.display, margin: s.margin, z: s.zIndex, font: s.fontFamily, opacity: s.opacity };
})));
await page.screenshot({ path: 'test-results/hero-desktop.png' });
await page.setViewportSize({ width: 390, height: 900 });
await page.screenshot({ path: 'test-results/hero-mobile.png' });
await browser.close();
