"use client";

import { ViewportType } from "@/components/anti-ux/viewport-type";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { NeoButton } from "@/components/anti-ux/neo-button";

import { LazyGlobe } from "@/components/animated/lazy-globe";
import { GsapHeroEntrance } from "@/components/animated/gsap-hero-entrance";
import { ArrowRight, Terminal, Cloud, ShieldCheck, FileDown } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <GsapHeroEntrance>
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & Content */}
          <div className="lg:col-span-7 flex flex-col gap-5 md:gap-6 relative z-10">
            <div className="flex items-center gap-3 gsap-badge">
              <MonoLabel className="text-[#FF6B35] flex items-center gap-2 bg-amber-100 border border-[#1A1A2E] px-2.5 py-1 md:px-3 shadow-[2px_2px_0px_#1A1A2E] text-[10px] md:text-xs">
                <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                DEV-OPS ARCHITECTURE 2026
              </MonoLabel>
            </div>

            <div className="flex flex-col gsap-title">
              <ViewportType as="h1" className="text-[var(--text-hero)]">
                PRATHAMESH
              </ViewportType>
              <ViewportType as="div" className="text-[#FF6B35] text-[var(--text-hero)]">
                LONARE
              </ViewportType>
            </div>

            <div className="text-base sm:text-lg md:text-[var(--text-lead)] font-bold text-[#1A1A2E] leading-snug gsap-tagline">
              I make cloud deploys{" "}
              <em className="not-italic bg-[#FF6B35] text-white px-1.5 py-0.5 md:px-2 md:py-0.5 border-2 border-[#1A1A2E] shadow-[2px_2px_0px_#1A1A2E] inline-block">
                boring &amp; predictable.
              </em>
            </div>

            <p className="text-sm md:text-lg font-medium text-zinc-700 max-w-xl leading-relaxed gsap-tagline">
              DevOps Engineer specializing in AWS serverless infrastructure, Terraform IaC, container orchestration, and automated CI/CD pipelines.
            </p>

            {/* Monospace Stack Chips */}
            <div className="flex flex-wrap gap-1.5 md:gap-2 pt-2 gsap-tagline">
              {["AWS Lambda", "Terraform", "Docker", "GitHub Actions", "DynamoDB", "CloudFront"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] md:text-xs font-bold text-[#1A1A2E] bg-white border-2 border-[#1A1A2E] px-2 py-1 md:px-2.5 shadow-[2px_2px_0px_#FF6B35]"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 gsap-cta">
              <Link href="/work" className="w-full sm:w-auto">
                <NeoButton variant="primary" className="w-full sm:w-auto text-sm font-mono tracking-wider justify-center">
                  SEE THE WORK <ArrowRight className="w-4 h-4" />
                </NeoButton>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <NeoButton variant="secondary" className="w-full sm:w-auto text-sm font-mono tracking-wider justify-center">
                  <Terminal className="w-4 h-4" /> GET IN TOUCH
                </NeoButton>
              </Link>
               <Link
                href="/Prathamesh_lonare_resume.pdf"
                download="Prathamesh_Lonare_Resume.pdf"
                className="w-full sm:w-auto flex items-center justify-center gap-2 font-mono text-xs font-bold text-[#1A1A2E] bg-[#FAFAFA] border-2 border-[#1A1A2E] px-3 py-2.5 shadow-[2px_2px_0px_#1A1A2E] hover:bg-[#FF6B35] hover:text-white hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
              >
                <FileDown className="w-4 h-4" /> Resume PDF
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Canvas Globe */}
          <div className="lg:col-span-5 flex flex-col gap-3 md:gap-4 gsap-globe relative z-0 overflow-hidden">
            <div className="hidden md:block">
              <LazyGlobe />
            </div>

            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <div className="bg-white border-2 border-[#1A1A2E] shadow-[2px_2px_0px_#1A1A2E] md:shadow-[3px_3px_0px_#1A1A2E] p-2.5 md:p-3 flex items-center gap-2">
                <Cloud className="w-4 h-4 md:w-5 md:h-5 text-[#FF6B35]" />
                <div>
                  <div className="font-mono text-[10px] md:text-xs font-extrabold text-[#1A1A2E]">AWS SERVERLESS</div>
                  <div className="font-mono text-[9px] md:text-[10px] text-zinc-500">6 Lambda REST API</div>
                </div>
              </div>
              <div className="bg-white border-2 border-[#1A1A2E] shadow-[2px_2px_0px_#1A1A2E] md:shadow-[3px_3px_0px_#1A1A2E] p-2.5 md:p-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-[#7C3AED]" />
                <div>
                  <div className="font-mono text-[10px] md:text-xs font-extrabold text-[#1A1A2E]">ZERO DOWNTIME</div>
                  <div className="font-mono text-[9px] md:text-[10px] text-zinc-500">100% Automated CI/CD</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </GsapHeroEntrance>
  );
}
