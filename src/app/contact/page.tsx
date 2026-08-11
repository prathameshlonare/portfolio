import { Metadata } from "next";
import { GrainOverlay } from "@/components/anti-ux/grain-overlay";
import { Navigation } from "@/components/layout/navigation";
import { ViewportType } from "@/components/anti-ux/viewport-type";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { ContactContent } from "@/components/sections/contact-content";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Contact — Prathamesh Lonare | DevOps & Cloud Systems Engineer",
  description:
    "Get in touch with Prathamesh Lonare for DevOps roles, AWS cloud infrastructure projects, automation consulting, or pipeline inquiries.",
  alternates: {
    canonical: "https://prathameshlonare.me/contact/",
  },
};

export default function ContactPage() {
  return (
    <GrainOverlay className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#1A1A2E] overflow-x-hidden">
      <Navigation />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 w-full">
        {/* Page Banner */}
        <div className="border-b-3 border-[#1A1A2E] pb-6 md:pb-8 mb-8 md:mb-12">
          <MonoLabel className="text-[#FF6B35] font-bold">DIRECT DISPATCH & DISCUSSION</MonoLabel>
          <ViewportType as="h1" className="text-[var(--text-page)] font-black mt-2">
            LET&apos;S <span className="text-[#FF6B35]">TALK</span>
          </ViewportType>
          <p className="text-base md:text-lg text-zinc-700 font-medium max-w-2xl mt-3 md:mt-4 leading-relaxed">
            Have a cloud infrastructure project, DevOps role opportunity, or pipeline question? Reach out directly.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <ContactContent />
      </main>

      <Footer />
    </GrainOverlay>
  );
}

