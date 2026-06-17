"use client";

import { useMagneticHover } from "@/hooks/useMagneticHover";

export function MagneticWrap({
  children,
  strength = 3,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useMagneticHover<HTMLDivElement>({ strength });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
