import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
for (const [url, width] of [['https://www.missingpieceinvites.com/demos/mountain', 1440], ['https://www.missingpieceinvites.com/demos/mountain', 390], ['http://localhost:3000', 1440]]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3500);
  const result = await page.evaluate(() => [...document.querySelectorAll('img')].filter(img => img.getBoundingClientRect().width > 0).map(el => {
    const r = el.getBoundingClientRect(), s = getComputedStyle(el);
    return { src: el.src.split('/').pop().split('?')[0], x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), fit: s.objectFit, objectPosition: s.objectPosition, z: s.zIndex, transform: s.transform, parentTransform: getComputedStyle(el.parentElement).transform };
  }).filter(el => /mkfwc|psGzWz|nANJU|f7Vmk|balloon|yNeMJ|LQC5|liVQA|gpuyLK|Aof0|gdmN|ZcRh/.test(el.src)));
  console.log(url, width, result);
  if (url.includes('localhost')) {
    await page.evaluate(() => window.scrollTo({ top: 9992, behavior: 'instant' }));
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'test-results/footer-desktop.png' });
  }
  await page.close();
}
await browser.close();
