"use client";

import { useRef, useState, useEffect } from "react";

interface StaggerOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useStaggerReveal<T extends HTMLElement>(options: StaggerOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px" } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
