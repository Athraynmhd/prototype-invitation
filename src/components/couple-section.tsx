import { Art } from './art';
import { Medallion } from './medallion';
import { PhotoGallery } from './photo-gallery';
import { artwork, coupleMessage } from '@/lib/invitation';

export function CoupleSection() {
  return (
    <section id="location" className="couple-section relative text-center" aria-label="Lokasi dan kedua mempelai">
      <div className="location-medallion"><Medallion kind="location" /></div>
      <div className="meet-couple absolute w-full">
        <Art name={artwork.heart} className="meet-flourish ambient-sway mx-auto" motion="sway" reveal="top" />
        <p className="meet-eyebrow" data-reveal="top" data-reveal-delay="60">MEMPELAI</p>
        <h2 data-reveal="top" data-reveal-delay="120">Ichsan &amp;<br />Ulfa</h2>
        <p className="couple-message mx-auto" data-reveal="top" data-reveal-delay="180">{coupleMessage}</p>
      </div>
      <PhotoGallery />
    </section>
  );
}
