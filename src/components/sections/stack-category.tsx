"use client";

import React, { useState } from "react";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { ChevronDown, ChevronUp, CheckCircle2, Cloud, Layers, Server, Terminal, Shield } from "lucide-react";

const ICON_MAP = {
  cloud: Cloud,
  layers: Layers,
  server: Server,
  terminal: Terminal,
  shield: Shield,
};

export type CategoryIconType = keyof typeof ICON_MAP;

export interface ToolDetail {
  name: string;
  badge: string;
  description: string;
  proficiency: "Expert" | "Advanced" | "Intermediate";
}

export interface StackCategoryProps {
  id: string;
  title: string;
  iconType?: CategoryIconType;
  tools: ToolDetail[];
  defaultOpen?: boolean;
}

export function StackCategory({
  id,
  title,
  iconType = "cloud",
  tools,
  defaultOpen = false,
}: StackCategoryProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const IconComponent = ICON_MAP[iconType] || Cloud;

  return (
    <div id={id} className="w-full max-w-7xl mx-auto my-6 border-3 border-[#1A1A2E] bg-white shadow-[6px_6px_0px_#1A1A2E]">
      {/* Category Header Bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
        className="w-full p-4 md:p-6 flex justify-between items-center bg-[#FAFAFA] border-b-2 border-[#1A1A2E] text-left transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#1A1A2E] cursor-pointer"
      >
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-white border-2 border-[#1A1A2E] shadow-[2px_2px_0px_#FF6B35] flex items-center justify-center text-[#FF6B35] shrink-0">
            <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <div className="min-w-0">
            <MonoLabel className="text-[#FF6B35] hidden md:block">ECOSYSTEM CATEGORY</MonoLabel>
            <h3 id={`heading-${id}`} className="text-base md:text-xl lg:text-2xl font-black text-[#1A1A2E] tracking-tight truncate">{title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <span className="hidden sm:inline-block font-mono text-[10px] md:text-xs font-bold text-zinc-500 bg-white border border-[#1A1A2E] px-2 md:px-2.5 py-0.5 md:py-1">
            {tools.length} TOOLS
          </span>
          <div className="w-7 h-7 md:w-8 md:h-8 bg-white border-2 border-[#1A1A2E] shadow-[2px_2px_0px_#1A1A2E] flex items-center justify-center">
            {isOpen ? <ChevronUp className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4" />}
          </div>
        </div>
      </button>

      {/* Expanded Tools Grid */}
      <div
        id={`panel-${id}`}
        role="region"
        aria-labelledby={`heading-${id}`}
        hidden={!isOpen}
        className={`p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 bg-white ${
          isOpen ? "" : "hidden"
        }`}
      >
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="border-2 border-[#1A1A2E] bg-[#FAFAFA] p-4 md:p-5 shadow-[4px_4px_0px_#1A1A2E] hover:shadow-[6px_6px_0px_#1A1A2E] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-mono font-extrabold text-base text-[#1A1A2E]">{tool.name}</h4>
                <span className="font-mono text-[10px] font-bold bg-[#FF6B35] text-white px-2 py-0.5 border border-[#1A1A2E] shadow-[1px_1px_0px_#1A1A2E]">
                  {tool.badge}
                </span>
              </div>
              <p className="text-xs font-medium text-zinc-600 leading-relaxed mb-4">
                {tool.description}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-300 flex justify-between items-center font-mono text-[11px]">
              <span className="text-zinc-500 font-semibold">Proficiency:</span>
              <span className="font-extrabold text-[#7C3AED] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {tool.proficiency}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
