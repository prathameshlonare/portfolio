"use client";

import React, { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.setProperty("--cx", `${mouseX}px`);
      cursor.style.setProperty("--cy", `${mouseY}px`);
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.setProperty("--cx", `${ringX}px`);
      ring.style.setProperty("--cy", `${ringY}px`);
      animFrame = requestAnimationFrame(animate);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "pointer"
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "pointer"
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none z-[9999]"
        style={
          {
            position: "fixed",
            left: "var(--cx, -100px)",
            top: "var(--cy, -100px)",
            width: "12px",
            height: "12px",
            marginLeft: "-6px",
            marginTop: "-6px",
            backgroundColor: "#FF6B35",
            borderRadius: "50%",
            transform: `scale(${isHovering ? 0.67 : 1})`,
            transition: "transform 0.15s ease-out",
          } as React.CSSProperties
        }
      />
      <div
        ref={ringRef}
        className="pointer-events-none z-[9998]"
        style={
          {
            position: "fixed",
            left: "var(--cx, -100px)",
            top: "var(--cy, -100px)",
            width: "36px",
            height: "36px",
            marginLeft: "-18px",
            marginTop: "-18px",
            border: "2px solid #FF6B35",
            borderRadius: "50%",
            transform: `scale(${isHovering ? 1.33 : 1})`,
            transition: "transform 0.15s ease-out",
            opacity: isClicking ? 0.5 : 0.8,
          } as React.CSSProperties
        }
      />
    </>
  );
}
