"use client";

import { useState, useEffect, useCallback } from "react";

interface ToastProps {
  message: string;
  duration?: number;
  onDone: () => void;
}

export function Toast({ message, duration = 2000, onDone }: ToastProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setExiting(true), duration);
    return () => clearTimeout(t);
  }, [duration]);

  useEffect(() => {
    if (exiting) {
      const t = setTimeout(onDone, 150);
      return () => clearTimeout(t);
    }
  }, [exiting, onDone]);

  return (
    <div className={`toast ${exiting ? "toast-exit" : ""}`}>
      <span className="text-[var(--text-dim)] mr-2">$</span>
      {message}
    </div>
  );
}

// Global toast hook
let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  const toast = useCallback((message: string) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const ToastContainer = () => (
    <>
      {toasts.map((t) => (
        <Toast key={t.id} message={t.message} onDone={() => removeToast(t.id)} />
      ))}
    </>
  );

  return { toast, ToastContainer };
}
