"use client";

import { useState, useCallback } from "react";

interface GlitchFlickerProps {
  children: React.ReactNode;
  className?: string;
}

export function GlitchFlicker({ children, className = "" }: GlitchFlickerProps) {
  const [glitching, setGlitching] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (glitching) return;
    setGlitching(true);
    setTimeout(() => setGlitching(false), 150);
  }, [glitching]);

  return (
    <span
      className={`glitch-flicker ${glitching ? "glitch-active" : ""} ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{ display: "inline-block" }}
    >
      {children}
    </span>
  );
}
