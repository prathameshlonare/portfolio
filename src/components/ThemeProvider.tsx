"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<Theme>("dark");

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const preferred = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    setTheme(saved || preferred);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    document.documentElement.classList.add("theme-transitioning");
    setTheme((t) => (t === "dark" ? "light" : "dark"));
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 300);
  };

  return (
    <ThemeContext.Provider value={theme}>
      {mounted && (
        <button
          onClick={toggleTheme}
          className="theme-toggle fixed top-4 right-4 sm:top-6 sm:right-6 z-[50] flex items-center justify-center w-11 h-11 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 text-sm sm:text-xs font-mono rounded-lg border transition-all duration-200 hover:border-[var(--accent-green)] hover:text-[var(--accent-green)] active:scale-95"
          style={{
            backgroundColor: "var(--bg-elevated)",
            color: "var(--text-muted)",
            borderColor: "var(--border)",
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
          }}
          aria-label="Toggle theme"
        >
          <span className="sm:hidden">{theme === "dark" ? "☀" : "☾"}</span>
          <span className="hidden sm:inline">{theme === "dark" ? "$ light" : "$ dark"}</span>
        </button>
      )}
      {children}
    </ThemeContext.Provider>
  );
}