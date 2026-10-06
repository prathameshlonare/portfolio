"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const InteractiveGlobeInner = dynamic(
  () =>
    import("./interactive-globe").then((mod) => ({ default: mod.InteractiveGlobe })),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full h-[350px] md:h-[420px] bg-white border-3 border-[#1A1A2E] shadow-[6px_6px_0px_#FF6B35] flex flex-col overflow-hidden">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-3 border-[#1A1A2E] border-t-[#FF6B35] animate-spin" />
        </div>
      </div>
    ),
  }
);

export function LazyGlobe() {
  // Warm the globe chunk during idle time after load, so the first
  // scroll into the hero never pays download + parse mid-scroll.
  React.useEffect(() => {
    const warm = () => {
      import("./interactive-globe").catch(() => {});
    };
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(warm, { timeout: 3000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(warm, 1500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <Suspense
      fallback={
        <div className="relative w-full h-[350px] md:h-[420px] bg-white border-3 border-[#1A1A2E] shadow-[6px_6px_0px_#FF6B35] flex flex-col overflow-hidden">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-12 h-12 border-3 border-[#1A1A2E] border-t-[#FF6B35] animate-spin" />
          </div>
        </div>
      }
    >
      <InteractiveGlobeInner />
    </Suspense>
  );
}
