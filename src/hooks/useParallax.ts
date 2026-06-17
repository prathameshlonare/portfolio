"use client";

import { useEffect, useRef } from "react";

interface ParallaxOptions {
  strength?: number; // max offset in px, default 10
}

export function useParallax<T extends HTMLElement>(options: ParallaxOptions = {}) {
  const { strength = 10 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Disable on touch
    if ("ontouchstart" in window) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetX = ((e.clientX - cx) / (window.innerWidth / 2)) * strength;
      targetY = ((e.clientY - cy) / (window.innerHeight / 2)) * strength;
    };

    function animate() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      el!.style.transform = `translate(${currentX}px, ${currentY}px)`;
      raf = requestAnimationFrame(animate);
    }

    document.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return ref;
}
