import { CheckCircle2 } from "lucide-react";

export function QuoteSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-10">
      <div className="border-l-3 md:border-l-4 border-[#FF6B35] pl-4 md:pl-6 flex flex-col gap-3 md:gap-4 max-w-3xl">
        <blockquote className="text-base md:text-lg lg:text-xl font-bold text-[#1A1A2E] leading-relaxed">
          &ldquo;I don&apos;t just deploy code. I deploy systems that make deploying code{" "}
          <span className="bg-[#FF6B35] text-white px-1.5 py-0.5 border border-[#1A1A2E]">
            boring &amp; predictable.
          </span>
          &rdquo;
        </blockquote>

        <div className="flex flex-wrap gap-3 md:gap-4">
          {[
            "Zero-downtime Blue/Green",
            "Immutable Infrastructure (IaC)",
            "Least-Privilege Security",
          ].map((item) => (
            <div key={item} className="flex items-center gap-1.5 md:gap-2 font-mono text-[10px] md:text-xs font-bold text-zinc-700">
              <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-emerald-600 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
