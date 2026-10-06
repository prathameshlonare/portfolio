import { SecHead } from "@/components/anti-ux/sec-head";

const STEPS = [
  {
    n: "02",
    title: "IaC",
    body: "Everything version-controlled and reproducible from a fresh account.",
    tools: ["Terraform", "CloudFormation"],
  },
  {
    n: "03",
    title: "CI/CD",
    body: "Cached pipelines with least-privilege deploy roles.",
    tools: ["GitHub Actions", "OIDC"],
  },
  {
    n: "04",
    title: "Observe",
    body: "Alarms that page on symptoms, dashboards for the rest.",
    tools: ["CloudWatch", "SNS"],
  },
  {
    n: "05",
    title: "Secure + Cost",
    body: "IAM least-privilege by default, $0 idle serverless where it fits.",
    tools: ["IAM", "S3", "Budgets"],
  },
];

export function Process() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-10">
      <SecHead index="03" label="PROCESS: HOW I WORK" />

      <div className="grid grid-cols-[64px_1fr] md:grid-cols-[90px_1fr] gap-3 md:gap-4 bg-white text-[#1A1A2E] border-2 border-[#1A1A2E] shadow-[4px_4px_0px_#FF6B35] md:shadow-[6px_6px_0px_#FF6B35] p-4 md:p-5 mb-3 md:mb-4">
        <div className="font-mono font-bold text-xl md:text-2xl text-[#FF6B35]">01</div>
        <div>
          <h3 className="text-base md:text-lg font-extrabold">Map before <br className="sm:hidden" />you touch</h3>
          <p className="text-sm text-zinc-700 leading-relaxed">
            Scope the system and blast radius first. Every later step stays cheap
            because this one was honest.
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {["AWS", "Terraform"].map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] font-bold bg-[#FAFAFA] border border-[#1A1A2E] px-1.5 py-px"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {STEPS.map((step) => (
          <div
            key={step.n}
            className="grid grid-cols-[64px_1fr] gap-3 bg-white border-2 border-[#1A1A2E] shadow-[4px_4px_0px_#1A1A2E] p-4"
          >
            <div className="font-mono font-bold text-xl md:text-2xl text-[#FF6B35]">
              {step.n}
            </div>
            <div>
              <h3 className="text-base md:text-lg font-extrabold text-[#1A1A2E]">
                {step.title}
              </h3>
              <p className="text-sm text-zinc-700 leading-relaxed">{step.body}</p>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {step.tools.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] font-bold bg-[#FAFAFA] border border-[#1A1A2E] px-1.5 py-px"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
