"use client";

import React, { useEffect, useState } from "react";

export function InitialLoader() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("booting");
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const bootSequence = [
      { progress: 15, status: "loading modules", delay: 200 },
      { progress: 35, status: "connecting to cloud", delay: 400 },
      { progress: 55, status: "initializing terraform", delay: 300 },
      { progress: 75, status: "syncing infrastructure", delay: 350 },
      { progress: 90, status: "deploying portfolio", delay: 250 },
      { progress: 100, status: "system ready", delay: 200 },
    ];

    let totalDelay = 100;

    bootSequence.forEach((step) => {
      totalDelay += step.delay;
      setTimeout(() => {
        if (!cancelled) {
          setProgress(step.progress);
          setStatus(step.status);
        }
      }, totalDelay);
    });

    setTimeout(() => {
      if (!cancelled) setFading(true);
    }, totalDelay + 200);

    setTimeout(() => {
      if (!cancelled) setHidden(true);
    }, totalDelay + 700);

    // Safety: force-hide after 4s no matter what
    setTimeout(() => {
      if (!cancelled) setHidden(true);
    }, 4000);

    return () => {
      cancelled = true;
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[300] bg-[#1A1A2E] flex flex-col items-center justify-center"
      style={{
        opacity: fading ? 0 : 1,
        transform: fading ? "scale(0.95)" : "scale(1)",
        transition:
          "opacity 0.4s cubic-bezier(0.76,0,0.24,1), transform 0.4s cubic-bezier(0.76,0,0.24,1)",
        pointerEvents: fading ? "none" : "auto",
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
      <div className="w-full max-w-sm animate-[fadeInUp_0.4s_ease_0.3s_both]">
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
