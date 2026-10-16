import { Hero } from '@/components/hero';
import { Invitation } from '@/components/invitation';
import { CoupleSection } from '@/components/couple-section';
import { GuestInformation } from '@/components/guest-information';
import { InvitationFooter } from '@/components/invitation-footer';
import { InvitationControls } from '@/components/invitation-controls';
import { ArtworkAnimations } from '@/components/artwork-animations';

export default function Home() {
  return (
    <>
      <InvitationControls />
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
