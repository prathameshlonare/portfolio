import { CheckCircle2 } from "lucide-react";

export function QuoteSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="border-l-4 border-[#FF6B35] pl-6 flex flex-col gap-4 max-w-3xl">
        <blockquote className="text-lg md:text-xl font-bold text-[#1A1A2E] leading-relaxed">
          &ldquo;I don&apos;t just deploy code. I deploy systems that make deploying code{" "}
          <span className="bg-[#FF6B35] text-white px-1.5 py-0.5 border border-[#1A1A2E]">
            boring &amp; predictable.
          </span>
          &rdquo;
        </blockquote>

        <div className="flex flex-wrap gap-4">
          {[
            "Zero-downtime Blue/Green",
            "Immutable Infrastructure (IaC)",
            "Least-Privilege Security",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 font-mono text-xs font-bold text-zinc-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
