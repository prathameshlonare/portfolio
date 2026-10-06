"use client";

import { useEffect, useRef } from "react";
import { animate, scrambleText } from "animejs";

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  /** When false, holds the final text and never scrambles (waits for a signal). */
  start?: boolean;
}

export function ScrambleText({ text, className, duration = 800, delay = 0, start = true }: ScrambleTextProps) {
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    el.textContent = text;
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = animate(el, {
      innerHTML: scrambleText({
        text,
        chars: "uppercase",
        cursor: true,
        duration,
      }),
      delay,
    });
    return () => {
      animation.revert();
    };
  }, [text, duration, delay, start]);

  return (
    <span className={className} aria-label={text}>
      <span ref={innerRef} aria-hidden="true">{text}</span>
    </span>
  );
}
