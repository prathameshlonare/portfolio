import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ExposedGridProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function ExposedGrid({ className, children, ...props }: ExposedGridProps) {
  return (
    <div className={cn("grid-exposed relative", className)} {...props}>
      {children}
    </div>
  );
}
