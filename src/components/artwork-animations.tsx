'use client';

import { useEffect } from 'react';

export function ArtworkAnimations() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-art-motion]');
    const reveals = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const visible = new Set<Element>();
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
    const revealWhenReady = (element: HTMLElement) => {
      const image = element.classList.contains('hero-layer')
        ? element instanceof HTMLImageElement ? element : element.querySelector('img')
        : null;
      if (!image || reducedMotion.matches) {
        reveal(element);
        return;
      }
      // Fade in decoded artwork instead of letting a late image pop into a running entrance.
      revealObserver.unobserve(element);
      void image.decode().catch(() => undefined).then(() => {
        if (!disposed) reveal(element);
      });
    };
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) revealWhenReady(entry.target as HTMLElement);
      });
    }, { rootMargin: '0px 0px -4% 0px' });
    const updatePreference = () => {
      if (reducedMotion.matches) reveals.forEach(reveal);
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
    document.documentElement.dataset.motionReady = 'true';
    document.addEventListener('visibilitychange', update);
    document.addEventListener('focusin', revealFocused);
    reducedMotion.addEventListener('change', updatePreference);
    return () => {
      disposed = true;
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
