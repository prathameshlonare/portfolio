"use client";

import { useRef } from "react";
import { useScramble } from "@/hooks/useScramble";

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: "span" | "div" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export function ScrambleText({
  text,
  className = "",
  as: Tag = "span",
  href,
  target,
  rel,
}: ScrambleTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scramble } = useScramble(text);

  return (
    <Tag
      ref={ref as React.RefObject<any>}
      className={className}
      href={href}
      target={target}
      rel={rel}
      onMouseEnter={() => scramble(ref.current)}
      onTouchStart={() => scramble(ref.current)}
      style={{ display: "inline-block" }}
    >
      {text}
    </Tag>
  );
}
