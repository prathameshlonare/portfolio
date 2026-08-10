import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface NeoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "purple";
  children: React.ReactNode;
}

export function NeoButton({
  variant = "primary",
  className,
  children,
  ...props
}: NeoButtonProps) {
  const variantStyles = {
    primary: "neo-btn",
    secondary: "neo-btn neo-btn-secondary",
    purple: "neo-btn bg-[#7C3AED] hover:bg-[#6d28d9] text-white",
  };

  return (
    <button
      className={cn(variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
