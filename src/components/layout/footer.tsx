"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { TransitionLink } from "@/components/layout/transition-link";

const CLOUDFLARE_WORKER_URL = "https://portfolio-counter.prathameshlonare9.workers.dev/";
const POLL_MS = 30000;

/* Mobile-first: base classes are the 360px design.
   sm:/lg: prefixes only upgrade — nothing is squeezed down. */
const headCls =
  "font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-1";
const linkCls =
  "block py-2.5 text-[15px] font-medium text-zinc-200 hover:text-[#FF6B35] active:text-[#FF6B35] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35] sm:py-1.5 sm:text-sm";
const numCls = "font-mono text-[10px] text-[#FF6B35] mr-2.5";

async function fetchStatus(signal?: AbortSignal) {
  const res = await fetch(CLOUDFLARE_WORKER_URL, { signal });
  return (await res.json()) as {
    unique_visitors?: unknown;
    active_viewers?: unknown;
  };
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [uniqueVisitors, setUniqueVisitors] = useState<number | null>(null);
  const [activeViewers, setActiveViewers] = useState<number | null>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  /* Mobile auto-fit: shrink the giant name until it sits fully inside
     the viewport. Runs only below sm; desktop keeps its display size. */
  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    const fit = () => {
      if (window.innerWidth >= 640) {
        el.style.fontSize = "";
        return;
      }
      el.style.fontSize = "";
      let size = parseFloat(getComputedStyle(el).fontSize);
      let guard = 60;
      while (el.scrollWidth > el.clientWidth && size > 20 && guard-- > 0) {
        size -= 1;
        el.style.fontSize = `${size}px`;
      }
    };
    fit();
    window.addEventListener("resize", fit);
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(fit).catch(() => {});
    }
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    let alive = true;
    const ctrl = new AbortController();

    const apply = (data: Awaited<ReturnType<typeof fetchStatus>>) => {
      if (!alive || !data) return;
      if (typeof data.unique_visitors === "number") {
        setUniqueVisitors(data.unique_visitors);
      }
      if (typeof data.active_viewers === "number") {
        setActiveViewers(data.active_viewers);
      }
    };

    fetchStatus(ctrl.signal).then(apply).catch(() => {});

    const interval = window.setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState !== "visible") {
        return;
      }
      fetchStatus(ctrl.signal).then(apply).catch(() => {});
    }, POLL_MS);

    return () => {
      alive = false;
      window.clearInterval(interval);
      ctrl.abort();
    };
  }, []);

  const scrollTop = () => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <footer
      aria-label="Site footer"
      className="pagefoot mt-12 md:mt-16 overflow-hidden bg-[#1A1A2E] text-white border-t-4 border-[#FF6B35]"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
        {/* Telemetry strip — wraps to two rows on mobile, one row on desktop */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-b-2 border-white/15 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.15em]">
          <span className="text-[#FF6B35]">{"/// END OF TRANSMISSION"}</span>
          <span className="text-zinc-400">AKOT 20.70N 77.06E · IST</span>
          <span
            className="flex w-full items-center gap-1.5 text-zinc-200 sm:ml-auto sm:w-auto"
            aria-live="polite"
          >
            <span className="w-2 h-2 bg-emerald-500" aria-hidden="true" />
            {activeViewers !== null ? (
              <span>{activeViewers} live now</span>
            ) : (
              <span>Status: operational</span>
            )}
          </span>
        </div>

        {/* Sitemap — one stacked column on mobile, 2-col on sm, 4-col on lg */}
        <div className="grid grid-cols-1 gap-7 py-7 sm:grid-cols-2 sm:gap-6 sm:py-8 lg:grid-cols-4 lg:gap-8 lg:py-10">
          <nav aria-label="Recent work">
            <h2 className={headCls}>
              <span className="text-[#FF6B35]">01 / </span>[ Recent work ]
            </h2>
            <ul className="flex flex-col">
              <li>
                <TransitionLink href="/work/#duokart" className={linkCls}>
                  <span className={numCls}>→</span>
                  DuoKart Multi-Tier
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/work/#dorm-dish" className={linkCls}>
                  <span className={numCls}>→</span>
                  Dorm-Dish APIs
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/work/#sysadmin-toolkit" className={linkCls}>
                  <span className={numCls}>→</span>
                  SysAdmin Automation
                </TransitionLink>
              </li>
            </ul>
          </nav>

          <nav aria-label="Portfolio">
            <h2 className={headCls}>
              <span className="text-[#FF6B35]">02 / </span>[ Portfolio ]
            </h2>
            <ul className="flex flex-col">
              <li>
                <TransitionLink href="/work/" className={linkCls}>
                  Work &amp; Case Studies
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/stack/" className={linkCls}>
                  Cloud Stack
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/about/" className={linkCls}>
                  About
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/contact/" className={linkCls}>
                  Contact
                </TransitionLink>
              </li>
            </ul>
          </nav>

          <nav aria-label="Connect">
            <h2 className={headCls}>
              <span className="text-[#FF6B35]">03 / </span>[ Connect ]
            </h2>
            <ul className="flex flex-col">
              <li>
                <a
                  href="https://github.com/prathameshlonare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 ${linkCls}`}
                >
                  <GithubIcon className="w-4 h-4" /> GitHub
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6B35]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/prathamesh-lonare21/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 ${linkCls}`}
                >
                  <LinkedinIcon className="w-4 h-4" /> LinkedIn
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6B35]" />
                </a>
              </li>
              <li>
                <a href="mailto:prathameshlonare9@gmail.com" className={linkCls}>
                  Email me directly
                </a>
              </li>
            </ul>
          </nav>

          <section aria-label="Status">
            <h2 className={headCls}>
              <span className="text-[#FF6B35]">04 / </span>[ Status ]
            </h2>
            <div className="border-2 border-white/20 bg-white/5 px-3 py-3">
              <p className="font-mono text-[11px] leading-relaxed">
                <span className="text-zinc-400">DEPLOYS — </span>
                <span className="font-bold text-white">BORING &amp; PREDICTABLE</span>
              </p>
              <p className="mt-1.5 font-mono text-[11px] text-zinc-400">
                S3 + CloudFront · eu-north-1
              </p>
              {uniqueVisitors !== null && (
                <p className="mt-1.5 border-t border-white/10 pt-1.5 font-mono text-[11px] text-zinc-400">
                  {uniqueVisitors} visits counted
                </p>
              )}
            </div>
          </section>
        </div>

        {/* Giant brand hit — stamps stacked clear of each other on mobile */}
        <div className="relative" aria-hidden="true">
          <span className="absolute left-0 top-0 z-10 hidden font-mono text-[10px] font-bold bg-white text-[#1A1A2E] border-2 border-white shadow-[2px_2px_0px_#FF6B35] px-2 py-0.5 sm:block">
            SCROLL END: YOU MADE IT
          </span>
          <span className="absolute right-0 top-2 z-10 hidden rotate-6 font-mono text-[11px] font-bold bg-[#FF6B35] text-white border-2 border-white shadow-[3px_3px_0px_rgba(255,255,255,0.25)] px-3 py-1.5 sm:block">
            OPEN TO WORK
          </span>
          <div
            ref={nameRef}
            className="font-sans font-black whitespace-nowrap select-none text-[#FAFAFA] leading-[0.84] tracking-[-0.03em] text-[10vw] sm:text-[clamp(4rem,14vw,13.75rem)] h-auto overflow-visible sm:h-[0.62em] sm:overflow-hidden"
          >
            <span style={{ textShadow: "0.05em 0.05em 0 #FF6B35" }}>PRATHAMESH</span>
          </div>
        </div>

        {/* Legal bar — stacked + full-width thumb button on mobile */}
        <div className="flex flex-col items-stretch gap-3 border-t-2 border-white/15 py-5 text-center font-mono text-[11px] sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <span className="font-bold text-zinc-300">
            © {currentYear} Prathamesh Lonare
            <span className="mt-0.5 block text-zinc-500 sm:mt-0 sm:inline">
              {" "}— boring and predictable deploys
            </span>
          </span>
          <button
            type="button"
            onClick={scrollTop}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-1.5 border-2 border-[#FAFAFA] bg-[#FF6B35] px-4 py-2 font-bold text-white shadow-[2px_2px_0px_rgba(250,250,250,0.35)] hover:bg-[#FAFAFA] hover:text-[#1A1A2E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35] transition-colors sm:w-auto sm:min-h-0"
          >
            <ArrowUp className="w-4 h-4" /> BACK TO TOP
          </button>
        </div>
      </div>
      <div className="h-1 bg-[#FF6B35]" aria-hidden="true" />
    </footer>
  );
}
