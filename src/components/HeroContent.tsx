"use client";

import { useState, useEffect } from "react";

export function HeroContent({ children }: { children: React.ReactNode }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`text-center max-w-2xl mx-auto ${
        animate ? "animate-[hero-in_0.5s_ease-out_1.8s_both]" : ""
      }`}
    >
      {children}
    </div>
  );
}
