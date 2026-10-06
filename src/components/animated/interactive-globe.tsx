"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { Server, Globe } from "lucide-react";
import { Globe as MagicGlobe } from "@/registry/magicui/globe";
import { type COBEOptions } from "cobe";

interface Region {
  id: string;
  kind: "LIVE" | "DESIGN";
  facts: string;
  location: [number, number];
  size: number;
}

const REGIONS: Region[] = [
  {
    id: "eu-north-1",
    kind: "LIVE",
    facts: "This portfolio. S3 plus CloudFront, cache-invalidated deploys.",
    location: [59.33, 18.06],
    size: 0.12,
  },
  {
    id: "us-east-2",
    kind: "DESIGN",
    facts: "DuoKart architecture. ALB, ASG, RDS Multi-AZ. Served here as a static demo.",
    location: [40.0, -82.9],
    size: 0.08,
  },
];

const PING_INTERVAL_MS = 4000;
const PING_FLASH_MS = 700;

export function InteractiveGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(REGIONS[0].id);
  const [pingId, setPingId] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reducedMotion) return;
    const tick = () => {
      if (document.visibilityState !== "visible") return;
      setPingId((prev) => {
        const idx = REGIONS.findIndex((r) => r.id === prev);
        return REGIONS[(idx + 1) % REGIONS.length].id;
      });
      window.setTimeout(() => setPingId(null), PING_FLASH_MS);
    };
    const interval = window.setInterval(tick, PING_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [visible, reducedMotion]);

  const config: COBEOptions = useMemo(
    () => ({
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [1, 0.42, 0.21],
      glowColor: [1, 1, 1],
      markers: REGIONS.map((r) => ({ location: r.location, size: r.size })),
      onRender: () => {},
    }),
    []
  );

  const active = REGIONS.find((r) => r.id === activeId) ?? REGIONS[0];
  // Canvas stays mounted once created — never unmount offscreen, so fast
  // scrolls never stall on re-init. `visible` only gates the chip ping.
  const showCanvas = !reducedMotion;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[350px] md:h-[420px] bg-white border-3 border-[#1A1A2E] shadow-[6px_6px_0px_#FF6B35] flex flex-col overflow-hidden group [content-visibility:auto] [contain-intrinsic-size:auto_350px] md:[contain-intrinsic-size:auto_420px]"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b-3 border-[#1A1A2E] px-4 py-2 bg-[#FAFAFA]">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#FF6B35]" />
          <MonoLabel className="text-xs font-bold">DEPLOY FOOTPRINT</MonoLabel>
        </div>
        <div className="font-mono text-[10px] font-bold text-[#1A1A2E] bg-white border-2 border-[#1A1A2E] px-2 py-0.5">
          {dragging ? "SPINNING" : "DRAG TO SPIN"}
        </div>
      </div>

      {/* Globe Canvas or static poster */}
      <div
        className="flex-1 relative w-full h-full flex items-end justify-center overflow-hidden"
        onPointerDown={() => setDragging(true)}
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
      >
        {showCanvas ? (
          <>
            <MagicGlobe
              className="w-[500px] h-[500px] md:w-[600px] md:h-[600px] mb-[-10%]"
              config={config}
            />
            <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_80%,rgba(255,107,53,0.1),rgba(255,255,255,0))]" />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg
              viewBox="0 0 120 120"
              width="120"
              height="120"
              role="img"
              aria-label="Wireframe globe placeholder"
            >
              <circle cx="60" cy="60" r="44" fill="none" stroke="#1A1A2E" strokeWidth="3" />
              <ellipse cx="60" cy="60" rx="44" ry="18" fill="none" stroke="#1A1A2E" strokeWidth="2" />
              <ellipse cx="60" cy="60" rx="18" ry="44" fill="none" stroke="#1A1A2E" strokeWidth="2" />
              <line x1="16" y1="60" x2="104" y2="60" stroke="#FF6B35" strokeWidth="3" />
            </svg>
          </div>
        )}
      </div>

      {/* Bottom region selector */}
      <div className="border-t-3 border-[#1A1A2E] p-2.5 bg-white flex flex-col gap-2">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Deployment regions">
          {REGIONS.map((region) => {
            const isActive = region.id === activeId;
            const isPinging = region.id === pingId;
            return (
              <button
                key={region.id}
                type="button"
                onClick={() => setActiveId(region.id)}
                onMouseEnter={() => setActiveId(region.id)}
                aria-pressed={isActive}
                className={`font-mono text-[11px] font-bold border-2 border-[#1A1A2E] px-2.5 py-1 transition-all ${
                  isActive
                    ? "bg-[#1A1A2E] text-white shadow-[2px_2px_0px_#FF6B35]"
                    : "bg-[#FAFAFA] text-[#1A1A2E]"
                } ${isPinging ? "outline outline-2 outline-[#FF6B35] outline-offset-2" : ""}`}
              >
                {region.id} · {region.kind}
              </button>
            );
          })}
        </div>
        <div className="flex min-h-[34px] items-center gap-2 font-mono text-[11px] text-zinc-700">
          <Server className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
          <span aria-live="polite">{active.facts}</span>
        </div>
      </div>
    </div>
  );
}
