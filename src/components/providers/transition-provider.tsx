"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
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
  "/work/": { label: "WORK_MODULES", tag: "CASE_STUDIES & ARCH" },
  "/about": { label: "ABOUT_PROFILE", tag: "SYSTEMS_PHILOSOPHY" },
  "/about/": { label: "ABOUT_PROFILE", tag: "SYSTEMS_PHILOSOPHY" },
  "/stack": { label: "TECH_STACK", tag: "INFRA MATRIX" },
  "/stack/": { label: "TECH_STACK", tag: "INFRA MATRIX" },
  "/contact": { label: "DIRECT_DISPATCH", tag: "LET'S_TALK" },
  "/contact/": { label: "DIRECT_DISPATCH", tag: "LET'S_TALK" },
  "/activity": { label: "ACTIVITY_FEED", tag: "PIPELINES & COMMITS" },
  "/activity/": { label: "ACTIVITY_FEED", tag: "PIPELINES & COMMITS" },
  "/privacy": { label: "PRIVACY_POLICY", tag: "LEGAL_DOCS" },
  "/privacy/": { label: "PRIVACY_POLICY", tag: "LEGAL_DOCS" },
};

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "enter" | "exit">("idle");
  const [targetPath, setTargetPath] = useState("");

  const isNavigatingRef = useRef(false);
  const timerIds = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timerIds.current.forEach(clearTimeout);
    timerIds.current = [];
  };

  // Trigger exit animation when pathname changes during navigation
  useEffect(() => {
    if (!isNavigatingRef.current) {
      clearTimers();
      setPhase("idle");
      return;
    }

    // The new route is now mounted in the DOM under the covered bars.
    // Trigger the exit animation so the bars retract smoothly!
    clearTimers();

    // Brief pause to display the target module on HUD (150ms), then start exit
    const tExit = setTimeout(() => {
      setPhase("exit");
    }, 150);

    // Once bars finish retracting (duration ~450ms + stagger), reset to idle
    const tIdle = setTimeout(() => {
      setPhase("idle");
      isNavigatingRef.current = false;
    }, 850);

    timerIds.current = [tExit, tIdle];
  }, [pathname]);

  const navigate = (href: string) => {
    // Normalize URL with trailing slash for static export compatibility
    const normalizedHref =
      href.endsWith("/") || href.includes("#") || href.includes("?")
        ? href
        : `${href}/`;

    // Same page: smooth scroll to top
    if (normalizedHref === pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Already animating: prevent duplicate clicks
    if (phase !== "idle") return;

    clearTimers();
    isNavigatingRef.current = true;
    setTargetPath(normalizedHref);
    setPhase("enter");

    // Phase 1: Bars fall down and cover the screen (450ms).
    // Push the route while the screen is 100% covered!
    const tPush = setTimeout(() => {
      router.push(normalizedHref);
    }, 450);

    // Fallback safety: if pathname never changes (e.g. static link delay), force exit
    const tFallback = setTimeout(() => {
      if (isNavigatingRef.current) {
        setPhase("exit");
        const tEnd = setTimeout(() => {
          setPhase("idle");
          isNavigatingRef.current = false;
        }, 600);
        timerIds.current.push(tEnd);
      }
    }, 2200);

    timerIds.current = [tPush, tFallback];
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
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex-1 flex flex-col w-full"
        >
          {children}
        </motion.div>

        {/* Transition Blinds & HUD */}
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
                    animate={{ scaleY: phase === "enter" ? 1 : 0 }}
                    transition={{
                      duration: 0.45,
                      delay:
                        phase === "enter"
                          ? i * 0.04
                          : (COLUMNS - 1 - i) * 0.04,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    {/* Orange accent line on column edge */}
                    <div className="h-1 bg-[#FF6B35] w-full" />
                  </motion.div>
                ))}
              </div>

              {/* 2. Interactive Terminal Routing HUD Badge */}
              <motion.div
                key="hud-overlay"
                initial={{ opacity: 0, scale: 0.85, y: 15 }}
                animate={{
                  opacity: phase === "enter" ? 1 : 0,
                  scale: phase === "enter" ? 1 : 0.95,
                  y: phase === "enter" ? 0 : -15,
                }}
                transition={{ duration: 0.25, delay: phase === "enter" ? 0.1 : 0 }}
                className="fixed inset-0 z-[210] flex items-center justify-center pointer-events-none px-4"
              >
                <div className="bg-[#0D0D1A] border-3 border-[#FF6B35] shadow-[6px_6px_0px_#7C3AED] md:shadow-[8px_8px_0px_#7C3AED] p-4 sm:p-5 max-w-xs w-full text-white font-mono relative overflow-hidden">
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
                  <div className="bg-[#1A1A2E] border-2 border-[#FF6B35] p-2 sm:p-2.5 shadow-[2px_2px_0px_#FF6B35] flex items-center justify-between">
                    <span className="font-extrabold text-xs sm:text-sm text-white tracking-wider">
                      [{currentRouteInfo.label}]
                    </span>
                    <span className="text-[10px] text-[#FF6B35] font-mono font-bold">
                      {targetPath}
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between items-center text-[10px] text-zinc-400">
                      <span>{currentRouteInfo.tag}</span>
                      <span className="text-emerald-400 font-bold">P99: 14ms</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1A1A2E] border border-[#FF6B35]/40 overflow-hidden">
                      <motion.div
                        className="h-full bg-[#FF6B35]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
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
