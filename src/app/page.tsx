import { getCurrentBatch } from '@/lib/batches';
import { HeroSection } from '@/components/HeroSection';
import { CountdownBatchBanner } from '@/components/CountdownBatchBanner';
import { BatchPricingTable } from '@/components/BatchPricingTable';
import { VideoShowcaseGallery } from '@/components/VideoShowcaseGallery';
import { OrderWizardForm } from '@/components/OrderWizardForm';
import { FaqAccordion } from '@/components/FaqAccordion';
import { Footer } from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const currentBatch = getCurrentBatch();

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div>
        <CountdownBatchBanner currentBatch={currentBatch} />
        <HeroSection />
        <BatchPricingTable currentTier={currentBatch.tier} />
        <VideoShowcaseGallery />
        <OrderWizardForm currentBatch={currentBatch} />
        <FaqAccordion />
      </div>
      <Footer />
    </main>
  );
}
