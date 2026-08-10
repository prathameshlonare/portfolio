"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import React from "react";

const COLUMNS = [
  { bg: "bg-[#1A1A2E]", delay: 0 },
  { bg: "bg-[#FF6B35]", delay: 0.06 },
  { bg: "bg-[#1A1A2E]", delay: 0.12 },
  { bg: "bg-[#7C3AED]", delay: 0.18 },
  { bg: "bg-[#1A1A2E]", delay: 0.24 },
];

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const getRouteLabel = (path: string) => {
    if (path === "/") return "HOME";
    return path.replace("/", "").toUpperCase();
  };

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="relative w-full min-h-screen">
        {/* Staggered 5 Multi-Column Grid Blocks Overlay */}
        <div className="fixed inset-0 z-[100] grid grid-cols-5 pointer-events-none">
          {COLUMNS.map((col, index) => (
            <motion.div
              key={index}
              className={`h-full w-full ${col.bg} border-r border-[#1A1A2E]/20`}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              exit={{ scaleY: 1 }}
              transition={{
                duration: 0.55,
                delay: col.delay,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{ originY: 0 }}
            />
          ))}
        </div>

        {/* Center Floating Dispatch Badge */}
        <motion.div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] pointer-events-none"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.9 }}
          exit={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className="border-3 border-white bg-[#1A1A2E] px-6 py-3.5 shadow-[6px_6px_0px_#FF6B35] flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#FF6B35] animate-ping" />
            <span className="font-mono font-black text-base md:text-xl text-white tracking-widest uppercase">
              SYSTEM_DISPATCH // {getRouteLabel(pathname)}
            </span>
          </div>
        </motion.div>

        {/* Page Content Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.45, delay: 0.35, ease: "easeOut" }}
          className="flex-1 flex flex-col w-full"
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
