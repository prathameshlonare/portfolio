import { Metadata } from "next";
import { GrainOverlay } from "@/components/anti-ux/grain-overlay";
import { Navigation } from "@/components/layout/navigation";
import { ViewportType } from "@/components/anti-ux/viewport-type";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { NeoCard } from "@/components/anti-ux/neo-card";
import { Spotlight } from "@/components/animated/spotlight";
import { NumberTicker } from "@/components/animated/number-ticker";
import { Footer } from "@/components/layout/footer";
import { Circle } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Prathamesh Lonare | DevOps & Cloud Systems Engineer",
  description:
    "Learn about Prathamesh's journey, engineering philosophy, B.Tech background, and principles for building cloud infrastructure and DevOps pipelines.",
  alternates: {
    canonical: "https://prathameshlonare.me/about/",
  },
};

export default function AboutPage() {
  return (
    <GrainOverlay className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#1A1A2E] overflow-x-hidden">
      <Navigation />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 w-full">
        {/* Page Banner */}
        <div className="border-b-3 border-[#1A1A2E] pb-6 md:pb-8 mb-8 md:mb-12">
          <MonoLabel className="text-[#FF6B35] font-bold">SYSTEMS ENGINEER & ARCHITECT</MonoLabel>
          <ViewportType as="h1" className="text-[var(--text-page)] font-black mt-2">
            ABOUT <span className="text-[#FF6B35]">PRATHAMESH</span>
          </ViewportType>
        </div>

        {/* Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start mb-12 md:mb-16">
          {/* Left Column: Spotlight Photo Card */}
          <div className="lg:col-span-5">
            <div className="relative border-3 border-[#1A1A2E] bg-white shadow-[4px_4px_0px_#FF6B35] md:shadow-[8px_8px_0px_#FF6B35] p-4 md:p-6 overflow-hidden">
              <Spotlight fill="#FF6B35" />

              <div className="w-full aspect-square border-2 border-[#1A1A2E] shadow-[4px_4px_0px_#7C3AED] relative z-30 overflow-hidden">
                <img
                  src="/profile.png"
                  alt="Prathamesh Lonare"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-6 flex flex-col gap-2 font-mono text-xs text-zinc-700 font-semibold z-30 relative">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <span className="text-zinc-500">Degree:</span>
                  <span className="font-bold text-[#1A1A2E]">B.Tech Computer Science</span>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <span className="text-zinc-500">Location:</span>
                  <span className="font-bold text-[#1A1A2E]">Akot, India</span>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <span className="text-zinc-500">Status:</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1"><Circle className="w-3 h-3 fill-emerald-500" /> Open for Work</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Bio */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <MonoLabel className="text-[#7C3AED]">BACKGROUND & PHILOSOPHY</MonoLabel>

            <h2 className="text-[var(--text-section)] font-extrabold text-[#1A1A2E] leading-snug">
              I find the edge cases in deployment pipelines weirdly fascinating.
            </h2>

            <p className="text-base md:text-lg text-zinc-700 font-medium leading-relaxed">
              I am a B.Tech Computer Science graduate specializing in cloud infrastructure automation, Infrastructure as Code (IaC) with Terraform, and serverless architectures on AWS.
            </p>

            <p className="text-base text-zinc-700 font-medium leading-relaxed">
              My core philosophy centers on building automated deployment pipelines that eliminate human error. Whether provisioning AWS Lambda endpoints, configuring DynamoDB databases, or writing CI/CD workflows in GitHub Actions, I focus on system reliability, speed, and cost efficiency.
            </p>

            {/* Metrics Cards */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 pt-4">
              <div className="border-2 border-[#1A1A2E] bg-white p-2.5 md:p-4 shadow-[2px_2px_0px_#1A1A2E] md:shadow-[3px_3px_0px_#1A1A2E] text-center">
                <div className="font-mono text-xl md:text-2xl lg:text-3xl font-black text-[#FF6B35]">
                  <NumberTicker value={7.5} decimalPlaces={1} />
                </div>
                <MonoLabel className="text-[8px] md:text-[10px] block mt-1">B.TECH CGPA</MonoLabel>
              </div>

              <div className="border-2 border-[#1A1A2E] bg-white p-2.5 md:p-4 shadow-[2px_2px_0px_#7C3AED] md:shadow-[3px_3px_0px_#7C3AED] text-center">
                <div className="font-mono text-xl md:text-2xl lg:text-3xl font-black text-[#7C3AED]">
                  <NumberTicker value={41} />
                </div>
                <MonoLabel className="text-[8px] md:text-[10px] block mt-1">LAMBDA ENDPOINTS</MonoLabel>
              </div>

              <div className="border-2 border-[#1A1A2E] bg-white p-2.5 md:p-4 shadow-[2px_2px_0px_#FF6B35] md:shadow-[3px_3px_0px_#FF6B35] text-center">
                <div className="font-mono text-xl md:text-2xl lg:text-3xl font-black text-[#1A1A2E]">
                  <NumberTicker value={500} suffix="+" />
                </div>
                <MonoLabel className="text-[8px] md:text-[10px] block mt-1">USERS SERVED</MonoLabel>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Principles */}
        <section className="my-12 md:my-16">
          <MonoLabel className="text-[#FF6B35] mb-4 block">HOW I THINK — 3 CORE PRINCIPLES</MonoLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <NeoCard variant="orange">
              <div className="w-10 h-10 bg-[#FF6B35] text-white border-2 border-[#1A1A2E] shadow-[2px_2px_0px_#1A1A2E] flex items-center justify-center font-mono font-black text-lg mb-4">
                01
              </div>
              <h3 className="font-extrabold text-xl mb-2 text-[#1A1A2E]">Automate before scaling</h3>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                Manual deployments don&apos;t scale. Everything must be defined as code in Terraform or CloudFormation before adding traffic.
              </p>
            </NeoCard>

            <NeoCard variant="purple">
              <div className="w-10 h-10 bg-[#7C3AED] text-white border-2 border-[#1A1A2E] shadow-[2px_2px_0px_#1A1A2E] flex items-center justify-center font-mono font-black text-lg mb-4">
                02
              </div>
              <h3 className="font-extrabold text-xl mb-2 text-[#1A1A2E]">Measure before trusting</h3>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                Opinions don&apos;t matter in infrastructure. P99 latency, error rates, and CloudWatch metrics dictate deployment decisions.
              </p>
            </NeoCard>

            <NeoCard variant="orange">
              <div className="w-10 h-10 bg-[#1A1A2E] text-white border-2 border-[#1A1A2E] shadow-[2px_2px_0px_#FF6B35] flex items-center justify-center font-mono font-black text-lg mb-4">
                03
              </div>
              <h3 className="font-extrabold text-xl mb-2 text-[#1A1A2E]">Simplify before adding</h3>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                The best infrastructure is the one you don&apos;t have to manage. Prefer serverless Lambda and DynamoDB over heavy VMs.
              </p>
            </NeoCard>
          </div>
        </section>
      </main>

      <Footer />
    </GrainOverlay>
  );
}
