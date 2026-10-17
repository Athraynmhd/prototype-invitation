'use client';

import { useRef } from 'react';
import { LazyMotion, domAnimation, m, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Art } from './art';
import { invitationLinks } from '@/lib/invitation';

const designs = {
  location: { outer: 'c02-medali-lokasi-luar', inner: 'gpuyLKzQFz8PbRrE1RR3LfnRWw', icon: 'ikon-lokasi', title: <>Petunjuk<br />Lokasi</>, helper: 'Ketuk untuk melihat peta', label: 'Petunjuk lokasi. Ketuk untuk melihat peta' },
  rsvp: { outer: 'g02-medali-rsvp-luar', inner: 'KBiow1jmaeWHazxshSNGQ08lvw', icon: 'ikon-rsvp', title: <>Menanti<br />Kehadiran Anda</>, helper: 'Mohon konfirmasi kehadiran Anda', label: 'Menanti kehadiran Anda. Konfirmasi kehadiran melalui WhatsApp' },
  instagram: { outer: 'f02-medali-instagram-luar', inner: 'Aof0oMPsYxLFv2zceiax3Nj7qyU', icon: 'ikon-instagram', title: <>Jejak<br />Bahagia</>, helper: 'Temukan kisah kami di Instagram', label: 'Jejak bahagia. Temukan kisah kami di Instagram' },
};

export function Medallion({ kind }: { kind: keyof typeof designs }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [1002, 0]);
  const design = designs[kind];

  return (
    <LazyMotion features={domAnimation}>
      <div ref={ref} className={`medallion ambient-float medallion-${kind}`} data-art-motion="translate" data-reveal="top">
        <m.div className="medallion-rotation absolute inset-0" style={{ rotate: reducedMotion ? 0 : rotate }}>
          <Art name={design.outer} className="medallion-outer h-full w-full" motion="rotate" reveal={false} />
        </m.div>
        <Art name={design.inner} className="medallion-inner" reveal={false} />
        <a className="medallion-link absolute inset-0" href={invitationLinks[kind]} target="_blank" rel="noopener noreferrer" aria-label={design.label}>
          <div className="medallion-copy flex flex-col items-center">
            <h2 data-reveal="top">{design.title}</h2>
            <p data-reveal="top" data-reveal-delay="80">{design.helper}</p>
            <Art name={design.icon} className="medallion-icon ambient-breathe" motion="breathe" reveal="top" />
          </div>
        </a>
      </div>
    </LazyMotion>
  );
}
