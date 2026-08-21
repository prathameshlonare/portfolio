"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, FileDown } from "lucide-react";
import { NeoButton } from "@/components/anti-ux/neo-button";
import { TransitionLink } from "@/components/layout/transition-link";


const NAV_LINKS = [
  { label: "WORK", href: "/work/", badge: "01" },
  { label: "ABOUT", href: "/about/", badge: "02" },
  { label: "STACK", href: "/stack/", badge: "03" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement | null>(null);

  // Move focus into menu on open, return to hamburger on close
  useEffect(() => {
    if (mobileMenuOpen) {
      requestAnimationFrame(() => firstMenuItemRef.current?.focus());
    } else {
      // Only return focus if the menu was previously open (not on initial mount)
      hamburgerRef.current?.blur(); // let blur happen naturally
    }
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-2 md:top-4 z-50 w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-8 mb-6 md:mb-8">
      <div className="bg-white border-3 border-[#1A1A2E] shadow-[4px_4px_0px_#1A1A2E] md:shadow-[6px_6px_0px_#1A1A2E] px-3 py-2.5 md:px-6 md:py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <TransitionLink href="/" className="flex items-center gap-2 md:gap-3 group">
          <div className="w-8 h-8 md:w-9 md:h-9 bg-[#FF6B35] border-2 border-[#1A1A2E] flex items-center justify-center text-white font-mono font-black text-lg md:text-xl shadow-[2px_2px_0px_#1A1A2E] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            P
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-extrabold text-xs md:text-sm tracking-wider uppercase text-[#1A1A2E]">
              PRATHAMESH.DEV
            </span>
            <span className="font-mono text-[9px] md:text-[10px] text-zinc-500 font-semibold uppercase -mt-0.5">
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
                className={`border-2 border-[#1A1A2E] font-mono font-bold text-xs px-3.5 py-1.5 shadow-[2px_2px_0px_#1A1A2E] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#1A1A2E] flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#FF6B35] text-white"
                    : "bg-[#FAFAFA] text-[#1A1A2E]"
                }`}
              >
                <span className="text-[10px] opacity-60 font-semibold">{link.badge}</span>
                {link.label}
              </TransitionLink>
            );
          })}

          <a
            href="/prathamesh_lonare_resume.pdf"
            download="Prathamesh_Lonare_Resume.pdf"
            className="border-2 border-[#1A1A2E] bg-[#FAFAFA] text-[#1A1A2E] font-mono font-bold text-xs px-3.5 py-1.5 shadow-[2px_2px_0px_#1A1A2E] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#1A1A2E] flex items-center gap-1.5"
          >
            <FileDown className="w-3.5 h-3.5" /> RESUME
          </a>

          <TransitionLink href="/contact/">
            <NeoButton variant="primary" className="py-1.5 px-4 text-xs font-mono">
              Let&apos;s Talk <ArrowUpRight className="w-3.5 h-3.5" />
            </NeoButton>
          </TransitionLink>
        </nav>

        {/* Mobile Toggle */}
        <button
          ref={hamburgerRef}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden border-2 border-[#1A1A2E] bg-[#FAFAFA] p-2.5 shadow-[2px_2px_0px_#1A1A2E]"
          aria-label="Toggle Navigation"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "max-h-[450px] opacity-100 mt-2 pointer-events-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
        onKeyDown={(e) => {
          if (e.key === "Escape") setMobileMenuOpen(false);
        }}
      >
        <div className="bg-white border-3 border-[#1A1A2E] shadow-[4px_4px_0px_#FF6B35] md:shadow-[6px_6px_0px_#FF6B35] p-3 md:p-4 flex flex-col gap-2 md:gap-3">
          {NAV_LINKS.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <TransitionLink
                key={link.label}
                ref={idx === 0 ? firstMenuItemRef : undefined}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`border-2 border-[#1A1A2E] font-mono font-bold text-sm py-3.5 px-4 flex justify-between items-center min-h-[48px] ${
                  isActive
                    ? "bg-[#FF6B35] text-white shadow-[2px_2px_0px_#1A1A2E]"
                    : "bg-[#FAFAFA] text-[#1A1A2E] active:bg-[#FF6B35] active:text-white"
                }`}
              >
                <span>{link.label}</span>
                <span className={`text-xs font-mono ${isActive ? "text-white" : "text-[#FF6B35]"}`}>{link.badge}</span>
              </TransitionLink>
            );
          })}
          <a
            href="/prathamesh_lonare_resume.pdf"
            download="Prathamesh_Lonare_Resume.pdf"
            onClick={() => setMobileMenuOpen(false)}
            className="border-2 border-[#1A1A2E] bg-[#FAFAFA] text-[#1A1A2E] font-mono font-bold text-sm py-3.5 px-4 flex justify-between items-center min-h-[48px] active:bg-[#FF6B35] active:text-white"
          >
            <span className="flex items-center gap-2">
              <FileDown className="w-4 h-4" /> RESUME
            </span>
            <span className="text-xs font-mono text-zinc-500">PDF</span>
          </a>
          <TransitionLink href="/contact/" onClick={() => setMobileMenuOpen(false)}>
            <NeoButton variant="primary" className="w-full py-3.5 font-mono text-sm min-h-[48px]">
              Let&apos;s Talk <ArrowUpRight className="w-4 h-4" />
            </NeoButton>
          </TransitionLink>
        </div>
      </div>
    </header>
  );
}



