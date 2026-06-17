"use client";

import { useCallback, useRef } from "react";

const TERMINAL_CHARS = "0123456789abcdefABCDEF{}[]<>/\\|;:=+-*&^%$#@!?~`".split("");

export function useScramble(original: string) {
  const busyRef = useRef(false);

  const scramble = useCallback(
    (el: HTMLElement | null) => {
      if (!el || busyRef.current) return;
      busyRef.current = true;

      const chars = original.split("");
      el.textContent = "";

      const spans = chars.map((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.opacity = "0";
        el.appendChild(span);
        return span;
      });

      let frame = 0;
      const totalFrames = 20;

      function tick() {
        frame++;
        spans.forEach((span, i) => {
          const delay = i * 3;
          if (frame < delay) return;
          if (frame - delay > totalFrames) {
            span.textContent = chars[i];
            span.style.opacity = "1";
            return;
          }
          if (Math.random() > 0.5) {
            span.textContent =
              TERMINAL_CHARS[Math.floor(Math.random() * TERMINAL_CHARS.length)];
          }
          span.style.opacity = "1";
        });

        if (frame < totalFrames + chars.length * 3) {
          requestAnimationFrame(tick);
        } else {
          busyRef.current = false;
        }
      }

      requestAnimationFrame(tick);
    },
    [original]
  );

  return { scramble };
}
