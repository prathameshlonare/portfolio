"use client";

import React from "react";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { Server, Globe, Radio } from "lucide-react";
import { Globe as MagicGlobe } from "@/registry/magicui/globe";
import { type COBEOptions } from "cobe";

const INDIA_GLOBE_CONFIG: COBEOptions = {
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
  markers: [
    { location: [28.6139, 77.2090], size: 0.1 },   // New Delhi
    { location: [19.0760, 72.8777], size: 0.08 },   // Mumbai
    { location: [12.9716, 77.5946], size: 0.06 },   // Bangalore
    { location: [22.5726, 88.3639], size: 0.05 },   // Kolkata
    { location: [13.0827, 80.2707], size: 0.05 },   // Chennai
    { location: [17.3850, 78.4867], size: 0.05 },   // Hyderabad
    { location: [23.0225, 72.5714], size: 0.05 },   // Ahmedabad
    { location: [26.9124, 75.7873], size: 0.05 },   // Jaipur
  ],
  onRender: () => {},
};

export function InteractiveGlobe() {
  return (
    <div className="relative w-full h-[350px] md:h-[420px] bg-white border-3 border-[#1A1A2E] shadow-[6px_6px_0px_#FF6B35] flex flex-col overflow-hidden group">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b-3 border-[#1A1A2E] px-4 py-2 bg-[#FAFAFA]">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#FF6B35]" />
          <MonoLabel className="text-xs font-bold">AWS Global Infra (3D Mesh)</MonoLabel>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-emerald-600 bg-emerald-100 border border-emerald-300 px-2 py-0.5">
          <Radio className="w-3 h-3 animate-pulse" /> ACTIVE REGIONS
        </div>
      </div>

      {/* MagicUI Globe Container */}
      <div className="flex-1 relative w-full h-full flex items-end justify-center overflow-hidden">
        <MagicGlobe className="w-[500px] h-[500px] md:w-[600px] md:h-[600px] mb-[-10%]" config={INDIA_GLOBE_CONFIG} />
        <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_80%,rgba(255,107,53,0.1),rgba(255,255,255,0))]" />
      </div>

      {/* Bottom Info Banner */}
      <div className="border-t-3 border-[#1A1A2E] p-2.5 bg-white flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2 text-zinc-700 font-semibold">
          <Server className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span>us-east-1 · ap-south-1 · eu-central-1</span>
        </div>
        <span className="font-bold text-[#FF6B35]">LATENCY &lt; 180ms</span>
      </div>
    </div>
  );
}
