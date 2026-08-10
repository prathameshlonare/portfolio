"use client";

import React, { HTMLAttributes, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface NeoCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "orange" | "purple";
  children: React.ReactNode;
}

export function NeoCard({
  variant = "default",
  className,
  children,
  ...props
}: NeoCardProps) {
  const variantStyles = {
    default: "neo-card",
    orange: "border-3 border-[#1A1A2E] bg-white shadow-[6px_6px_0px_#FF6B35] hover:shadow-[8px_8px_0px_#1A1A2E] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5",
    purple: "border-3 border-[#1A1A2E] bg-white shadow-[6px_6px_0px_#7C3AED] hover:shadow-[8px_8px_0px_#FF6B35] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5",
  };

  return (
    <div
      className={cn("p-6 relative", variantStyles[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}
