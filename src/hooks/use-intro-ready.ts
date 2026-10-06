"use client";

import { useEffect, useState } from "react";
import { useTransitionNavigate } from "@/components/providers/transition-provider";

export const INTRO_READY_EVENT = "portfolio:intro-ready";

let introReady = false;

/** Called once by InitialLoader when the boot curtain lifts. */
export function markIntroReady() {
  if (introReady) return;
  introReady = true;
  window.dispatchEvent(new Event(INTRO_READY_EVENT));
}

/**
 * True once the boot curtain has lifted AND no route transition
 * is covering the screen. Hero intro actors (scramble, entrance)
 * wait on this so they always play visibly.
 */
export function useIntroReady() {
  const { isTransitioning } = useTransitionNavigate();
  const [ready, setReady] = useState(introReady);

  useEffect(() => {
    if (introReady) {
      setReady(true);
      return;
    }
    const onReady = () => setReady(true);
    window.addEventListener(INTRO_READY_EVENT, onReady);
    return () => window.removeEventListener(INTRO_READY_EVENT, onReady);
  }, []);

  return ready && !isTransitioning;
}
