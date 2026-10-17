'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { Art } from './art';
import { artwork, image, photos } from '@/lib/invitation';

export function PhotoGallery() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pointerX = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const changePhoto = (step: number) => setActive(current => (current + step + photos.length) % photos.length);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || paused || autoplayPaused || reducedMotion) return;
    const interval = setInterval(() => {
      if (!document.hidden) setActive(current => (current + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [visible, paused, autoplayPaused, reducedMotion]);

  return (
    <div ref={ref} className="photo-gallery relative" role="region" aria-roledescription="galeri bergulir" aria-label="Galeri kedua mempelai" data-reveal="top" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
      <div className="gallery-scene ambient-float relative h-full w-full" data-art-motion="translate">
        <Art name={artwork.frame} className="gallery-frame pointer-events-none absolute inset-0 h-full w-full" reveal={false} />
        <div className="photo-window" onPointerDown={event => { pointerX.current = event.clientX; }} onPointerUp={event => { if (pointerX.current !== null && Math.abs(event.clientX - pointerX.current) > 30) changePhoto(event.clientX < pointerX.current ? 1 : -1); pointerX.current = null; }} onPointerCancel={() => { pointerX.current = null; }}>
          {photos.map((photo, index) => <img className={`gallery-photo ${index === active ? 'is-active' : ''}`} key={photo} src={image(photo)} alt={`Foto ilustrasi pernikahan ${index + 1}`} aria-hidden={index !== active} loading="lazy" draggable={false} />)}
          <button className="gallery-arrow gallery-prev" onClick={() => changePhoto(-1)} aria-label="Foto sebelumnya">&#8249;</button>
          <button className="gallery-arrow gallery-next" onClick={() => changePhoto(1)} aria-label="Foto berikutnya">&#8250;</button>
          <button className="gallery-toggle" onClick={() => setAutoplayPaused(current => !current)} aria-label={autoplayPaused ? 'Mulai tayangan foto' : 'Jeda tayangan foto'} aria-pressed={autoplayPaused}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d={autoplayPaused ? 'M2 1v8l7-4z' : 'M2 1h2v8H2zM6 1h2v8H6z'} /></svg>
          </button>
          <div className="gallery-dots flex justify-center gap-2" aria-label="Pilih foto">
            {photos.map((photo, index) => <button key={photo} onClick={() => setActive(index)} aria-label={`Tampilkan foto ${index + 1}`} aria-pressed={index === active} className={index === active ? 'is-active' : ''} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
