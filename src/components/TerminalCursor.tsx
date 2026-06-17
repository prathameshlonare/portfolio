"use client";

import { useEffect, useRef, useState } from "react";

export function TerminalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [shrink, setShrink] = useState(false);
  const posRef = useRef({ x: 0, y: 0, cursorX: 0, cursorY: 0, initialized: false });

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const pos = posRef.current;

    const onMouseMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!pos.initialized) {
        pos.cursorX = e.clientX;
        pos.cursorY = e.clientY;
        pos.initialized = true;
      }
      setVisible(true);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setShrink(
        !!target.closest("a, button, [role='button'], input, textarea, select, .interactive")
      );
    };

    let raf: number;
    function animate() {
      pos.cursorX += (pos.x - pos.cursorX) * 0.2;
      pos.cursorY += (pos.y - pos.cursorY) * 0.2;
      if (cursor) cursor.style.transform = `translate(${pos.cursorX - 6}px, ${pos.cursorY - 9}px)`;
      raf = requestAnimationFrame(animate);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(animate);

    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.id = "hide-default-cursor";
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.body.style.cursor = "";
      style.remove();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`terminal-cursor ${shrink ? "shrink" : ""}`}
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
}
