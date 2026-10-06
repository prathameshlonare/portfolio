"use client";

import React, { useEffect, useRef, useState } from "react";
import { markIntroReady } from "@/hooks/use-intro-ready";

export function InitialLoader() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("booting");
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const markedRef = useRef(false);

  const finish = () => {
    setHidden(true);
    // Lift the curtain exactly once: waiting intro actors may start.
    if (!markedRef.current) {
      markedRef.current = true;
      markIntroReady();
    }
  };

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const bootSequence = [
      { progress: 15, status: "loading modules", delay: 180 },
      { progress: 35, status: "connecting to cloud", delay: 300 },
      { progress: 55, status: "initializing terraform", delay: 250 },
      { progress: 75, status: "syncing infrastructure", delay: 280 },
      { progress: 90, status: "deploying portfolio", delay: 200 },
      { progress: 100, status: "system ready", delay: 150 },
    ];

    let totalDelay = 80;

    bootSequence.forEach((step) => {
      totalDelay += step.delay;
      const t = setTimeout(() => {
        setProgress(step.progress);
        setStatus(step.status);
      }, totalDelay);
      timers.push(t);
    });

    const tFade = setTimeout(() => {
      setFading(true);
    }, totalDelay + 150);
    timers.push(tFade);

    const tHide = setTimeout(() => {
      finish();
    }, totalDelay + 550);
    timers.push(tHide);

    // Safety fallback: force-hide after 2.8s
    const tSafety = setTimeout(() => {
      finish();
    }, 2800);
    timers.push(tSafety);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[300] bg-[#1A1A2E] flex flex-col items-center justify-center pointer-events-none"
      style={{
        opacity: fading ? 0 : 1,
        transform: fading ? "scale(0.96)" : "scale(1)",
        transition:
          "opacity 0.4s cubic-bezier(0.76,0,0.24,1), transform 0.4s cubic-bezier(0.76,0,0.24,1)",
      }}
    >
      {/* Logo */}
      <div className="mb-8 animate-[fadeInUp_0.5s_ease_0.1s_both]">
        <div className="border-3 border-[#FF6B35] bg-[#0D0D1A] px-8 py-4 shadow-[6px_6px_0px_#FF6B35]">
          <span className="font-mono text-2xl md:text-3xl font-black text-white tracking-widest">
            PRATHAMESH<span className="text-[#FF6B35]">.</span>
          </span>
        </div>
      </div>

      {/* Terminal */}
      <div className="w-full max-w-sm animate-[fadeInUp_0.4s_ease_0.3s_both] px-4">
        <div className="border-2 border-[#FF6B35]/50 bg-[#0D0D1A] shadow-[4px_4px_0px_#7C3AED]">
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#FF6B35]/20">
            <div className="w-2 h-2 rounded-full bg-[#FF6B35]" />
            <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="p-4 font-mono text-xs">
            <div className="text-[#FF6B35] mb-1">$ boot --portfolio</div>
            <div className="text-emerald-400 mb-1">
              [{progress}%] {status}
            </div>
            <div className="h-2 bg-[#1A1A2E] border border-[#FF6B35]/30 mt-3">
              <div
                className="h-full bg-[#FF6B35]"
                style={{
                  width: `${progress}%`,
                  transition: "width 0.2s ease-out",
                }}
              />
            </div>
            <div className="mt-2">
              <span className="w-2 h-3 bg-[#FF6B35] animate-pulse inline-block" />
            </div>
          </div>
        </div>
      </div>

      {/* Version */}
      <div className="mt-6 animate-[fadeIn_0.5s_ease_0.5s_both]">
        <span className="font-mono text-[10px] text-zinc-600 tracking-widest">
          v2.0.0 // devops engineer
        </span>
      </div>
    </div>
  );
}
