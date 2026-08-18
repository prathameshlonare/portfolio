"use client";

import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

export function MovingBorder({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: {
  children?: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);
  const isInView = useInView(svgRef, { margin: "50px" });

  useAnimationFrame((time) => {
    if (!isInView) return;
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val || 0).x || 0
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val || 0).y || 0
  );

  const transform = useMotionTemplate`translate(${x}px, ${y}px) translate(-50%, -50%)`;

  return (
    <>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full inset-0"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

export function MovingBorderCard({
  children,
  className,
  containerClassName,
  duration = 3500,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  duration?: number;
}) {
  return (
    <div
      className={cn(
        "relative bg-white border-3 border-[#1A1A2E] shadow-[6px_6px_0px_#1A1A2E] p-[3px] overflow-hidden group",
        containerClassName
      )}
    >
      <div className="absolute inset-0">
        <MovingBorder duration={duration}>
          <div className="h-28 w-28 opacity-90 bg-[radial-gradient(#FF6B35_40%,transparent_60%)]" />
        </MovingBorder>
      </div>

      <div className={cn("relative bg-white w-full h-full p-6 z-10", className)}>
        {children}
      </div>
    </div>
  );
}
