'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

export function HeroTitle() {
  const reducedMotion = useReducedMotion();
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) setFontsReady(true);
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <h1 className="hero-title" aria-label="Abhishek weds Kanika">
        {['Abhishek', 'weds', 'Kanika'].map((word, line) => (
          <span className={`hero-name hero-name-${line}`} key={word} aria-hidden="true">
            {Array.from(word).map((letter, index) => (
              <m.span
                key={index}
                className="inline-block"
                initial={reducedMotion ? false : { opacity: 0, y: -12 }}
                animate={fontsReady || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
                transition={{ type: 'tween', duration: reducedMotion ? 0 : 1.5, ease: [.22, .61, .36, 1], delay: reducedMotion ? 0 : .12 + line * .16 + index * .045 }}
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
