"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { NeoCard } from "@/components/anti-ux/neo-card";
import { NeoButton } from "@/components/anti-ux/neo-button";
import { ExternalLink, CheckCircle, AlertTriangle, Cpu, Terminal, ArrowUpRight, X, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";

export interface CaseStudyProps {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  problem: string;
  role: string;
  method: string[];
  outcome: string[];
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  showDiagram?: boolean;
  images?: { src: string; alt: string }[];
}

export function CaseStudyDetail({
  id,
  title,
  subtitle,
  year,
  problem,
  role,
  method,
  outcome,
  tech,
  githubUrl,
  liveUrl,
  images = [],
}: CaseStudyProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showImages, setShowImages] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openLightbox = (index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setLightboxIndex(index);
  };
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    // Return focus to the thumbnail that opened the lightbox
    triggerRef.current?.focus();
  }, []);
  const prevImage = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : images.length - 1));
  const nextImage = () => setLightboxIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : 0));

  useEffect(() => {
    if (lightboxIndex === null) return;

    // Move focus into the lightbox
    requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeLightbox(); return; }
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : images.length - 1));
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : 0));

      // Focus trap: cycle Tab/Shift+Tab within the interactive elements
      if (e.key === "Tab") {
        const focusable = document.querySelectorAll<HTMLElement>(
          "[data-lightbox-focusable]"
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, images.length, closeLightbox]);

  return (
    <div id={id} className="w-full max-w-7xl mx-auto my-8 sm:my-10 md:my-12 scroll-mt-24">
      <NeoCard variant="orange" className="p-4 sm:p-5 md:p-6 lg:p-10">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-3 border-[#1A1A2E] pb-4 sm:pb-6 mb-6 md:mb-8 gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
              <span className="font-mono text-[10px] sm:text-xs font-black bg-[#1A1A2E] text-white px-2 py-0.5 sm:px-2.5 sm:py-1">
                CASE STUDY
              </span>
              <MonoLabel className="text-[#FF6B35] font-bold text-[10px] sm:text-xs">{subtitle}</MonoLabel>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-black text-[#1A1A2E] tracking-tight">{title}</h2>
          </div>
          <span className="font-mono text-xs sm:text-sm md:text-base font-extrabold text-[#7C3AED] bg-purple-50 border-2 border-[#1A1A2E] px-2.5 sm:px-3 py-0.5 sm:py-1 shadow-[2px_2px_0px_#1A1A2E] self-start md:self-auto">
            YEAR {year}
          </span>
        </div>

        {/* Image Gallery: Collapsible */}
        {images.length > 0 && (
          <div className="border-2 border-[#1A1A2E] bg-white shadow-[3px_3px_0px_#1A1A2E] md:shadow-[4px_4px_0px_#1A1A2E] mb-6 md:mb-8">
            <button
              onClick={() => setShowImages(!showImages)}
              className="w-full flex items-center justify-between p-3 cursor-pointer min-h-[44px]"
            >
              <MonoLabel className="text-[#FF6B35]">SCREENSHOTS & DIAGRAMS ({images.length})</MonoLabel>
              <ChevronDown className={`w-5 h-5 text-[#1A1A2E] transition-transform ${showImages ? "rotate-180" : ""}`} />
            </button>
            {showImages && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 p-3 pt-0">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => openLightbox(idx, e.currentTarget)}
                    aria-label={`View ${img.alt} in image viewer`}
                    className="min-h-[48px] border-2 border-[#1A1A2E] shadow-[2px_2px_0px_#FF6B35] transition-transform cursor-pointer bg-[#FAFAFA] overflow-hidden aspect-video hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px]"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-start mb-4 sm:mb-6">
          {/* Left Column: Problem & Role (Collapsible on Mobile, Always Visible on Desktop) */}
          <div className={`lg:col-span-6 flex flex-col gap-4 md:gap-6 ${showDetails ? "flex" : "hidden lg:flex"}`}>
            {/* Problem */}
            <div className="border-2 border-[#1A1A2E] bg-[#FAFAFA] p-3.5 sm:p-4 md:p-5 shadow-[3px_3px_0px_#1A1A2E] md:shadow-[4px_4px_0px_#1A1A2E]">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-[#FF6B35] shrink-0" />
                <MonoLabel className="text-[#FF6B35]">01 / THE PROBLEM</MonoLabel>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-zinc-700 font-medium leading-relaxed">{problem}</p>
            </div>

            {/* Role */}
            <div className="border-2 border-[#1A1A2E] bg-white p-3.5 sm:p-4 md:p-5 shadow-[3px_3px_0px_#7C3AED] md:shadow-[4px_4px_0px_#7C3AED]">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-[#7C3AED] shrink-0" />
                <MonoLabel className="text-[#7C3AED]">02 / MY ROLE & OWNERSHIP</MonoLabel>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-zinc-700 font-medium leading-relaxed">{role}</p>
            </div>
          </div>

          {/* Right Column: Method & Outcome */}
          <div className="lg:col-span-6 flex flex-col gap-4 md:gap-6">
            {/* Method (Collapsible on Mobile, Always Visible on Desktop) */}
            <div className={`border-2 border-[#1A1A2E] bg-white p-3.5 sm:p-4 md:p-5 shadow-[3px_3px_0px_#1A1A2E] md:shadow-[4px_4px_0px_#1A1A2E] ${showDetails ? "block" : "hidden lg:block"}`}>
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="w-4 h-4 text-[#1A1A2E] shrink-0" />
                <MonoLabel className="text-[#1A1A2E]">03 / METHOD & ARCHITECTURE</MonoLabel>
              </div>
              <ul className="flex flex-col gap-2 font-mono text-[11px] md:text-xs text-zinc-700 font-bold">
                {method.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#FF6B35] font-black shrink-0">❯</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcome: High Signal (Always Visible on Mobile & Desktop) */}
            <div className="border-2 border-[#1A1A2E] bg-[#FAFAFA] p-3.5 sm:p-4 md:p-5 shadow-[3px_3px_0px_#FF6B35] md:shadow-[4px_4px_0px_#FF6B35]">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <MonoLabel className="text-emerald-700">04 / MEASURABLE OUTCOMES</MonoLabel>
              </div>
              <ul className="flex flex-col gap-2 font-mono text-[11px] md:text-xs text-zinc-800 font-extrabold">
                {outcome.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-black shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Progressive Disclosure Toggle */}
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          aria-expanded={showDetails}
          className="lg:hidden w-full flex items-center justify-between py-2.5 px-3.5 mb-5 border-2 border-[#1A1A2E] bg-white hover:bg-[#FAFAFA] shadow-[2px_2px_0px_#1A1A2E] active:translate-x-0.5 active:translate-y-0.5 font-mono text-xs font-black text-[#1A1A2E] cursor-pointer transition-all min-h-[44px]"
        >
          <span className="flex items-center gap-2 text-left">
            <span className="text-[#FF6B35] font-black">{showDetails ? "[-]" : "[+]"}</span>
            <span>{showDetails ? "HIDE ARCHITECTURE & PROBLEM" : "VIEW ARCHITECTURE & METHOD"}</span>
          </span>
          <span className="text-[10px] text-zinc-600 bg-zinc-100 border border-[#1A1A2E] px-2 py-0.5 font-bold shrink-0">
            {showDetails ? "COLLAPSE" : `${method.length} BULLETS`}
          </span>
        </button>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-4 border-t-2 border-[#1A1A2E] mb-6">
          <MonoLabel className="mr-1 sm:mr-2 text-[10px] sm:text-xs">TECH DEPLOYED:</MonoLabel>
          {/* On mobile: if collapsed show first 5, if expanded show all */}
          {(showDetails ? tech : tech.slice(0, 5)).map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] md:text-xs font-bold text-[#1A1A2E] bg-[#FAFAFA] border-2 border-[#1A1A2E] px-2 md:px-3 py-0.5 md:py-1 shadow-[2px_2px_0px_#FF6B35]"
            >
              {t}
            </span>
          ))}
          {/* On mobile when collapsed: badge showing count of remaining chips */}
          {!showDetails && tech.length > 5 && (
            <span className="lg:hidden font-mono text-[10px] font-bold text-zinc-600 bg-zinc-100 border border-zinc-400 px-2 py-0.5">
              +{tech.length - 5} more
            </span>
          )}
          {/* On desktop: always show remaining chips */}
          {!showDetails && tech.slice(5).map((t) => (
            <span
              key={t}
              className="hidden lg:inline-flex font-mono text-[10px] md:text-xs font-bold text-[#1A1A2E] bg-[#FAFAFA] border-2 border-[#1A1A2E] px-2 md:px-3 py-0.5 md:py-1 shadow-[2px_2px_0px_#FF6B35]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links CTAs */}
        <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <NeoButton variant="secondary" className="font-mono text-xs min-h-[44px]">
                <GithubIcon className="w-4 h-4" /> [inspect_source_code]
              </NeoButton>
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <NeoButton variant="primary" className="font-mono text-xs min-h-[44px]">
                <ExternalLink className="w-4 h-4" /> [view_live_demo] <ArrowUpRight className="w-3.5 h-3.5" />
              </NeoButton>
            </a>
          )}
        </div>
      </NeoCard>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && typeof document !== "undefined" && document.body && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Image preview: ${images[lightboxIndex]?.alt || "Case study image"}`}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Prev arrow: left side (first focusable) */}
          <button
            data-lightbox-focusable
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <img
            src={images[lightboxIndex].src}
            alt={images[lightboxIndex].alt}
            className="max-w-[92vw] md:max-w-[85vw] max-h-[75vh] md:max-h-[85vh] object-contain border-2 border-[#1A1A2E]"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next arrow: right side */}
          <button
            data-lightbox-focusable
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Close button: receives initial focus, last in trap cycle */}
          <button
            ref={closeButtonRef}
            data-lightbox-focusable
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white z-10"
            aria-label="Close lightbox"
          >
            <X className="w-7 h-7 md:w-8 md:h-8" />
          </button>

          <div className="absolute bottom-4 text-white/70 font-mono text-sm">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
