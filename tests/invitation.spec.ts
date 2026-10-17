import { expect, test, type Page } from '@playwright/test';

const invitationIllustrations = [
  { selector: '.invitation-ganesha', from: 'top' },
  { selector: '.invitation-moon', from: 'left' },
  { selector: '.invitation-balloon', from: 'right' },
  { selector: '.invitation-palace', from: 'right' },
] as const;

async function scrollThroughInvitation(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let top = 0; top < height; top += 900) {
    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), top);
    await page.waitForTimeout(80);
  }
}

async function inspectContent(page: Page, requireRevealed = true) {
  return page.locator('main').evaluate((main, requireRevealed) => {
    const missing: string[] = [];
    const hidden: string[] = [];
    for (const element of main.querySelectorAll<HTMLElement>('p, h1, h2, h3, h4, h5, h6, img')) {
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height || rect.right <= 0 || rect.left >= innerWidth) continue;
      // Hero characters have their own entrance; inactive carousel slides are intentionally hidden.
      if (element.closest('.hero-title') || element.matches('.gallery-photo:not(.is-active)')) continue;
      const label = `${element.tagName.toLowerCase()}.${element.className}: ${(element.textContent || element.getAttribute('src') || '').trim().slice(0, 100)}`;
      const reveal = element.closest<HTMLElement>('[data-reveal]');
      if (!reveal) missing.push(label);
      let invisible = Boolean(requireRevealed && reveal && reveal.dataset.revealed !== 'true');
      if (reveal) {
        const translate = getComputedStyle(reveal).translate;
        if (translate !== 'none' && !translate.split(/\s+/).every(value => parseFloat(value) === 0)) invisible = true;
      }
      for (let ancestor: HTMLElement | null = element; ancestor; ancestor = ancestor.parentElement) {
        const style = getComputedStyle(ancestor);
        if (Number(style.opacity) < 0.99 || style.visibility !== 'visible') invisible = true;
      }
      if (invisible) hidden.push(label);
    }
    return { missing, hidden };
  }, requireRevealed);
}

for (const width of [320, 390, 768, 1024, 1440, 1920]) {
  test(`invitation renders without overflow or errors at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('Ichsan & Ulfa');
    await expect(page.locator('.event-card')).toHaveCount(6);
    await expect(page.locator('.guest-detail')).toHaveCount(4);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.getByRole('button', { name: 'Putar musik undangan' })).toBeVisible();
    await expect(page.getByText(/Buy Now|INR 3999|Missing\s*Piece/i)).toHaveCount(0);
    await expect(page.locator('.watermark, .buy-button')).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test('gallery navigation, event anchors and music work', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Tampilkan foto 2' }).click();
  await expect(page.getByRole('button', { name: 'Tampilkan foto 2' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Foto berikutnya' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Tampilkan foto 3' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Jeda tayangan foto' }).click();
  await page.getByRole('heading', { name: 'Catatan Tamu' }).click();
  await expect(page.getByRole('button', { name: 'Mulai tayangan foto' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('link', { name: 'Petunjuk lokasi acara', exact: true }).first().click();
  await expect(page).toHaveURL(/#location$/);
  await page.getByRole('button', { name: 'Putar musik undangan' }).click();
  await expect(page.getByRole('button', { name: 'Jeda musik undangan' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Jeda musik undangan' }).click();
  await expect(page.getByRole('button', { name: 'Putar musik undangan' })).toHaveAttribute('aria-pressed', 'false');
});

test('invitation route and destination configuration are available', async ({ page }) => {
  await page.goto('/invitation');
  await expect(page.getByRole('heading', { name: 'Undangan', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /Konfirmasi kehadiran melalui WhatsApp/ })).toHaveAttribute('href', 'https://wa.me/91XXXXXXXXXX');
});

for (const width of [390, 1440]) {
  test(`hero entrance builds from back to front at ${width}px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    // Show every hero depth together, including the lower stage, to verify the full order.
    await page.setViewportSize({ width, height: 3000 });
    await page.route('**/images/rEehKhdtkygCYWwZsEWl6rkOY.webp', async route => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await route.continue();
    });
    await page.addInitScript(() => {
      const trace: { depth: number; at: number }[] = [];
      const seen = new WeakSet<Element>();
      Object.assign(window, { heroEntranceTrace: trace });
      new MutationObserver(records => {
        for (const { target } of records) {
          if (!(target instanceof HTMLElement) || !target.classList.contains('hero-layer') || target.dataset.revealed !== 'true' || seen.has(target)) continue;
          seen.add(target);
          trace.push({ depth: Number(target.style.zIndex), at: performance.now() });
        }
      }).observe(document, { subtree: true, attributes: true, attributeFilter: ['data-revealed'] });
    });
    await page.goto('/');
    const visibleLayers = page.locator('.hero-layer:visible');
    await expect.poll(() => visibleLayers.evaluateAll(layers => layers.every(layer => (layer as HTMLElement).dataset.revealed === 'true')), { timeout: 10000 }).toBe(true);
    const trace = await page.evaluate(() => (window as unknown as { heroEntranceTrace: { depth: number; at: number }[] }).heroEntranceTrace);
    expect(trace).toHaveLength(await visibleLayers.count());
    const order = trace.map(entry => entry.depth);
    expect(order).toEqual([...order].sort((a, b) => a - b));
    const groups = [...new Set(order)].map(depth => trace.filter(entry => entry.depth === depth));
    for (let i = 0; i < groups.length; i++) {
      // Symmetric artwork at one depth starts together, with a deliberate beat between depths.
      expect(Math.max(...groups[i].map(entry => entry.at)) - Math.min(...groups[i].map(entry => entry.at))).toBeLessThan(50);
      if (i) expect(groups[i][0].at - groups[i - 1][0].at).toBeGreaterThanOrEqual(90);
    }
    await expect(page.locator('.hero')).toHaveAttribute('data-entrance-ready', 'true');
    await expect.poll(() => page.locator('.hero-name > span').evaluateAll(letters => letters.every(letter => Number(getComputedStyle(letter).opacity) >= 0.99))).toBe(true);
    await page.locator('footer').evaluate(element => element.scrollIntoView({ block: 'end', behavior: 'instant' }));
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    expect(await visibleLayers.evaluateAll(layers => layers.every(layer => getComputedStyle(layer).opacity === '1'))).toBe(true);
    expect(await page.evaluate(() => (window as unknown as { heroEntranceTrace: unknown[] }).heroEntranceTrace.length)).toBe(trace.length);
  });

  test(`illustration animations change transforms at ${width}px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-motion-ready', 'true');
    expect(await page.locator('.hero [data-art-motion]').count()).toBeGreaterThanOrEqual(11);
    await expect(page.locator('.hero .motion-hotel')).toHaveCSS('animation-duration', width === 390 ? '3.2s' : '4.2s');
    await expect(page.locator('.hero .motion-balloon')).toHaveCSS('animation-duration', '3s');
    await expect(page.locator('.hero .motion-moon')).toHaveCSS('animation-duration', '2.6s');

    const transforms = await page.locator('[data-art-motion]').evaluateAll(elements => elements.map(element => {
      const animation = element.getAnimations().find(animation => animation instanceof CSSAnimation);
      if (!animation?.effect) return { moving: false, name: element.className };
      const duration = Number(animation.effect.getTiming().duration);
      animation.pause();
      animation.currentTime = duration * 0.2;
      const before = getComputedStyle(element).transform;
      animation.currentTime = duration * 0.6;
      const after = getComputedStyle(element).transform;
      return { moving: before !== after, name: element.className };
    }));
    expect(transforms.length).toBeGreaterThanOrEqual(14);
    expect(transforms.filter(element => !element.moving)).toEqual([]);
  });

  test(`invitation illustrations enter directionally and keep moving at ${width}px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-motion-ready', 'true');

    for (const { selector, from } of invitationIllustrations) {
      const illustration = page.locator(selector);
      await expect(illustration).toHaveAttribute('data-art-motion', /^(translate|rotate|sway|breathe)$/);
      await expect(illustration).toHaveAttribute('data-reveal-from', from);
      await expect(illustration).not.toHaveAttribute('data-revealed', 'true');
      await expect(illustration).toHaveCSS('opacity', '0');
      const offset = await illustration.evaluate(element => {
        const [x, y = 0] = getComputedStyle(element).translate.split(/\s+/).map(value => parseFloat(value));
        return { x, y };
      });
      if (from === 'top') expect(offset.y).toBeLessThan(0);
      else if (from === 'left') expect(offset.x).toBeLessThan(0);
      else expect(offset.x).toBeGreaterThan(0);
    }

    for (const { selector } of invitationIllustrations) {
      const illustration = page.locator(selector);
      await illustration.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
      await expect(illustration).toHaveAttribute('data-revealed', 'true');
      await expect(illustration).toHaveAttribute('data-motion-active', 'true');
      await expect(illustration).toHaveCSS('opacity', '1');
      await expect(illustration).toHaveCSS('animation-play-state', 'running');
      const before = await illustration.evaluate(element => getComputedStyle(element).transform);
      await expect.poll(() => illustration.evaluate(element => getComputedStyle(element).transform), { message: `${selector} must actually move, not just declare an animation` }).not.toBe(before);
    }
  });

  test(`offscreen headings reveal smoothly once at ${width}px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-motion-ready', 'true');
    const heading = page.locator('.invite-heading');
    await expect(heading).toHaveAttribute('data-reveal', /^(top|left|right)$/);
    await expect(heading).toHaveAttribute('data-reveal-from', /^(top|left|right)$/);
    expect(await heading.evaluate(element => element.getBoundingClientRect().top)).toBeGreaterThan(900);
    await expect(heading).not.toHaveAttribute('data-revealed', 'true');
    await expect(heading).toHaveCSS('opacity', '0');
    const smoothProperties = await heading.evaluate(element => {
      const style = getComputedStyle(element);
      const properties = style.transitionProperty.split(',').map(value => value.trim());
      const durations = style.transitionDuration.split(',').map(value => parseFloat(value));
      return ['opacity', 'translate'].map(property => properties.some((value, index) => (value === property || value === 'all') && durations[index % durations.length] > 0));
    });
    expect(smoothProperties).toEqual([true, true]);

    await heading.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await expect(heading).toHaveAttribute('data-revealed', 'true');
    await expect(heading).toHaveCSS('opacity', '1');
    await expect.poll(() => heading.evaluate(element => {
      const translate = getComputedStyle(element).translate;
      return translate === 'none' || translate.split(/\s+/).every(value => parseFloat(value) === 0);
    })).toBe(true);
    await page.locator('footer').evaluate(element => element.scrollIntoView({ block: 'end', behavior: 'instant' }));
    expect(await heading.evaluate(element => element.getBoundingClientRect().bottom)).toBeLessThan(0);
    await expect(heading).toHaveAttribute('data-revealed', 'true');
    await expect(heading).toHaveCSS('opacity', '1');
    await heading.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await expect(heading).toHaveAttribute('data-revealed', 'true');
    await expect(heading).toHaveCSS('opacity', '1');
    expect(await heading.evaluate(element => element.getAnimations().filter(animation => animation instanceof CSSTransition && ['opacity', 'translate'].includes(animation.transitionProperty)).length)).toBe(0);
  });
}

test('all invitation and lower-page illustration groups have repeat motion', async ({ page }) => {
  await page.goto('/');
  const groups = [
    ...invitationIllustrations.map(({ selector }) => ({ selector, count: 1 })),
    ...['.event-portrait', '.event-balloon', '.event-palace', '.event-moon'].map(selector => ({ selector: `.event-card ${selector}`, count: 6 })),
    { selector: '.meet-flourish', count: 1 },
    { selector: '.gallery-scene', count: 1 },
    { selector: '.guest-flourish', count: 1 },
    { selector: '.guest-icon', count: 4 },
    { selector: '.medallion', count: 3 },
    { selector: '.medallion-icon', count: 3 },
    { selector: '.medallion-outer', count: 3 },
  ];
  for (const { selector, count } of groups) {
    const illustrations = page.locator(selector);
    await expect(illustrations).toHaveCount(count);
    await expect(illustrations.and(page.locator('[data-art-motion="translate"], [data-art-motion="rotate"], [data-art-motion="sway"], [data-art-motion="breathe"]'))).toHaveCount(count);
  }
  await expect(page.locator('.gallery-scene .gallery-frame')).toHaveCount(1);
  expect(await page.locator('.gallery-scene .gallery-photo').count()).toBeGreaterThan(0);
});

test('artwork pauses offscreen and resumes when visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion-ready', 'true');
  for (const selector of ['.hero .motion-hotel', '.invitation-balloon', '.event-card .event-portrait', '.gallery-scene', '.guest-icon', '.medallion-icon']) {
    const illustration = page.locator(selector).first();
    await illustration.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await expect(illustration).toHaveAttribute('data-motion-active', 'true');
    await expect(illustration).toHaveCSS('animation-play-state', 'running');
    await page.locator('footer').evaluate(element => element.scrollIntoView({ block: 'end', behavior: 'instant' }));
    await expect(illustration).toHaveAttribute('data-motion-active', 'false');
    await expect(illustration).toHaveCSS('animation-play-state', 'paused');
    await illustration.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await expect(illustration).toHaveAttribute('data-motion-active', 'true');
    await expect(illustration).toHaveCSS('animation-play-state', 'running');
  }
});

test('reduced motion leaves decorative artwork stationary', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('html')).toHaveAttribute('data-motion-ready', 'true');
  const animations = await page.locator('[data-art-motion]').evaluateAll(elements => elements.map(element => ({ name: getComputedStyle(element).animationName, transform: getComputedStyle(element).transform })));
  expect(animations.length).toBeGreaterThanOrEqual(14);
  expect(animations.every(animation => animation.name === 'none' && animation.transform === 'none')).toBe(true);
  const reveals = await page.locator('[data-reveal]').evaluateAll(elements => elements.map(element => ({ name: element.className, opacity: getComputedStyle(element).opacity, translate: getComputedStyle(element).translate })));
  expect(reveals.length).toBeGreaterThan(0);
  expect(reveals.filter(reveal => reveal.opacity !== '1' || reveal.translate !== 'none')).toEqual([]);
  await scrollThroughInvitation(page);
  expect(await inspectContent(page, false)).toEqual({ missing: [], hidden: [] });
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('.gallery-toggle')).toBeHidden();
  expect(errors).toEqual([]);
});

test('all displayed content has reveal coverage, stays visible after traversal, and loads for screenshots', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  for (const width of [1440, 390]) {
    // Overlap the 900px steps so a short heading cannot fall between observer margins.
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('html')).toHaveAttribute('data-motion-ready', 'true');
    await scrollThroughInvitation(page);
    expect((await inspectContent(page)).missing).toEqual([]);
    await expect.poll(() => inspectContent(page), { message: `All displayed content must remain revealed after the ${width}px page sweep` }).toEqual({ missing: [], hidden: [] });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await expect.poll(() => page.locator('.hero-name > span').evaluateAll(elements => elements.every(element => Number(getComputedStyle(element).opacity) >= 0.99))).toBe(true);
    await expect.poll(() => page.locator('img').evaluateAll(elements => elements.filter((element): element is HTMLImageElement => element instanceof HTMLImageElement).filter(image => image.getBoundingClientRect().width > 0 && (!image.complete || image.naturalWidth === 0)).map(image => image.src))).toEqual([]);
    await page.screenshot({ path: `test-results/clone-${width}.jpg`, fullPage: true, quality: 70, animations: 'disabled' });
  }
  expect(errors).toEqual([]);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('invitation text and artwork remain visible without the motion controller', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('html')).not.toHaveAttribute('data-motion-ready', 'true');
    await scrollThroughInvitation(page);
    expect(await inspectContent(page, false)).toEqual({ missing: [], hidden: [] });
    const reveals = await page.locator('[data-reveal]').evaluateAll(elements => elements.map(element => ({ name: element.className, opacity: getComputedStyle(element).opacity, translate: getComputedStyle(element).translate })));
    expect(reveals.length).toBeGreaterThan(0);
    expect(reveals.filter(reveal => reveal.opacity !== '1' || reveal.translate !== 'none')).toEqual([]);
    const heroCharacters = await page.locator('.hero-name > span').evaluateAll(elements => elements.map(element => ({ opacity: getComputedStyle(element).opacity, width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height, filter: getComputedStyle(element).filter })));
    expect(heroCharacters.length).toBeGreaterThan(0);
    expect(heroCharacters.filter(character => character.opacity !== '1' || character.width <= 0 || character.height <= 0 || !['none', 'blur(0px)'].includes(character.filter))).toEqual([]);
  });
});
