import { NumberTicker } from "@/components/animated/number-ticker";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { SecHead } from "@/components/anti-ux/sec-head";
import { Zap, Boxes, Timer } from "lucide-react";

export function Metrics() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
      <SecHead index="02" label="OUTCOMES: DELTAS, NOT VANITY" />
      <div className="bg-white border-3 border-[#1A1A2E] shadow-[4px_4px_0px_#1A1A2E] sm:shadow-[6px_6px_0px_#1A1A2E] md:shadow-[8px_8px_0px_#1A1A2E] p-3 sm:p-4 md:p-6 lg:p-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6">
          {/* Metric 1 */}
          <div className="border-2 border-[#1A1A2E] bg-[#FAFAFA] p-2.5 sm:p-3.5 md:p-5 shadow-[2px_2px_0px_#FF6B35] sm:shadow-[3px_3px_0px_#FF6B35] md:shadow-[4px_4px_0px_#FF6B35] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5 md:mb-2 text-zinc-600">
                <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#FF6B35] shrink-0" />
                <MonoLabel className="text-[8px] sm:text-[9px] md:text-[11px] truncate">LAMBDA HANDLERS</MonoLabel>
              </div>
              <div className="text-xl sm:text-2xl md:text-[var(--text-section)] font-black text-[#1A1A2E] leading-tight py-0.5 sm:py-1">
                <NumberTicker value={41} />
              </div>
            </div>
            <p className="font-mono text-[9px] sm:text-[10px] md:text-xs text-zinc-600 mt-1 md:mt-2 font-medium leading-tight">
              Counted across 3 projects
            </p>
          </div>

          {/* Metric 2 */}
          <div className="border-2 border-[#1A1A2E] bg-[#FAFAFA] p-2.5 sm:p-3.5 md:p-5 shadow-[2px_2px_0px_#7C3AED] sm:shadow-[3px_3px_0px_#7C3AED] md:shadow-[4px_4px_0px_#7C3AED] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5 md:mb-2 text-zinc-600">
                <Boxes className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#7C3AED] shrink-0" />
                <MonoLabel className="text-[8px] sm:text-[9px] md:text-[11px] truncate">PRODUCTION STACKS</MonoLabel>
              </div>
              <div className="text-xl sm:text-2xl md:text-[var(--text-section)] font-black text-[#1A1A2E] leading-tight py-0.5 sm:py-1">
                <NumberTicker value={3} />
              </div>
            </div>
            <p className="font-mono text-[9px] sm:text-[10px] md:text-xs text-zinc-600 mt-1 md:mt-2 font-medium leading-tight">
              DuoKart, Dorm-Dish, Voting. All infra as code
            </p>
          </div>

          {/* Metric 3 */}
          <div className="border-2 border-[#1A1A2E] bg-[#FAFAFA] p-2.5 sm:p-3.5 md:p-5 shadow-[2px_2px_0px_#FF6B35] sm:shadow-[3px_3px_0px_#FF6B35] md:shadow-[4px_4px_0px_#FF6B35] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5 md:mb-2 text-zinc-600">
                <Timer className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#FF6B35] shrink-0" />
                <MonoLabel className="text-[8px] sm:text-[9px] md:text-[11px] truncate">DEPLOY TIME</MonoLabel>
              </div>
              <div className="text-lg sm:text-2xl md:text-[var(--text-section)] font-black text-[#1A1A2E] flex items-center gap-1 sm:gap-1.5 leading-tight py-0.5 sm:py-1">
                <span>12m</span>
                <span className="text-[#FF6B35]">→</span>
                <span>3m</span>
              </div>
            </div>
            <p className="font-mono text-[9px] sm:text-[10px] md:text-xs text-zinc-600 mt-1 md:mt-2 font-medium leading-tight">
              Cut via GitHub Actions caching on the voting-system pipeline
            </p>
          </div>
        </div>
        <div className="border-t-2 border-[#1A1A2E] mt-4 md:mt-6 pt-3 md:pt-4 font-mono text-[11px] md:text-xs flex flex-wrap items-center justify-between gap-2">
          <span className="font-bold text-zinc-600">
            PIPELINES <span className="text-[#FF6B35]">●</span> SNAPSHOT ON EVERY DEPLOY
          </span>
          <a href="/activity/" className="font-bold text-[#1A1A2E] hover:text-[#FF6B35] transition-colors">
            SEE LIVE PROOF →
          </a>
        </div>
      </div>
    </section>
  );
}
