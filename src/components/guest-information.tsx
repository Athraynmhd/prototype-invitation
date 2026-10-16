import { Art } from './art';
import { Medallion } from './medallion';
import { artwork, guestDetails } from '@/lib/invitation';

export function GuestInformation() {
  return (
    <section className="guest-section relative text-center" aria-labelledby="things-to-know">
      <div className="rsvp-medallion"><Medallion kind="rsvp" /></div>
      <div className="guest-heading absolute w-full">
        <Art name={artwork.flourish} className="guest-flourish ambient-sway mx-auto" motion="sway" reveal="top" />
        <h2 id="things-to-know" data-reveal="top" data-reveal-delay="100">Things to<br />know</h2>
        <p className="guest-intro mx-auto" data-reveal="top" data-reveal-delay="180">To help you feel at ease and enjoy every moment of the celebrations, we&rsquo;ve gathered a few thoughtful details we&rsquo;d love for you to know before the big day.</p>
      </div>
      <div className="guest-grid absolute grid w-full justify-center">
        {guestDetails.map(detail => (
          <article className="guest-detail flex flex-col items-center" key={detail.title}>
            <Art name={detail.icon} className="guest-icon ambient-float" motion="translate" />
            <h3 data-reveal="auto" data-reveal-delay="80">{detail.title}</h3>
            <p data-reveal="auto" data-reveal-delay="160">{detail.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
