import { NumberTicker } from "@/components/animated/number-ticker";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { Zap, Users, Timer, Layers } from "lucide-react";

export function Metrics() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
      <div className="bg-white border-3 border-[#1A1A2E] shadow-[4px_4px_0px_#1A1A2E] sm:shadow-[6px_6px_0px_#1A1A2E] md:shadow-[8px_8px_0px_#1A1A2E] p-3 sm:p-4 md:p-6 lg:p-8">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
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
              Event microservices across 3 projects
            </p>
          </div>

          {/* Metric 2 */}
          <div className="border-2 border-[#1A1A2E] bg-[#FAFAFA] p-2.5 sm:p-3.5 md:p-5 shadow-[2px_2px_0px_#7C3AED] sm:shadow-[3px_3px_0px_#7C3AED] md:shadow-[4px_4px_0px_#7C3AED] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5 md:mb-2 text-zinc-600">
                <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#7C3AED] shrink-0" />
                <MonoLabel className="text-[8px] sm:text-[9px] md:text-[11px] truncate">ACTIVE USERS</MonoLabel>
              </div>
              <div className="text-xl sm:text-2xl md:text-[var(--text-section)] font-black text-[#1A1A2E] leading-tight py-0.5 sm:py-1">
                <NumberTicker value={500} suffix="+" />
              </div>
            </div>
            <p className="font-mono text-[9px] sm:text-[10px] md:text-xs text-zinc-600 mt-1 md:mt-2 font-medium leading-tight">
              Load tested on Cognito voting platform
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
              Cut via GitHub Actions caching
            </p>
          </div>

          {/* Metric 4 */}
          <div className="border-2 border-[#1A1A2E] bg-[#FAFAFA] p-2.5 sm:p-3.5 md:p-5 shadow-[2px_2px_0px_#7C3AED] sm:shadow-[3px_3px_0px_#7C3AED] md:shadow-[4px_4px_0px_#7C3AED] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5 md:mb-2 text-zinc-600">
                <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#7C3AED] shrink-0" />
                <MonoLabel className="text-[8px] sm:text-[9px] md:text-[11px] truncate">IDLE AWS BILL</MonoLabel>
              </div>
              <div className="text-xl sm:text-2xl md:text-[var(--text-section)] font-black text-[#1A1A2E] flex items-center gap-1 leading-tight py-0.5 sm:py-1">
                <span>$0</span>
                <span className="text-xs sm:text-sm md:text-base font-bold text-zinc-500">/MO</span>
              </div>
            </div>
            <p className="font-mono text-[9px] sm:text-[10px] md:text-xs text-zinc-600 mt-1 md:mt-2 font-medium leading-tight">
              Pay-per-request serverless
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
