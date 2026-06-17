"use client";

import { useRef, useState, useEffect } from "react";
import { GlitchFlicker } from "@/components/GlitchFlicker";

export function TerminalSection({
  command,
  children,
}: {
  command: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(command.slice(0, i));
      if (i >= command.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [started, command]);

  return (
    <div ref={ref} className="terminal-prompt">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border)] min-w-0 overflow-x-auto">
        <div className="w-3 h-3 rounded-full bg-[var(--accent-green)] shrink-0"></div>
        <div className="w-3 h-3 rounded-full bg-[var(--accent-blue)] shrink-0"></div>
        <div className="w-3 h-3 rounded-full bg-[var(--text-dim)] shrink-0"></div>
        <div className="ml-4 text-[var(--text-dim)] text-xs font-mono whitespace-nowrap min-w-0 shrink">
          <span className="hidden md:inline">~ prathamesh@portfolio:~$ </span>
          <span className="md:hidden">$ </span>
          <GlitchFlicker>{displayed}</GlitchFlicker>
          {started && displayed.length < command.length && (
            <span className="animate-pulse">|</span>
          )}
        </div>
      </div>

      {children}

      <div className="mt-4 pt-3 border-t border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-[var(--text-dim)] text-xs">$</span>
          <span className="text-[var(--accent-green)] text-xs font-mono">{command}</span>
          <span className="text-[var(--text-dim)] text-xs animate-pulse">|</span>
        </div>
      </div>
    </div>
  );
}
