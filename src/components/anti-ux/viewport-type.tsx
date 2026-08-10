import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ViewportTypeProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "div";
  children: React.ReactNode;
}

export function ViewportType({
  as: Component = "h1",
  className,
  children,
  ...props
}: ViewportTypeProps) {
  return (
    <Component
      className={cn("viewport-type font-bold tracking-tighter text-[#1A1A2E]", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
