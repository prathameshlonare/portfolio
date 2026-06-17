"use client";

import { useState, useRef, useEffect } from "react";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import { ScrambleText } from "@/components/ScrambleText";

interface ProjectProps {
  name: string;
  role: string;
  year: string;
  tech: string;
  bullets: string[];
  githubUrl?: string;
  demoUrl?: string;
  isLast?: boolean;
}

export function ProjectCard({
  name,
  role,
  year,
  tech,
  bullets,
  githubUrl,
  demoUrl,
  isLast = false,
}: ProjectProps) {
  const [open, setOpen] = useState(false);
  const magneticRef = useMagneticHover<HTMLDivElement>({ strength: 2 });
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [open]);

  return (
    <div className="py-4" ref={magneticRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left cursor-pointer group"
        style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
      >
        <div className="flex items-center gap-2 text-sm md:text-base">
          <span className="text-[var(--text-dim)] select-none hidden md:inline">
            {isLast ? "└──" : "├──"}
          </span>
          <span className="text-[var(--accent-blue)] font-medium group-hover:underline transition-colors break-words">
            <ScrambleText text={name} />
          </span>
          <span className="text-[var(--accent-green)] text-xs md:text-sm font-mono">
            [{year}]
          </span>
          <span
            className="text-[var(--text-dim)] text-xs ml-auto transition-transform duration-200 shrink-0"
            style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            ▸
          </span>
        </div>
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 350ms cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <div className="overflow-hidden">
          <div
            ref={contentRef}
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-8px)",
              transition: "opacity 250ms ease 50ms, transform 250ms ease 50ms",
            }}
          >
            <div className="ml-0 md:ml-6 mt-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                <span className="text-xs md:text-sm text-[var(--accent-green)] font-medium">
                  {role}
                </span>
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[var(--accent-green)] hover:underline transition-colors"
                    style={{ touchAction: "manipulation" }}
                  >
                    [github]
                  </a>
                )}
                {demoUrl && (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[var(--accent-blue)] hover:underline transition-colors"
                    style={{ touchAction: "manipulation" }}
                  >
                    [demo]
                  </a>
                )}
              </div>
              <div className="text-xs text-[var(--text-dim)] mb-3 font-mono break-words">
                <span className="text-[var(--text-muted)]">Stack:</span> {tech}
              </div>
              <ul className="space-y-2">
                {bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="text-xs md:text-sm text-[var(--text-secondary)] flex items-start gap-2 leading-relaxed"
                    style={{
                      opacity: open ? 1 : 0,
                      transform: open ? "translateX(0)" : "translateX(-4px)",
                      transition: `opacity 200ms ease ${80 + i * 40}ms, transform 200ms ease ${80 + i * 40}ms`,
                    }}
                  >
                    <span className="text-[var(--accent-green)] select-none mt-1 shrink-0 hidden md:inline">
                      →
                    </span>
                    <span className="text-justify break-words">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
