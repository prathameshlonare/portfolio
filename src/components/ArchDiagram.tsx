"use client";

import { useState, useRef, useCallback } from "react";

interface ArchNode {
  label: string;
}

interface ArchDiagramProps {
  nodes: ArchNode[];
  title: string;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const awsColors: Record<string, string> = {
  CloudFront: "bg-orange-600",
  S3: "bg-green-700",
  "API Gateway": "bg-purple-700",
  Lambda: "bg-orange-500",
  DynamoDB: "bg-blue-600",
  Cognito: "bg-teal-600",
  CloudWatch: "bg-yellow-600",
  CloudFormation: "bg-indigo-600",
  IAM: "bg-red-600",
  "GitHub Actions": "bg-gray-500",
};

function getNodeColor(label: string): string {
  for (const [key, color] of Object.entries(awsColors)) {
    if (label.includes(key)) return color;
  }
  return "bg-zinc-600";
}

export function ArchDiagram({ nodes, title }: ArchDiagramProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({ height: 0, opacity: 0, overflow: "hidden" });
  const animating = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanup = useCallback(() => {
    animating.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const toggle = useCallback(() => {
    if (animating.current) return;
    const el = contentRef.current;
    if (!el) { setOpen((o) => !o); return; }

    const willOpen = !open;
    animating.current = true;

    if (prefersReducedMotion()) {
      if (willOpen) {
        setStyle({ height: "auto", opacity: 1, overflow: "visible" });
      } else {
        setStyle({ height: 0, opacity: 0, overflow: "hidden" });
      }
      setOpen((o) => !o);
      cleanup();
      return;
    }

    if (willOpen) {
      const h = el.scrollHeight;
      setStyle({ height: 0, opacity: 0, overflow: "hidden" });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setStyle({ height: h, opacity: 1, overflow: "hidden", transition: "height 0.2s ease, opacity 0.2s ease" });
          const onEnd = () => {
            setStyle({ height: "auto", opacity: 1, overflow: "visible" });
            cleanup();
            el.removeEventListener("transitionend", onEnd);
          };
          el.addEventListener("transitionend", onEnd, { once: true });
          timerRef.current = setTimeout(onEnd, 400);
        });
      });
    } else {
      const h = el.scrollHeight;
      setStyle({ height: h, opacity: 1, overflow: "hidden" });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setStyle({ height: 0, opacity: 0, overflow: "hidden", transition: "height 0.2s ease, opacity 0.15s ease" });
          const onEnd = () => {
            cleanup();
            el.removeEventListener("transitionend", onEnd);
          };
          el.addEventListener("transitionend", onEnd, { once: true });
          timerRef.current = setTimeout(onEnd, 400);
        });
      });
    }

    setOpen((o) => !o);
  }, [open, cleanup]);

  return (
    <div className="mt-2 mb-4">
      <button
        onClick={toggle}
        className="text-xs text-[var(--text-dim)] hover:text-[var(--accent-green)] transition-colors cursor-pointer"
      >
        <span className="mr-1">$</span> cat architecture/{title}.md
      </button>

      <div ref={contentRef} style={style}>
        <div className="flex flex-col md:flex-row md:flex-wrap md:items-center gap-1.5 pt-3">
          {nodes.map((node, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span
                className={`text-[10px] leading-none px-2 py-1 rounded text-white font-mono ${getNodeColor(node.label)}`}
              >
                {node.label}
              </span>
              {i < nodes.length - 1 && (
                <>
                  <span className="text-[var(--text-dim)] text-xs hidden md:inline">→</span>
                  <span className="text-[var(--text-dim)] text-xs md:hidden">↓</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
