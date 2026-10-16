import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
await mkdir('reference', { recursive: true });
for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  await page.goto('https://www.missingpieceinvites.com/demos/mountain', { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(5000);
  const details = await page.evaluate(() => {
    const box = (el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height), font: s.fontFamily, size: s.fontSize, line: s.lineHeight, color: s.color, position: s.position, fit: s.objectFit, objectPosition: s.objectPosition };
    };
    return {
      height: document.documentElement.scrollHeight,
      sections: [...document.querySelectorAll('[data-framer-name]')].filter(el => el.getBoundingClientRect().width > 0).map(el => ({ name: el.getAttribute('data-framer-name'), class: el.className, ...box(el) })),
      text: [...document.querySelectorAll('p,h1,h2,h3')].filter(el => el.getBoundingClientRect().width > 0).map(el => ({ text: el.textContent, ...box(el) })),
      links: [...document.querySelectorAll('a')].filter(el => el.getBoundingClientRect().width > 0).map(el => ({ text: el.textContent, href: el.href, ...box(el) })),
      images: [...document.querySelectorAll('img')].filter(el => el.getBoundingClientRect().width > 0).map(el => ({ src: el.src, parent: el.parentElement?.getAttribute('data-framer-name'), ...box(el) })),
    };
  });
  await writeFile(`reference/layout-${width}.json`, JSON.stringify(details, null, 2));
  for (let top = 0; top < details.height; top += 800) {
    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), top);
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `reference/full-loaded-${width}.jpg`, fullPage: true, quality: 75 });
  console.log(`Reference ${width}px: ${details.height}px tall; ${details.text.length} text elements; ${details.images.length} images`);
  await page.close();
}
await browser.close();
