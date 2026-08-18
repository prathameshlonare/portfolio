import { NumberTicker } from "@/components/animated/number-ticker";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { Zap, Users, Timer, Layers } from "lucide-react";

export function Metrics() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
      <div className="bg-white border-3 border-[#1A1A2E] shadow-[6px_6px_0px_#1A1A2E] md:shadow-[8px_8px_0px_#1A1A2E] p-4 md:p-6 lg:p-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {/* Metric 1 */}
          <div className="border-2 border-[#1A1A2E] bg-[#FAFAFA] p-3.5 md:p-5 shadow-[3px_3px_0px_#FF6B35] md:shadow-[4px_4px_0px_#FF6B35]">
            <div className="flex items-center gap-2 mb-1.5 md:mb-2 text-zinc-600">
              <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#FF6B35]" />
              <MonoLabel className="text-[9px] md:text-[11px]">LAMBDA FUNCTIONS</MonoLabel>
            </div>
            <div className="text-2xl md:text-[var(--text-section)] font-black text-[#1A1A2E] leading-tight py-1">
              <NumberTicker value={41} />
            </div>
            <p className="font-mono text-[10px] md:text-xs text-zinc-600 mt-1.5 md:mt-2 font-medium">
              Serverless endpoints running on AWS
            </p>
          </div>

          {/* Metric 2 */}
          <div className="border-2 border-[#1A1A2E] bg-[#FAFAFA] p-3.5 md:p-5 shadow-[3px_3px_0px_#7C3AED] md:shadow-[4px_4px_0px_#7C3AED]">
            <div className="flex items-center gap-2 mb-1.5 md:mb-2 text-zinc-600">
              <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#7C3AED]" />
              <MonoLabel className="text-[9px] md:text-[11px]">USERS SERVED</MonoLabel>
            </div>
            <div className="text-2xl md:text-[var(--text-section)] font-black text-[#1A1A2E] leading-tight py-1">
              <NumberTicker value={500} suffix="+" />
            </div>
            <p className="font-mono text-[10px] md:text-xs text-zinc-600 mt-1.5 md:mt-2 font-medium">
              Active users on voting platform
            </p>
          </div>

          {/* Metric 3 */}
          <div className="border-2 border-[#1A1A2E] bg-[#FAFAFA] p-3.5 md:p-5 shadow-[3px_3px_0px_#FF6B35] md:shadow-[4px_4px_0px_#FF6B35]">
            <div className="flex items-center gap-2 mb-1.5 md:mb-2 text-zinc-600">
              <Timer className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#FF6B35]" />
              <MonoLabel className="text-[9px] md:text-[11px]">DEPLOY TIME CUT</MonoLabel>
            </div>
            <div className="text-2xl md:text-[var(--text-section)] font-black text-[#1A1A2E] flex items-center gap-1.5 leading-tight py-1">
              <span>12m</span>
              <span className="text-[#FF6B35]">→</span>
              <span>3m</span>
            </div>
            <p className="font-mono text-[10px] md:text-xs text-zinc-600 mt-1.5 md:mt-2 font-medium">
              75% faster CI/CD build execution
            </p>
          </div>

          {/* Metric 4 */}
          <div className="border-2 border-[#1A1A2E] bg-[#FAFAFA] p-3.5 md:p-5 shadow-[3px_3px_0px_#7C3AED] md:shadow-[4px_4px_0px_#7C3AED]">
            <div className="flex items-center gap-2 mb-1.5 md:mb-2 text-zinc-600">
              <Layers className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#7C3AED]" />
              <MonoLabel className="text-[9px] md:text-[11px]">EC2 COST SAVINGS</MonoLabel>
            </div>
            <div className="text-2xl md:text-[var(--text-section)] font-black text-[#1A1A2E] leading-tight py-1">
              <NumberTicker value={80} suffix="%" />
            </div>
            <p className="font-mono text-[10px] md:text-xs text-zinc-600 mt-1.5 md:mt-2 font-medium">
              Cost reduction vs provisioned servers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
