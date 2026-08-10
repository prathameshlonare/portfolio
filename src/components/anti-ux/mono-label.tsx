import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface MonoLabelProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function MonoLabel({ className, children, ...props }: MonoLabelProps) {
  return (
    <span
      className={cn("mono-label inline-block font-mono text-xs uppercase tracking-wider font-semibold text-zinc-500", className)}
      {...props}
    >
      {children}
    </span>
  );
}
