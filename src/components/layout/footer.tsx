"use client";

import { useEffect, useState } from "react";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { Mail, MapPin, Clock, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { VisitorTelemetry } from "@/components/sections/visitor-telemetry";

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(() => new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-8 md:pt-12 pb-12 md:pb-16 mt-12 md:mt-20 border-t-3 border-[#1A1A2E]">
      <div className="bg-white border-3 border-[#1A1A2E] shadow-[4px_4px_0px_#1A1A2E] md:shadow-[6px_6px_0px_#1A1A2E] p-4 md:p-6 lg:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
        {/* Left Column: Brand & Status */}
        <div className="md:col-span-6 flex flex-col gap-3 md:gap-4">
          <div className="flex items-center gap-2.5 md:gap-3">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-[#FF6B35] border-2 border-[#1A1A2E] flex items-center justify-center text-white font-mono font-bold text-sm">
              P
            </div>
            <span className="font-mono font-black text-sm md:text-base text-[#1A1A2E] tracking-wider uppercase">
              PRATHAMESH LONARE
            </span>
          </div>

          <p className="text-xs md:text-sm font-medium text-zinc-600 max-w-md">
            Architecting infrastructure as code, CI/CD automation pipelines, and serverless backends on AWS.
          </p>

          <div className="flex flex-wrap gap-2.5 md:gap-4 pt-1 md:pt-2 font-mono text-[10px] md:text-xs">
            <div className="flex items-center gap-1.5 md:gap-2 bg-emerald-50 border border-emerald-300 text-emerald-800 px-2.5 py-1 md:px-3 font-semibold">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Open for Cloud / DevOps Roles
            </div>
            <div className="flex items-center gap-1 md:gap-1.5 bg-zinc-100 border border-zinc-300 text-zinc-700 px-2.5 py-1 md:px-3 font-semibold">
              <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#FF6B35]" /> Akot, India
            </div>
            <div className="flex items-center gap-1 md:gap-1.5 bg-zinc-100 border border-zinc-300 text-zinc-700 px-2.5 py-1 md:px-3 font-semibold">
              <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#7C3AED]" /> IST (UTC+5:30)
            </div>
          </div>
        </div>

        {/* Right Column: Social Links */}
        <div className="md:col-span-6 flex flex-col md:items-end gap-3 md:gap-4">
          <MonoLabel>Social Systems & Code</MonoLabel>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <a
              href="https://github.com/prathameshlonare"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-[#1A1A2E] bg-[#FAFAFA] hover:bg-[#1A1A2E] hover:text-white font-mono font-bold text-[10px] md:text-xs px-3 py-1.5 md:px-4 md:py-2 shadow-[2px_2px_0px_#1A1A2E] md:shadow-[3px_3px_0px_#1A1A2E] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 flex items-center gap-1.5 md:gap-2"
            >
              <GithubIcon className="w-3.5 h-3.5 md:w-4 md:h-4" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/prathamesh-lonare21/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-[#1A1A2E] bg-[#FAFAFA] hover:bg-[#7C3AED] hover:text-white font-mono font-bold text-[10px] md:text-xs px-3 py-1.5 md:px-4 md:py-2 shadow-[2px_2px_0px_#1A1A2E] md:shadow-[3px_3px_0px_#1A1A2E] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 flex items-center gap-1.5 md:gap-2"
            >
              <LinkedinIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#0077B5]" /> LinkedIn
            </a>
            <a
              href="mailto:prathameshlonare9@gmail.com"
              className="border-2 border-[#1A1A2E] bg-[#FF6B35] text-white font-mono font-bold text-[10px] md:text-xs px-3 py-1.5 md:px-4 md:py-2 shadow-[2px_2px_0px_#1A1A2E] md:shadow-[3px_3px_0px_#1A1A2E] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 flex items-center gap-1.5 md:gap-2"
            >
              <Mail className="w-3.5 h-3.5 md:w-4 md:h-4" /> Email Me
            </a>
          </div>
        </div>
      </div>

      <VisitorTelemetry />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-3 md:mt-4 font-mono text-[10px] md:text-xs text-zinc-500">
        <span>© {currentYear} Prathamesh Lonare. Built with Next.js 16 &amp; Tailwind.</span>
        <div className="flex items-center gap-4">
          <a href="/privacy/" className="hover:text-[#FF6B35] underline transition-colors">Privacy Policy</a>
          <span className="hidden sm:inline">Engineered for speed &amp; reliability</span>
        </div>
      </div>
    </footer>
  );
}
