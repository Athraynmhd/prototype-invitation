import { Medallion } from './medallion';

export function InvitationFooter() {
  return (
    <footer className="invitation-footer relative text-center">
      <div className="instagram-medallion"><Medallion kind="instagram" /></div>
      <div className="farewell absolute w-full">
        <h2 data-reveal="top">The countdown begins</h2>
        <p className="countdown" aria-label="The wedding countdown has ended" data-reveal="top" data-reveal-delay="100">00:00:00:00</p>
        <p className="family-message mx-auto" data-reveal="top" data-reveal-delay="180">Mittal family is excited that you are able to join us in celebrating what we hope will be one of the happiest days of our lives.</p>
      </div>
    </footer>
  );
}
