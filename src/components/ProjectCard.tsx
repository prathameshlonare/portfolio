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
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 text-sm md:text-base min-w-0">
            <span className="text-[var(--text-dim)] select-none hidden md:inline">
              {isLast ? "└──" : "├──"}
            </span>
            <span className="text-[var(--accent-blue)] font-medium group-hover:underline transition-colors break-words">
              <ScrambleText text={name} />
            </span>
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 text-xs text-[var(--accent-green)] border border-[var(--accent-green)]/30 rounded px-2 py-0.5 hover:bg-[var(--accent-green)]/10 transition-colors shrink-0"
                style={{ touchAction: "manipulation" }}
                onClick={(e) => e.stopPropagation()}
              >
                Github
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
            )}
            <span className="text-[var(--accent-green)] text-xs font-mono md:hidden">
              [{year}]
            </span>
          </div>
          <div className="flex flex-col items-end gap-0.5 shrink-0 md:hidden">
            <span className="text-[var(--text-dim)] text-xs">
              {role}
            </span>
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[var(--accent-green)] border border-[var(--accent-green)]/30 rounded px-2 py-0.5 hover:bg-[var(--accent-green)]/10 transition-colors"
                style={{ touchAction: "manipulation" }}
                onClick={(e) => e.stopPropagation()}
              >
                Github
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[var(--accent-green)] text-xs md:text-sm font-mono hidden md:inline">
              [{year}]
            </span>
            <span
              className="text-[var(--text-dim)] text-xs transition-transform duration-200"
              style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              ▸
            </span>
          </div>
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
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs md:text-sm text-[var(--accent-green)] font-medium hidden md:inline">
                  {role}
                </span>
                {demoUrl && (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[var(--accent-blue)] border border-[var(--accent-blue)]/30 rounded px-2.5 py-1 hover:bg-[var(--accent-blue)]/10 transition-colors"
                    style={{ touchAction: "manipulation" }}
                  >
                    demo ↗
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
