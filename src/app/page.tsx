import { Hero } from '@/components/hero';
import { Invitation } from '@/components/invitation';
import { CoupleSection } from '@/components/couple-section';
import { GuestInformation } from '@/components/guest-information';
import { InvitationFooter } from '@/components/invitation-footer';
import { DemoControls } from '@/components/demo-controls';
import { ArtworkAnimations } from '@/components/artwork-animations';

export default function Home() {
  return (
    <>
      <DemoControls />
      <ArtworkAnimations />
      <main id="invitation" className="invitation-site mx-auto">
        <Hero />
        <Invitation />
        <CoupleSection />
        <GuestInformation />
        <InvitationFooter />
      </main>
    </>
  );
}
