"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface GsapHeroEntranceProps {
  children: React.ReactNode;
}

export function GsapHeroEntrance({ children }: GsapHeroEntranceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".gsap-badge", {
        opacity: 0,
        y: -15,
        duration: 0.6,
      })
        .from(
          ".gsap-title",
          {
            opacity: 0,
            y: 35,
            duration: 0.8,
            stagger: 0.15,
          },
          "-=0.3"
        )
        .from(
          ".gsap-tagline",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".gsap-cta",
          {
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.3"
        )
        .from(
          ".gsap-globe",
          {
            opacity: 0,
            x: 40,
            duration: 0.9,
          },
          "-=0.8"
        );
    },
    { scope: containerRef }
  );

  return <div ref={containerRef}>{children}</div>;
}
