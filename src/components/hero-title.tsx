'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export function HeroTitle() {
  const reducedMotion = useReducedMotion();
  const [fontsReady, setFontsReady] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let cancelled = false;
    const hero = ref.current?.closest<HTMLElement>('.hero');
    const revealTitle = () => { if (!cancelled) setSceneReady(true); };
    if (hero?.dataset.entranceReady === 'true') revealTitle();
    hero?.addEventListener('hero-entrance-ready', revealTitle);
    document.fonts.ready.then(() => {
      if (!cancelled) setFontsReady(true);
    });
    return () => {
      cancelled = true;
      hero?.removeEventListener('hero-entrance-ready', revealTitle);
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <h1 ref={ref} className="hero-title" aria-label="Abhishek weds Kanika">
        {['Abhishek', 'weds', 'Kanika'].map((word, line) => (
          <span className={`hero-name hero-name-${line}`} key={word} aria-hidden="true">
            {Array.from(word).map((letter, index) => (
              <m.span
                key={index}
                className="inline-block"
                initial={reducedMotion ? false : { opacity: 0, y: -8 }}
                animate={(fontsReady && sceneReady) || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                transition={{ type: 'tween', duration: reducedMotion ? 0 : .75, ease: [.22, .61, .36, 1], delay: reducedMotion ? 0 : .04 + line * .08 + index * .025 }}
              >
                {letter}
              </m.span>
            ))}
          </span>
        ))}
      </h1>
    </LazyMotion>
  );
}
