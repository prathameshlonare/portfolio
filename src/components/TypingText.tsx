"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const TERMINAL_CHARS = "0123456789abcdefABCDEF{}[]<>/\\|;:=+-*&^%$#@!?~`".split("");

function ScrambleWord({
  word,
  active,
}: {
  word: string;
  active: boolean;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const busyRef = useRef(false);

  const scramble = useCallback(() => {
    const el = spanRef.current;
    if (!el || busyRef.current || !active) return;
    busyRef.current = true;

    const chars = word.split("");
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
        if (el) el.textContent = word;
        busyRef.current = false;
      }
    }

    requestAnimationFrame(tick);
  }, [word, active]);

  return (
    <span
      ref={spanRef}
      className="inline-block cursor-default"
      onMouseEnter={scramble}
    >
      {word}
    </span>
  );
}

export function TypingText({ text }: { text: string }) {
  const [animate, setAnimate] = useState(false);
  const [cursorDone, setCursorDone] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setCursorDone(true), 2000);
    return () => clearTimeout(t);
  }, [animate]);

  return (
    <span
      className={`inline-block whitespace-nowrap pr-1 ${
        animate ? "overflow-hidden" : ""
      } ${cursorDone ? "border-r-0" : "border-r-2 border-[var(--accent-green)]"}`}
      style={
        animate
          ? { width: "100%", animation: "typing-reveal 1.5s ease-out 0.5s both" }
          : undefined
      }
    >
      {words.map((word, i) => (
        <span key={i}>
          <ScrambleWord word={word} active={cursorDone} />
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}
