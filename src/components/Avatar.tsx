"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function Avatar() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 border-[var(--accent-green)] overflow-hidden shrink-0 glow-green ${
        animate ? "animate-[avatar-in_0.5s_ease-out_both]" : ""
      }`}
    >
      <Image
        src="/profile.png"
        alt="Prathamesh Lonare"
        width={64}
        height={64}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
