import { Medallion } from './medallion';

export function InvitationFooter() {
  return (
    <footer className="invitation-footer relative text-center">
      <div className="instagram-medallion"><Medallion kind="instagram" /></div>
      <div className="farewell absolute w-full">
        <h2 data-reveal="top">Menanti Hari Bahagia</h2>
        <p className="countdown" data-reveal="top" data-reveal-delay="100">Insyaallah</p>
        <p className="family-message mx-auto" data-reveal="top" data-reveal-delay="180">Kami beserta keluarga besar menantikan kehadiran dan doa restu Bapak, Ibu, serta Saudara. Semoga kebersamaan ini menjadi kenangan indah dan awal keberkahan bagi perjalanan rumah tangga kami.</p>
      </div>
    </footer>
  );
}
