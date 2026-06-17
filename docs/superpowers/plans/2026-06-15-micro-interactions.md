# Micro-Interactions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 5 terminal-themed micro-interactions inspired by jrands.com: scramble text, magnetic hover, scroll stagger reveals, prompt glow ripple, and glitch flicker on section headers.

**Architecture:** Pure CSS + vanilla React hooks. No animation libraries. All effects use transform/opacity for GPU acceleration. Each interaction is a standalone component/hook that composes into existing elements. Respects `prefers-reduced-motion` throughout.

**Tech Stack:** React 19, TypeScript, CSS custom properties, IntersectionObserver, requestAnimationFrame

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `src/hooks/useScramble.ts` | Create | Scramble text effect hook |
| `src/hooks/useMagneticHover.ts` | Create | Magnetic cursor tracking hook |
| `src/hooks/useStaggerReveal.ts` | Create | Scroll-triggered stagger animation hook |
| `src/components/ScrambleText.tsx` | Create | Wrapper component for scramble effect |
| `src/components/GlitchFlicker.tsx` | Create | Terminal glitch flicker on section headers |
| `src/app/globals.css` | Modify | Add scramble, ripple, stagger, glitch CSS |
| `src/components/SkillBadge.tsx` | Modify | Wrap skill name in ScrambleText |
| `src/components/ProjectCard.tsx` | Modify | Add magnetic hover + scramble on project name |
| `src/app/page.tsx` | Modify | Add stagger reveal to skill grid + glitch headers |

---

### Task 1: Create `useScramble` hook

**Files:**
- Create: `src/hooks/useScramble.ts`

This hook takes a string and returns an object with `chars` (array of individual characters) and `scramble()` function. On call, each character cycles through random terminal-themed characters before resolving to the original.

- [ ] **Step 1: Create the hook file**

```typescript
// src/hooks/useScramble.ts
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
      const totalFrames = 12;

      function tick() {
        frame++;
        spans.forEach((span, i) => {
          const delay = i * 1.5;
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

        if (frame < totalFrames + chars.length * 1.5) {
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
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project tsconfig.json`
Expected: No errors

---

### Task 2: Create `ScrambleText` component

**Files:**
- Create: `src/components/ScrambleText.tsx`

A client component that wraps text and applies the scramble effect on hover (desktop) or on tap (mobile). Uses the `useScramble` hook internally.

- [ ] **Step 1: Create the component**

```tsx
// src/components/ScrambleText.tsx
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
  const ref = useRef<HTMLElement>(null);
  const { scramble } = useScramble(text);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
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
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project tsconfig.json`
Expected: No errors

---

### Task 3: Create `useMagneticHover` hook

**Files:**
- Create: `src/hooks/useMagneticHover.ts`

Attaches mousemove/mouseleave handlers to a ref. On move, applies a subtle transform (max 3px) toward the cursor. On leave, springs back to origin. Uses CSS transition for the spring-back.

- [ ] **Step 1: Create the hook**

```typescript
// src/hooks/useMagneticHover.ts
"use client";

import { useCallback, useRef, useEffect } from "react";

interface MagneticOptions {
  strength?: number; // max px offset, default 3
  transitionMs?: number; // spring-back duration, default 300
}

export function useMagneticHover<T extends HTMLElement>(
  options: MagneticOptions = {}
) {
  const { strength = 3, transitionMs = 300 } = options;
  const ref = useRef<T>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      el.style.transition = "none";
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = `transform ${transitionMs}ms cubic-bezier(0.23, 1, 0.32, 1)`;
    el.style.transform = "translate(0, 0)";
  }, [transitionMs]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project tsconfig.json`
Expected: No errors

---

### Task 4: Create `useStaggerReveal` hook

**Files:**
- Create: `src/hooks/useStaggerReveal.ts`

Returns a ref and `isVisible` boolean. Uses IntersectionObserver. Once visible, sets `isVisible` to true and disconnects. The consuming component applies staggered animation-delay based on index.

- [ ] **Step 1: Create the hook**

```typescript
// src/hooks/useStaggerReveal.ts
"use client";

import { useRef, useState, useEffect } from "react";

interface StaggerOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useStaggerReveal<T extends HTMLElement>(options: StaggerOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px" } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project tsconfig.json`
Expected: No errors

---

### Task 5: Create `GlitchFlicker` component

**Files:**
- Create: `src/components/GlitchFlicker.tsx`

Wraps children. On hover, applies a brief 150ms "glitch" effect: rapid opacity flicker + slight horizontal shift. Pure CSS animation triggered by a class toggle.

- [ ] **Step 1: Create the component**

```tsx
// src/components/GlitchFlicker.tsx
"use client";

import { useState, useCallback } from "react";

interface GlitchFlickerProps {
  children: React.ReactNode;
  className?: string;
}

export function GlitchFlicker({ children, className = "" }: GlitchFlickerProps) {
  const [glitching, setGlitching] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (glitching) return;
    setGlitching(true);
    setTimeout(() => setGlitching(false), 150);
  }, [glitching]);

  return (
    <span
      className={`glitch-flicker ${glitching ? "glitch-active" : ""} ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{ display: "inline-block" }}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project tsconfig.json`
Expected: No errors

---

### Task 6: Add CSS for all new animations

**Files:**
- Modify: `src/app/globals.css`

Add keyframes and classes for: scramble char opacity, stagger reveal, glitch flicker, prompt ripple. All use transform/opacity only. All gated behind `prefers-reduced-motion`.

- [ ] **Step 1: Append animation CSS to globals.css**

Add the following block before the closing `@layer base` rule (before line 603):

```css
/* ── Micro-interaction animations ── */

/* Scramble text char entrance */
@keyframes scramble-in {
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Stagger reveal for skill badges */
@keyframes stagger-fade-up {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stagger-item {
  opacity: 0;
  transform: translateY(8px);
}

.stagger-item.revealed {
  animation: stagger-fade-up 300ms var(--ease-out) forwards;
}

/* Glitch flicker effect */
@keyframes glitch-1 {
  0% { opacity: 1; transform: translateX(0); }
  20% { opacity: 0.6; transform: translateX(-2px); }
  40% { opacity: 1; transform: translateX(1px); }
  60% { opacity: 0.7; transform: translateX(-1px); }
  80% { opacity: 1; transform: translateX(0); }
  100% { opacity: 1; transform: translateX(0); }
}

.glitch-flicker {
  cursor: default;
  transition: color 150ms ease;
}

.glitch-active {
  animation: glitch-1 150ms steps(4) forwards;
  color: var(--accent-green) !important;
}

/* Prompt glow ripple */
@keyframes prompt-ripple {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent-green) 30%, transparent);
  }
  70% {
    box-shadow: 0 0 0 8px color-mix(in srgb, var(--accent-green) 0%, transparent);
  }
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent-green) 0%, transparent);
  }
}

.prompt-ripple {
  animation: prompt-ripple 2s ease-out 1;
}

/* Magnetic hover target - disable on touch */
@media (hover: hover) and (pointer: fine) {
  .magnetic-target {
    will-change: transform;
  }
}

/* Reduced motion: kill all new animations */
@media (prefers-reduced-motion: reduce) {
  .stagger-item {
    opacity: 1 !important;
    transform: none !important;
  }

  .stagger-item.revealed {
    animation: none !important;
  }

  .glitch-active {
    animation: none !important;
  }

  .prompt-ripple {
    animation: none !important;
  }
}
```

- [ ] **Step 2: Verify CSS parses**

Run: `npx next lint --file src/app/globals.css`
Expected: No CSS-related errors

---

### Task 7: Add scramble effect to SkillBadge

**Files:**
- Modify: `src/components/SkillBadge.tsx`

Wrap the skill name text in `ScrambleText` so each badge scrambles terminal chars on hover.

- [ ] **Step 1: Update SkillBadge**

```tsx
// src/components/SkillBadge.tsx
"use client"

import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { ScrambleText } from "@/components/ScrambleText"

export function SkillBadge({ skill }: { skill: string }) {
  return (
    <Tooltip>
      <TooltipTrigger render={<Badge variant="terminal" />}>
        <ScrambleText text={skill} />
      </TooltipTrigger>
      <TooltipContent>
        <span>{skill}</span>
      </TooltipContent>
    </Tooltip>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project tsconfig.json`
Expected: No errors

---

### Task 8: Add magnetic hover + scramble to ProjectCard

**Files:**
- Modify: `src/components/ProjectCard.tsx`

Add magnetic hover to the project card container. Add `ScrambleText` to the project name link.

- [ ] **Step 1: Update ProjectCard imports and add magnetic ref**

Replace the existing `ProjectCard.tsx` content:

```tsx
// src/components/ProjectCard.tsx
"use client";

import { useState } from "react";
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
        className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          maxHeight: open ? "800px" : "0px",
          opacity: open ? 1 : 0,
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
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project tsconfig.json`
Expected: No errors

---

### Task 9: Add stagger reveal to skill badges grid

**Files:**
- Modify: `src/app/page.tsx`

Import `useStaggerReveal` and apply stagger animation to each skill badge in the skills section.

- [ ] **Step 1: Update page.tsx imports**

Add these imports at the top of `page.tsx`:

```typescript
import { GlitchFlicker } from "@/components/GlitchFlicker";
```

- [ ] **Step 2: Replace the skills section**

Replace the skills section (lines 208-216) with:

```tsx
{/* Skills */}
<section id="skills" className="scroll-mt-16 md:scroll-mt-24 mb-10">
  <TerminalSection command="cat skills.json">
    <div className="flex flex-wrap gap-2.5">
      {skills.map((skill, i) => (
        <div
          key={skill}
          className="stagger-item"
          style={{ animationDelay: `${i * 40}ms` }}
        >
          <SkillBadge skill={skill} />
        </div>
      ))}
    </div>
  </TerminalSection>
</section>
```

- [ ] **Step 3: Update the skills section rendering to trigger stagger**

The `stagger-item` class needs the `revealed` class added when the section scrolls into view. We need to update the `TerminalSection` component to accept an `onVisible` callback, or we can add a separate observer in `page.tsx`. Simpler approach: add a small client wrapper for the skills grid.

Create a new file `src/components/StaggerGrid.tsx`:

```tsx
// src/components/StaggerGrid.tsx
"use client";

import { useRef, useState, useEffect } from "react";

interface StaggerGridProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerGrid({ children, className = "" }: StaggerGridProps) {
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
    <div ref={ref} className={className}>
      {revealed
        ? (children as React.ReactElement).props.children
        : (children as React.ReactElement).props.children}
    </div>
  );
}
```

Actually, simpler: just use the `TerminalSection`'s existing IntersectionObserver. The `stagger-item` elements get `revealed` class via a client component. Let me use a cleaner approach — modify the page.tsx skills section to use a client-side stagger wrapper:

Replace the skills section in `page.tsx` with:

```tsx
{/* Skills */}
<section id="skills" className="scroll-mt-16 md:scroll-mt-24 mb-10">
  <TerminalSection command="cat skills.json">
    <StaggerGrid skills={skills} />
  </TerminalSection>
</section>
```

Then create `src/components/StaggerGrid.tsx`:

```tsx
// src/components/StaggerGrid.tsx
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
```

- [ ] **Step 4: Update page.tsx imports and remove inline skill rendering**

Update the imports in `page.tsx`:

```typescript
import { Avatar } from "@/components/Avatar";
import { TypingText } from "@/components/TypingText";
import { ProjectCard } from "@/components/ProjectCard";
import { ArchDiagram } from "@/components/ArchDiagram";
import { SkillBadge } from "@/components/SkillBadge";
import { ScrollSpy } from "@/components/ScrollSpy";
import { TerminalSection } from "@/components/TerminalSection";
import { HeroContent } from "@/components/HeroContent";
import { GlitchFlicker } from "@/components/GlitchFlicker";
import { StaggerGrid } from "@/components/StaggerGrid";
```

Remove the `SkillBadge` import if it's no longer used directly in page.tsx (it's now only used inside `StaggerGrid`). Actually keep it — it's still imported for potential direct use. But we can remove it since `StaggerGrid` handles it.

Updated imports:

```typescript
import { Avatar } from "@/components/Avatar";
import { TypingText } from "@/components/TypingText";
import { ProjectCard } from "@/components/ProjectCard";
import { ArchDiagram } from "@/components/ArchDiagram";
import { ScrollSpy } from "@/components/ScrollSpy";
import { TerminalSection } from "@/components/TerminalSection";
import { HeroContent } from "@/components/HeroContent";
import { GlitchFlicker } from "@/components/GlitchFlicker";
import { StaggerGrid } from "@/components/StaggerGrid";
```

- [ ] **Step 5: Add glitch flicker to section command headers**

Wrap the command text in `GlitchFlicker` in the TerminalSection. Update `TerminalSection.tsx`:

```tsx
// src/components/TerminalSection.tsx
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
```

- [ ] **Step 6: Add prompt ripple animation to hero terminal prompt**

In `page.tsx`, add the `prompt-ripple` class to the hero's terminal prompt div. Replace the hero section's prompt line (around line 44):

```tsx
<div className="text-[var(--text-dim)] text-xs md:text-sm mb-3 font-mono prompt-ripple rounded-lg px-2 py-1 inline-block">
  prathamesh@portfolio:~$
</div>
```

- [ ] **Step 7: Verify full build**

Run: `npx next build`
Expected: Build succeeds with no errors

---

### Task 11: Final verification

- [ ] **Step 1: Run lint**

Run: `npx next lint`
Expected: No errors

- [ ] **Step 2: Run typecheck**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Manual browser test checklist**

Verify in browser:
- [ ] Skill badges scramble terminal chars on hover (desktop)
- [ ] Skill badges stagger-fade-in when scrolling to skills section
- [ ] Project card names scramble on hover
- [ ] Project cards have subtle magnetic pull toward cursor
- [ ] Section command text glitches on hover
- [ ] Hero prompt has ripple glow on page load
- [ ] All animations respect `prefers-reduced-motion: reduce`
- [ ] No layout shift from any animation
- [ ] Mobile: tap triggers scramble (no hover needed)
- [ ] Performance: no jank on scroll with all animations active

---

## Summary of Changes

| Micro-interaction | Where | Trigger | Duration |
|---|---|---|---|
| **Scramble text** | Skill badges, project names | Hover (desktop) / Tap (mobile) | ~200ms |
| **Magnetic hover** | Project cards | Mouse move | 300ms spring-back |
| **Stagger reveal** | Skill badges grid | Scroll into view | 300ms per badge, 40ms stagger |
| **Glitch flicker** | Section command text | Hover | 150ms |
| **Prompt ripple** | Hero terminal prompt | Page load | 2s single pulse |
