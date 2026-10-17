import { Art } from './art';
import { artwork, events, image } from '@/lib/invitation';

export function Invitation() {
  return (
    <section className="invitation-section relative text-center" aria-label="Undangan dan rangkaian pernikahan">
      <div className="invitation-copy relative">
        <p className="mantra" data-reveal="top">Bismillahirrahmanirrahim</p>
        <Art name={artwork.ganesha} className="invitation-ganesha ambient-breathe" motion="breathe" reveal="top" />
        <Art name={artwork.moon} className="invitation-moon" motion="rotate" reveal="left" />
        <picture className="invitation-balloon" data-art-motion="translate" data-reveal="right">
          <source media="(max-width: 809px)" srcSet={image(artwork.mobileBalloon)} />
          <Art name={artwork.balloon} reveal={false} />
        </picture>
        <Art name={artwork.palace} className="invitation-palace" motion="translate" reveal="right" />
        <div className="blessings">
          <p data-reveal="top">Dengan memohon rida Allah</p>
          <p data-reveal="top" data-reveal-delay="80">serta doa dan restu kedua orang tua</p>
          <p className="blessing-divider" data-reveal="top" data-reveal-delay="140">&mdash;&mdash;</p>
          <p className="parents" data-reveal="top" data-reveal-delay="200">Kami beserta keluarga besar</p>
        </div>
        <h2 className="invite-heading" data-reveal="top">Undangan</h2>
        <p className="invitation-intro" data-reveal="top" data-reveal-delay="100">Mengundang Anda ke pernikahan</p>
        <div className="couple-names" aria-label="Ichsan dan Ulfa">
          <p className="groom-name" data-reveal="top">Ichsan</p>
          <p className="ampersand" data-reveal="top" data-reveal-delay="80">&amp;</p>
          <p className="bride-name" data-reveal="top" data-reveal-delay="160">Ulfa</p>
        </div>
        <div className="bride-parents"><p data-reveal="top">Dalam doa</p><p data-reveal="top" data-reveal-delay="100">Semoga menjadi keluarga sakinah, mawaddah, warahmah</p></div>
        <p className="events-intro" data-reveal="top">Dalam rangkaian penuh makna</p>
      </div>
      <div className="event-grid grid" aria-label="Rangkaian pernikahan adat Aceh">
        {events.map(event => (
          <article className="event-card relative" key={event.name}>
            <div className="event-art relative" aria-hidden="true">
              <Art name={event.art} className="event-portrait" motion="breathe" reveal="top" />
              <Art name={artwork.balloon} className="event-balloon" motion="translate" reveal="left" />
              <Art name={artwork.eventPalace} className="event-palace" motion="translate" reveal="left" />
              <Art name={artwork.moon} className="event-moon" motion="rotate" reveal="right" />
            </div>
            <div className="event-copy flex flex-col items-center" data-reveal="top" data-reveal-delay="100">
              <h3>{event.name}</h3>
              <p>{event.date}</p>
              <p>Lokasi akan diumumkan</p>
              <p>Waktu menyusul</p>
              <a href="#location" className="underline underline-offset-2 hover:brightness-125">Petunjuk lokasi acara</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
