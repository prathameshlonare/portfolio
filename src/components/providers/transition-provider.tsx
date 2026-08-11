"use client";

import React, { createContext, useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

interface TransitionContextType {
  navigate: (href: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
  navigate: () => {},
  isTransitioning: false,
});

export const useTransitionNavigate = () => useContext(TransitionContext);

const COLUMNS = 6;

const ROUTE_MAP: Record<string, { label: string; tag: string }> = {
  "/": { label: "HOME_SYS", tag: "MAIN_OVERVIEW" },
  "/work": { label: "WORK_MODULES", tag: "CASE_STUDIES & ARCH" },
  "/about": { label: "ABOUT_PROFILE", tag: "SYSTEMS_PHILOSOPHY" },
  "/stack": { label: "TECH_STACK", tag: "INFRA MATRIX" },
  "/contact": { label: "DIRECT_DISPATCH", tag: "LET'S_TALK" },
};

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "enter" | "exit">("idle");
  const [targetPath, setTargetPath] = useState("");

  const navigate = (href: string) => {
    if (href === pathname || phase !== "idle") return;

    setTargetPath(href);
    setPhase("enter");

    // Hold the terminal HUD briefly, then start pulling up the blinds (1000ms)
    setTimeout(() => {
      setPhase("exit");
    }, 1000);

    // Complete transition, then navigate (1700ms)
    setTimeout(() => {
      setPhase("idle");
      router.push(href);
    }, 1700);
  };

  const currentRouteInfo = ROUTE_MAP[targetPath] || {
    label: "DISPATCHING",
    tag: targetPath.toUpperCase() || "NAVIGATING",
  };

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning: phase !== "idle" }}>
      <div className="relative w-full min-h-screen">
        {/* Main Content with subtle depth scale during transition */}
        <motion.div
          animate={{
            scale: phase === "enter" ? 0.97 : 1,
            filter: phase === "enter" ? "blur(3px)" : "blur(0px)",
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1 flex flex-col w-full"
        >
          {children}
        </motion.div>

        {/* Hyper-Immersive Transition Blinds & HUD */}
        <AnimatePresence>
          {phase !== "idle" && (
            <>
              {/* 1. Staggered Column Wipe */}
              <div
                key="wipe-overlay"
                className="fixed inset-0 z-[200] flex pointer-events-none overflow-hidden"
                aria-hidden="true"
              >
                {Array.from({ length: COLUMNS }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-[#0D0D1A] border-r border-[#FF6B35]/25 shadow-[4px_0px_12px_rgba(0,0,0,0.6)] relative"
                    style={{ originY: phase === "enter" ? 0 : 1 }}
                    initial={{ scaleY: 0 }}
                    animate={phase === "enter" ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{
                      duration: 0.55,
                      delay:
                        phase === "enter"
                          ? i * 0.05
                          : (COLUMNS - 1 - i) * 0.05,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    {/* Top orange accent block line on columns */}
                    <div className="h-1 bg-[#FF6B35] w-full" />
                  </motion.div>
                ))}
              </div>

              {/* 2. Interactive Terminal Routing HUD Badge */}
              <motion.div
                key="hud-overlay"
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={
                  phase === "enter"
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: 0, scale: 0.95, y: -20 }
                }
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.35, delay: phase === "enter" ? 0.15 : 0 }}
                className="fixed inset-0 z-[210] flex items-center justify-center pointer-events-none px-4"
              >
                <div className="bg-[#0D0D1A] border-3 border-[#FF6B35] shadow-[8px_8px_0px_#7C3AED] p-5 max-w-xs w-full text-white font-mono relative overflow-hidden">
                  {/* Top Bar Diagnostics */}
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B35] animate-pulse" />
                      <span className="text-[10px] text-[#FF6B35] font-black tracking-widest uppercase">
                        ROUTER // v2.0
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-500/40 px-1.5 py-0.5">
                      200 OK
                    </span>
                  </div>

                  {/* Route Info */}
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                    TARGET MODULE:
                  </div>
                  <div className="bg-[#1A1A2E] border-2 border-[#FF6B35] p-2.5 shadow-[3px_3px_0px_#FF6B35] flex items-center justify-between">
                    <span className="font-extrabold text-sm text-white tracking-wider">
                      [{currentRouteInfo.label}]
                    </span>
                    <span className="text-[10px] text-[#FF6B35] font-mono font-bold">
                      {targetPath}
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div className="mt-3.5 space-y-1">
                    <div className="flex justify-between items-center text-[10px] text-zinc-400">
                      <span>{currentRouteInfo.tag}</span>
                      <span className="text-emerald-400 font-bold">P99: 14ms</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1A1A2E] border border-[#FF6B35]/40 overflow-hidden">
                      <motion.div
                        className="h-full bg-[#FF6B35]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </TransitionContext.Provider>
  );
}
