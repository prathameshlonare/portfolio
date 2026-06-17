"use client";

import { useCallback, useRef, useEffect } from "react";

interface MagneticOptions {
  strength?: number;
  transitionMs?: number;
}

export function useMagneticHover<T extends HTMLElement>(
  options: MagneticOptions = {}
) {
  const { strength = 3, transitionMs = 300 } = options;
  const ref = useRef<T>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      el.style.transition = "none";
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = `transform ${transitionMs}ms cubic-bezier(0.23, 1, 0.32, 1)`;
    el.style.transform = "translate(0, 0)";
  }, [transitionMs]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}
