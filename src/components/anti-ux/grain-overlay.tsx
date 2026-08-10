import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GrainOverlayProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GrainOverlay({ className, children, ...props }: GrainOverlayProps) {
  return (
    <div className={cn("grain-overlay relative", className)} {...props}>
      {children}
    </div>
  );
}
