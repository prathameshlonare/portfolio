"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, FileDown } from "lucide-react";
import { NeoButton } from "@/components/anti-ux/neo-button";
import { TransitionLink } from "@/components/layout/transition-link";


const NAV_LINKS = [
  { label: "WORK", href: "/work", badge: "01" },
  { label: "ABOUT", href: "/about", badge: "02" },
  { label: "STACK", href: "/stack", badge: "03" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-4 z-50 w-full max-w-7xl mx-auto px-4 md:px-8 mb-8">
      <div className="bg-white border-3 border-[#1A1A2E] shadow-[6px_6px_0px_#1A1A2E] px-4 py-3 md:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <TransitionLink href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-[#FF6B35] border-2 border-[#1A1A2E] flex items-center justify-center text-white font-mono font-black text-xl shadow-[2px_2px_0px_#1A1A2E] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
            P
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-extrabold text-sm tracking-wider uppercase text-[#1A1A2E]">
              PRATHAMESH.DEV
            </span>
            <span className="font-mono text-[10px] text-zinc-500 font-semibold uppercase -mt-0.5">
              Cloud &amp; DevOps Engineer
            </span>
          </div>
        </TransitionLink>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-3">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <TransitionLink
                key={link.label}
                href={link.href}
                className={`border-2 border-[#1A1A2E] font-mono font-bold text-xs px-3.5 py-1.5 shadow-[2px_2px_0px_#1A1A2E] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#FF6B35] text-white"
                    : "bg-[#FAFAFA] text-[#1A1A2E] hover:bg-[#FF6B35] hover:text-white"
                }`}
              >
                <span className="text-[10px] opacity-60 font-semibold">{link.badge}</span>
                {link.label}
              </TransitionLink>
            );
          })}

          <a
            href="/Prathamesh_lonare_resume.pdf"
            download="Prathamesh_Lonare_Resume.pdf"
            className="border-2 border-[#1A1A2E] bg-[#FAFAFA] text-[#1A1A2E] hover:bg-[#FF6B35] hover:text-white font-mono font-bold text-xs px-3.5 py-1.5 shadow-[2px_2px_0px_#1A1A2E] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 flex items-center gap-1.5"
          >
            <FileDown className="w-3.5 h-3.5" /> RESUME
          </a>

          <TransitionLink href="/contact">
            <NeoButton variant="primary" className="py-1.5 px-4 text-xs font-mono">
              Let&apos;s Talk <ArrowUpRight className="w-3.5 h-3.5" />
            </NeoButton>
          </TransitionLink>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden border-2 border-[#1A1A2E] bg-[#FAFAFA] p-2 shadow-[2px_2px_0px_#1A1A2E]"
          aria-label="Toggle Navigation"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer — max-h must exceed tallest content state (5 links + CTA ≈ 350px) */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-[400px] opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-3 border-[#1A1A2E] shadow-[6px_6px_0px_#FF6B35] p-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <TransitionLink
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`border-2 border-[#1A1A2E] font-mono font-bold text-sm p-3 flex justify-between items-center ${
                  isActive ? "bg-[#FF6B35] text-white" : "bg-[#FAFAFA]"
                }`}
              >
                <span>{link.label}</span>
                <span className={`text-xs font-mono ${isActive ? "text-white" : "text-[#FF6B35]"}`}>{link.badge}</span>
              </TransitionLink>
            );
          })}
          <TransitionLink href="/contact" onClick={() => setMobileMenuOpen(false)}>
            <NeoButton variant="primary" className="w-full py-3 font-mono text-sm">
              Let&apos;s Talk <ArrowUpRight className="w-4 h-4" />
            </NeoButton>
          </TransitionLink>
        </div>
      </div>
    </header>
  );
}



