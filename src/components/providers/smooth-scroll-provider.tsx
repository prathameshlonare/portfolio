"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Buttery wheel scrolling (Lenis) with zero idle cost.
 *
 * Mounts only when BOTH hold:
 * - fine pointer (desktop/laptop) — touch devices keep native inertia
 * - no prefers-reduced-motion
 *
 * Shares GSAP's ticker instead of a second rAF loop, so scroll reveals
 * and the smoother run on one clock. Real window scroll is preserved,
 * so sticky nav, ScrollTrigger, and anchor links keep working.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    let disposed = false;
    let removeTick: (() => void) | null = null;

    // Same-page hash links glide instead of jumping.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash.length < 2) return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenisRef.current?.scrollTo(target as HTMLElement);
    };

    (async () => {
      const { default: LenisCtor } = await import("lenis");
      if (disposed) return;
      const lenis = new LenisCtor({
        duration: 1.35,
        easing: (t: number) => 1 - Math.pow(1 - t, 5),
        autoRaf: false,
      });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      removeTick = () => gsap.ticker.remove(tick);
      document.addEventListener("click", onClick);
    })();

    return () => {
      disposed = true;
      document.removeEventListener("click", onClick);
      removeTick?.();
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
