import { Art } from './art';
import { artwork, events, image } from '@/lib/invitation';

export function Invitation() {
  return (
    <section className="invitation-section relative text-center" aria-label="Wedding invitation and celebrations">
      <div className="invitation-copy relative">
        <p className="mantra" lang="hi" data-reveal="top">ॐ श्री गणेशाय नम</p>
        <Art name={artwork.ganesha} className="invitation-ganesha ambient-breathe" motion="breathe" reveal="top" />
        <Art name={artwork.moon} className="invitation-moon" motion="rotate" reveal="left" />
        <picture className="invitation-balloon" data-art-motion="translate" data-reveal="right">
          <source media="(max-width: 809px)" srcSet={image(artwork.mobileBalloon)} />
          <Art name={artwork.balloon} reveal={false} />
        </picture>
        <Art name={artwork.palace} className="invitation-palace" motion="translate" reveal="right" />
        <div className="blessings">
          <p data-reveal="top">With the heavenly blessings of</p>
          <p data-reveal="top" data-reveal-delay="80">Smt. Lata Devi &amp; Sm. Kamal Kapoor</p>
          <p className="blessing-divider" data-reveal="top" data-reveal-delay="140">&mdash;&mdash;</p>
          <p className="parents" data-reveal="top" data-reveal-delay="200">Mrs. Reena &amp; Mr. Rajiv Kapoor</p>
        </div>
        <h2 className="invite-heading" data-reveal="top">INVITE</h2>
        <p className="invitation-intro" data-reveal="top" data-reveal-delay="100">You to join us in the wedding celebrations of</p>
        <div className="couple-names" aria-label="Abhishek and Kanika">
          <p className="groom-name" data-reveal="top">Abhishek</p>
          <p className="ampersand" data-reveal="top" data-reveal-delay="80">&amp;</p>
          <p className="bride-name" data-reveal="top" data-reveal-delay="160">Kanika</p>
        </div>
        <div className="bride-parents"><p data-reveal="top">Daughter of</p><p data-reveal="top" data-reveal-delay="100">Mrs. Shalini &amp; Mr. Aakash Mittal,</p></div>
        <p className="events-intro" data-reveal="top">On the following events</p>
      </div>
      <div className="event-grid grid" aria-label="Wedding events">
        {events.map(event => (
          <article className="event-card relative" key={event.name}>
            <div className="event-art relative" aria-hidden="true">
              <Art name={event.art} className="event-portrait" motion="breathe" reveal="top" />
              <Art name={artwork.balloon} className="event-balloon" motion="translate" reveal="left" />
              <Art name="64NTAFiZlzU2kGaVG82xflIhbqk" className="event-palace" motion="translate" reveal="left" />
              <Art name={artwork.moon} className="event-moon" motion="rotate" reveal="right" />
            </div>
            <div className="event-copy flex flex-col items-center" data-reveal="top" data-reveal-delay="100">
              <h3>{event.name}</h3>
              <p>{event.date}</p>
              <p>The Savoy, Mussoorie</p>
              <p>6pm Onwards</p>
              <a href="#location" className="underline underline-offset-2 hover:brightness-125">See the route</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
