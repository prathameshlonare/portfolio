"use client";

import React, { useEffect, useState } from "react";
import { Eye, Radio, Activity } from "lucide-react";

const CLOUDFLARE_WORKER_URL = "https://portfolio-counter.prathameshlonare9.workers.dev/";

export function VisitorTelemetry() {
  const [uniqueVisitors, setUniqueVisitors] = useState<number | null>(null);
  const [activeViewers, setActiveViewers] = useState<number | null>(null);

  useEffect(() => {
    fetch(CLOUDFLARE_WORKER_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.unique_visitors === "number") {
          setUniqueVisitors(data.unique_visitors);
        }
        if (data && typeof data.active_viewers === "number") {
          setActiveViewers(data.active_viewers);
        }
      })
      .catch(() => {});

    const interval = setInterval(() => {
      fetch(CLOUDFLARE_WORKER_URL)
        .then((res) => res.json())
        .then((data) => {
          if (data && typeof data.active_viewers === "number") {
            setActiveViewers(data.active_viewers);
          }
        })
        .catch(() => {});
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-2 border-[#1A1A2E] bg-[#0D0D1A] text-white p-3 font-mono text-xs shadow-[4px_4px_0px_#FF6B35] flex flex-wrap items-center justify-between gap-3 my-4">
      {/* Telemetry Stream Badge */}
      <div className="flex items-center gap-2 font-extrabold text-[#FF6B35]">
        <Radio className="w-3.5 h-3.5 text-[#FF6B35] animate-pulse" />
        <span className="tracking-wider">[SYS_TELEMETRY]</span>
      </div>

      {/* Live Active Viewers */}
      <div className="flex items-center gap-2 bg-[#1A1A2E] border border-emerald-500/40 px-3 py-1 text-emerald-400 font-bold">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <Eye className="w-3.5 h-3.5 text-emerald-400" />
        <span>{activeViewers !== null ? `${activeViewers} LIVE NOW` : "CONNECTING..."}</span>
      </div>

      {/* Unique Visitors */}
      <div className="flex items-center gap-2 bg-[#1A1A2E] border border-purple-500/40 px-3 py-1 text-zinc-200 font-bold">
        <Activity className="w-3.5 h-3.5 text-[#7C3AED]" />
        <span>UNIQUE VISITORS: <strong className="text-[#FF6B35]">{uniqueVisitors !== null ? uniqueVisitors.toLocaleString() : "..."}</strong></span>
      </div>
    </div>
  );
}
