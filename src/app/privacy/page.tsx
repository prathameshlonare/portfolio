import { Metadata } from "next";
import { GrainOverlay } from "@/components/anti-ux/grain-overlay";
import { Navigation } from "@/components/layout/navigation";
import { ViewportType } from "@/components/anti-ux/viewport-type";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { Footer } from "@/components/layout/footer";
import { ShieldCheck, Lock, Eye, Server } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Prathamesh Lonare",
  description:
    "Privacy Policy for prathameshlonare.me. Transparent disclosure regarding analytics, cookies, and data privacy.",
  alternates: {
    canonical: "https://prathameshlonare.me/privacy/",
  },
};

export default function PrivacyPage() {
  return (
    <GrainOverlay className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#1A1A2E] overflow-x-hidden">
      <Navigation />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 w-full">
        {/* Page Banner */}
        <div className="border-b-3 border-[#1A1A2E] pb-6 md:pb-8 mb-8 md:mb-12">
          <MonoLabel className="text-[#FF6B35] font-bold">TRANSPARENCY & DATA PRIVACY</MonoLabel>
          <ViewportType as="h1" className="text-[var(--text-page)] font-black mt-2">
            PRIVACY <span className="text-[#FF6B35]">POLICY</span>
          </ViewportType>
          <p className="text-base md:text-lg text-zinc-700 font-medium max-w-2xl mt-3 md:mt-4 leading-relaxed">
            Direct, plain-English breakdown of how data is handled on this website. Zero tracking cookies, zero sold data.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-8">
          <div className="border-3 border-[#1A1A2E] bg-white p-6 shadow-[4px_4px_0px_#1A1A2E]">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-5 h-5 text-[#FF6B35]" />
              <h2 className="font-mono font-extrabold text-lg text-[#1A1A2E]">1. Analytics & Telemetry</h2>
            </div>
            <p className="text-sm text-zinc-700 leading-relaxed font-medium">
              This site utilizes Cloudflare Web Analytics to monitor site health, page visit counts, and performance metrics. Cloudflare Web Analytics is privacy-centric, does not use client-side cookies, and does not track visitors across websites or collect personal identifiable information (PII).
            </p>
          </div>

          <div className="border-3 border-[#1A1A2E] bg-white p-6 shadow-[4px_4px_0px_#7C3AED]">
            <div className="flex items-center gap-3 mb-3">
              <Lock className="w-5 h-5 text-[#7C3AED]" />
              <h2 className="font-mono font-extrabold text-lg text-[#1A1A2E]">2. Cookies & Tracking</h2>
            </div>
            <p className="text-sm text-zinc-700 leading-relaxed font-medium">
              This portfolio sets zero marketing, tracking, or advertising cookies. No third-party ad networks or data brokers are integrated into this website.
            </p>
          </div>

          <div className="border-3 border-[#1A1A2E] bg-white p-6 shadow-[4px_4px_0px_#7C3AED]">
            <div className="flex items-center gap-3 mb-3">
              <Server className="w-5 h-5 text-[#7C3AED]" />
              <h2 className="font-mono font-extrabold text-lg text-[#1A1A2E]">3. Infrastructure & Hosting</h2>
            </div>
            <p className="text-sm text-zinc-700 leading-relaxed font-medium">
              Static site assets are securely hosted on Amazon S3 and delivered globally via Amazon CloudFront CDN. Edge server logs may collect standard web server data (IP addresses and user agent strings) strictly for security throttling, DDoS prevention, and rate-limiting.
            </p>
          </div>

          <div className="border-3 border-[#1A1A2E] bg-white p-6 shadow-[4px_4px_0px_#FF6B35]">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-5 h-5 text-[#FF6B35]" />
              <h2 className="font-mono font-extrabold text-lg text-[#1A1A2E]">4. Inquiries & Contact</h2>
            </div>
            <p className="text-sm text-zinc-700 leading-relaxed font-medium">
              When you send an email directly or use the mailto dispatch link, your email address and message content are used exclusively to respond to your inquiry. Your contact information is never shared or sold.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </GrainOverlay>
  );
}
