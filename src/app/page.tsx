import { GrainOverlay } from "@/components/anti-ux/grain-overlay";
import { Navigation } from "@/components/layout/navigation";
import { Hero } from "@/components/sections/hero";
import { Metrics } from "@/components/sections/metrics";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { QuoteSection } from "@/components/sections/quote-section";
import { FeaturedWorkPreview } from "@/components/sections/featured-work-preview";
import { ContactPreview } from "@/components/sections/contact-preview";
import { Footer } from "@/components/layout/footer";
import { ScrollSection } from "@/components/animated/scroll-section";

export default function Home() {
  return (
    <GrainOverlay className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#1A1A2E] overflow-x-hidden">
      {/* Navigation Header */}
      <Navigation />

      {/* Main Content Sections — breathing room between sections */}
      <main id="main-content" className="flex-1 flex flex-col gap-12 md:gap-16 lg:gap-24">
        <Hero />
        <ScrollSection>
          <Metrics />
        </ScrollSection>
        <ScrollSection direction="left">
          <TechMarquee />
        </ScrollSection>
        <ScrollSection direction="right">
          <QuoteSection />
        </ScrollSection>
        <ScrollSection stagger>
          <FeaturedWorkPreview />
        </ScrollSection>
        <ScrollSection>
          <ContactPreview />
        </ScrollSection>
      </main>

      {/* Footer */}
      <Footer />
    </GrainOverlay>
  );
}
