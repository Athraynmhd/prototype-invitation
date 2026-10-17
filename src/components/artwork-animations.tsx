'use client';

import { useEffect } from 'react';

export function ArtworkAnimations() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-art-motion]');
    const reveals = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const visible = new Set<Element>();
    const hero = document.querySelector<HTMLElement>('.hero');
    const heroLayers = Array.from(reveals).filter(element => element.classList.contains('hero-layer'));
    const depth = (element: HTMLElement) => Number(element.style.zIndex) || 0;
    const frontDepth = Math.max(0, ...heroLayers.map(depth));
    const pendingHero = new Set<HTMLElement>();
    let heroTimer: number | undefined;
    let heroRunning = false;
    let heroGeneration = 0;
    let disposed = false;
    const update = () => {
      elements.forEach(element => {
        const active = String(visible.has(element) && !document.hidden && !reducedMotion.matches);
        if (element.dataset.motionActive !== active) element.dataset.motionActive = active;
      });
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      update();
    }, { rootMargin: '100px 0px' });

    const reveal = (element: HTMLElement) => {
      element.dataset.revealed = 'true';
      revealObserver.unobserve(element);
    };
    const finishHeroEntrance = () => {
      if (!hero || hero.dataset.entranceReady === 'true') return;
      hero.dataset.entranceReady = 'true';
      hero.dispatchEvent(new Event('hero-entrance-ready'));
    };
    const cancelHeroEntrance = () => {
      heroGeneration++;
      window.clearTimeout(heroTimer);
      pendingHero.clear();
      heroRunning = false;
    };
    const revealNextHeroLayer = async () => {
      if (disposed || !pendingHero.size || reducedMotion.matches) {
        heroRunning = false;
        return;
      }
      const generation = heroGeneration;
      const nextDepth = Math.min(...Array.from(pendingHero, depth));
      const group = Array.from(pendingHero).filter(element => depth(element) === nextDepth);
      // Decode a whole depth together so a faster foreground image cannot overtake it.
      await Promise.all(group.map(element => {
        const image = element instanceof HTMLImageElement ? element : element.querySelector('img');
        return image?.decode().catch(() => undefined);
      }));
      if (disposed || generation !== heroGeneration || reducedMotion.matches) return;
      // A scroll can add a deeper layer while the current group is decoding.
      if (Math.min(...Array.from(pendingHero, depth)) < nextDepth || Array.from(pendingHero).filter(element => depth(element) === nextDepth).length > group.length) {
        heroTimer = window.setTimeout(() => { void revealNextHeroLayer(); }, 0);
        return;
      }
      group.forEach(element => {
        pendingHero.delete(element);
        reveal(element);
      });
      if (nextDepth === frontDepth) finishHeroEntrance();
      // Keep this entrance clock separate from all CSS loop timing.
      heroTimer = window.setTimeout(() => { void revealNextHeroLayer(); }, 120);
    };
    const revealWhenReady = (element: HTMLElement) => {
      if (!element.classList.contains('hero-layer') || reducedMotion.matches) {
        reveal(element);
        return;
      }
      revealObserver.unobserve(element);
      pendingHero.add(element);
      if (!heroRunning) {
        heroRunning = true;
        heroTimer = window.setTimeout(() => { void revealNextHeroLayer(); }, 0);
      }
    };
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) revealWhenReady(entry.target as HTMLElement);
      });
    }, { rootMargin: '0px 0px -4% 0px' });
    const updatePreference = () => {
      if (reducedMotion.matches) {
        cancelHeroEntrance();
        reveals.forEach(reveal);
        finishHeroEntrance();
      }
      update();
    };
    const revealFocused = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      let element = event.target.closest<HTMLElement>('[data-reveal]');
      while (element) {
        // Focusing a visible control must not snap its in-flight entrance under the pointer.
        if (element.dataset.revealed !== 'true') element.dataset.revealInstant = 'true';
        reveal(element);
        element = element.parentElement?.closest<HTMLElement>('[data-reveal]') ?? null;
      }
    };

    reveals.forEach(element => {
      const rect = element.getBoundingClientRect();
      const center = (Math.max(rect.left, 0) + Math.min(rect.right, innerWidth)) / 2;
      element.dataset.revealFrom = element.dataset.reveal === 'auto'
        ? center < innerWidth * 0.38 ? 'left' : center > innerWidth * 0.62 ? 'right' : 'top'
        : element.dataset.reveal;
      if (element.dataset.revealDelay) element.style.setProperty('--reveal-delay', `${element.dataset.revealDelay}ms`);
      if (reducedMotion.matches || element.dataset.revealed === 'true') reveal(element);
      else revealObserver.observe(element);
    });
    elements.forEach(element => observer.observe(element));
    if (reducedMotion.matches || heroLayers.some(element => depth(element) === frontDepth && element.dataset.revealed === 'true')) finishHeroEntrance();
    document.documentElement.dataset.motionReady = 'true';
    document.addEventListener('visibilitychange', update);
    document.addEventListener('focusin', revealFocused);
    reducedMotion.addEventListener('change', updatePreference);
    return () => {
      disposed = true;
      cancelHeroEntrance();
      observer.disconnect();
      revealObserver.disconnect();
      document.removeEventListener('visibilitychange', update);
      document.removeEventListener('focusin', revealFocused);
      reducedMotion.removeEventListener('change', updatePreference);
      delete document.documentElement.dataset.motionReady;
    };
  }, []);

  return null;
}
