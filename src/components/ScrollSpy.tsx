"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const sections = [
  { id: "intro", label: "intro" },
  { id: "whoami", label: "whoami" },
  { id: "about", label: "about" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "education", label: "education" },
  { id: "certifications", label: "certifications" },
  { id: "contact", label: "contact" },
];

export function ScrollSpy() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isClickScrolling = useRef(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        for (let i = entries.length - 1; i >= 0; i--) {
          if (entries[i].isIntersecting) {
            const idx = sections.findIndex((s) => s.id === entries[i].target.id);
            if (idx !== -1) {
              setActiveIdx(idx);
              break;
            }
          }
        }
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0.05,
      },
    );

    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (searchOpen) {
        if (e.key === "Escape") {
          setSearchOpen(false);
          setSearchQuery("");
          return;
        }
        if (e.key === "Enter" && searchQuery.trim()) {
          const found = sections.find((s) =>
            s.label.includes(searchQuery.toLowerCase()),
          );
          if (found) {
            navigateTo(found.id);
          }
          setSearchOpen(false);
          setSearchQuery("");
          return;
        }
        return;
      }

      if (e.key === "/" && !e.ctrlKey && !e.metaKey && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        setSearchOpen(true);
        return;
      }

      if (e.key === "j" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.min(activeIdx + 1, sections.length - 1);
        navigateTo(sections[next].id);
      }

      if (e.key === "k" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = Math.max(activeIdx - 1, 0);
        navigateTo(sections[prev].id);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIdx, searchOpen, searchQuery]);

  useEffect(() => {
    if (drawerOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const top = parseInt(document.body.style.top || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, -top);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const navigateTo = useCallback((id: string) => {
    isClickScrolling.current = true;
    setDrawerOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    const idx = sections.findIndex((s) => s.id === id);
    if (idx !== -1) setActiveIdx(idx);
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  }, []);

  const active = sections[activeIdx]?.id ?? "intro";

  return (
    <>
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
          />
          <div className="relative bg-[var(--bg-elevated)] border border-[var(--border)] rounded-lg p-4 shadow-2xl w-[90vw] max-w-md">
            <div className="flex items-center gap-2 mb-3 text-xs text-[var(--text-dim)] font-mono">
              <span className="text-[var(--accent-green)]">/</span>
              <span>search sections</span>
            </div>
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type section name..."
              className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded px-3 py-2 text-sm text-[var(--text-primary)] font-mono placeholder:text-[var(--text-dim)] outline-none focus:border-[var(--accent-green)] transition-colors"
            />
            <div className="mt-2 text-[10px] text-[var(--text-dim)] font-mono">
              Enter to jump &middot; Esc to close
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block select-none">
        <div className="flex flex-col items-end gap-3">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => navigateTo(id)}
              className="group flex items-center gap-2 text-xs font-mono transition-all duration-200 cursor-pointer"
              style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
            >
              <span
                className={`transition-all duration-200 w-3 text-right ${
                  active === id
                    ? "text-[var(--accent-green)]"
                    : "text-[var(--text-dim)]"
                }`}
              >
                {active === id ? "▸" : ""}
              </span>
              <span
                className={`transition-all duration-200 ${
                  active === id
                    ? "text-[var(--accent-green)] opacity-100"
                    : "text-[var(--text-dim)] opacity-40 hover:opacity-70"
                }`}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-6 text-[10px] text-[var(--text-dim)] font-mono opacity-30 text-right leading-loose">
          j/k nav
          <br />
          / search
        </div>
      </nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setDrawerOpen((o) => !o)}
        className={`mobile-hamburger ${drawerOpen ? "open" : ""}`}
        aria-label="Toggle navigation"
        style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile backdrop */}
      <div
        className={`mobile-nav-backdrop ${drawerOpen ? "open" : ""}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Mobile drawer */}
      <div className={`mobile-nav-drawer ${drawerOpen ? "open" : ""}`}>
        <div className="text-[10px] text-[var(--text-dim)] font-mono mb-4 opacity-50">
          $ ls sections/
        </div>
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => navigateTo(id)}
            className={`nav-link ${active === id ? "active" : ""}`}
            style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
          >
            {label}
          </button>
        ))}
        <div className="mt-auto pt-6 text-[10px] text-[var(--text-dim)] font-mono opacity-30 leading-loose">
          j/k navigate
          <br />
          / search
        </div>
      </div>
    </>
  );
}
