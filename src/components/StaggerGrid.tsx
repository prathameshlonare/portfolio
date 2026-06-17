"use client";

import { useRef, useState, useEffect } from "react";
import { SkillBadge } from "@/components/SkillBadge";

interface StaggerGridProps {
  skills: string[];
}

export function StaggerGrid({ skills }: StaggerGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-wrap gap-2.5">
      {skills.map((skill, i) => (
        <div
          key={skill}
          className={`stagger-item ${revealed ? "revealed" : ""}`}
          style={{ animationDelay: `${i * 40}ms` }}
        >
          <SkillBadge skill={skill} />
        </div>
      ))}
    </div>
  );
}
