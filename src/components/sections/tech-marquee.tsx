import { Marquee } from "@/components/animated/marquee";

import { Cpu, Cloud, Database, Terminal, Shield, Workflow, Layers, Server } from "lucide-react";

const TECH_ITEMS = [
  { name: "AWS Lambda", category: "Serverless", icon: Cloud },
  { name: "Terraform", category: "IaC", icon: Layers },
  { name: "Docker", category: "Containers", icon: Server },
  { name: "GitHub Actions", category: "CI/CD", icon: Workflow },
  { name: "DynamoDB", category: "NoSQL Database", icon: Database },
  { name: "CloudFront", category: "CDN Edge", icon: Shield },
  { name: "Python", category: "Automation", icon: Terminal },
  { name: "Linux & Bash", category: "Shell Systems", icon: Cpu },
];

export function TechMarquee() {
  return (
    <section className="w-full py-10 bg-white border-y-3 border-[#1A1A2E] overflow-hidden">


      <Marquee pauseOnHover repeat={4} className="[--duration:25s]">
        {TECH_ITEMS.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.name}
              className="neo-card flex items-center gap-3 px-5 py-3 border-2 border-[#1A1A2E] bg-white shadow-[4px_4px_0px_#1A1A2E] hover:shadow-[6px_6px_0px_#FF6B35] transition-all cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              <div className="w-8 h-8 rounded-none bg-[#FAFAFA] border border-[#1A1A2E] flex items-center justify-center text-[#FF6B35]">
                <IconComponent className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono font-extrabold text-sm text-[#1A1A2E]">
                  {item.name}
                </span>
                <span className="font-mono text-[10px] text-zinc-500 font-bold uppercase">
                  {item.category}
                </span>
              </div>
            </div>
          );
        })}
      </Marquee>
    </section>
  );
}
