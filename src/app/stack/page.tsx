import { GrainOverlay } from "@/components/anti-ux/grain-overlay";
import { Navigation } from "@/components/layout/navigation";
import { ViewportType } from "@/components/anti-ux/viewport-type";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { StackCategory } from "@/components/sections/stack-category";
import { Footer } from "@/components/layout/footer";
import { Cloud, Layers, Server, Terminal, Shield, Database } from "lucide-react";

const STACK_CATEGORIES: Array<{
  id: string;
  title: string;
  iconType: "cloud" | "layers" | "server" | "terminal" | "shield";
  defaultOpen: boolean;
  tools: Array<{
    name: string;
    badge: string;
    description: string;
    proficiency: "Expert" | "Advanced" | "Intermediate";
  }>;
}> = [
  {
    id: "cloud-infra",
    title: "Cloud Infrastructure (AWS)",
    iconType: "cloud",
    defaultOpen: true,
    tools: [
      {
        name: "AWS Lambda",
        badge: "Serverless",
        description: "Event-driven compute. Built 41 REST microservices with Python runtimes.",
        proficiency: "Expert",
      },
      {
        name: "Amazon DynamoDB",
        badge: "NoSQL DB",
        description: "Single-digit millisecond latency data storage with On-Demand auto-scaling.",
        proficiency: "Expert",
      },
      {
        name: "Amazon API Gateway",
        badge: "REST API",
        description: "HTTP REST API routing, rate limiting, and Cognito authorizer integrations.",
        proficiency: "Expert",
      },
      {
        name: "Amazon S3",
        badge: "Object Storage",
        description: "Static website hosting, backup buckets, and lifecycle rule management.",
        proficiency: "Expert",
      },
      {
        name: "Amazon CloudFront",
        badge: "CDN Edge",
        description: "Global low-latency content distribution with SSL/TLS certificate management.",
        proficiency: "Advanced",
      },
    ],
  },
  {
    id: "iac",
    title: "Infrastructure as Code (IaC)",
    iconType: "layers",
    defaultOpen: true,
    tools: [
      {
        name: "Terraform",
        badge: "IaC Engine",
        description: "Declarative cloud provisioning, state management, and reusable modules.",
        proficiency: "Expert",
      },
      {
        name: "AWS CloudFormation",
        badge: "Native IaC",
        description: "Declarative JSON/YAML templates for multi-stack AWS resource deployment.",
        proficiency: "Advanced",
      },
    ],
  },
  {
    id: "cicd-containers",
    title: "CI/CD & Container Orchestration",
    iconType: "server",
    defaultOpen: true,
    tools: [
      {
        name: "Docker",
        badge: "Containers",
        description: "Multi-stage Dockerfile builds, image size optimization, and containerization.",
        proficiency: "Expert",
      },
      {
        name: "GitHub Actions",
        badge: "CI/CD Automation",
        description: "Automated test runs, security scanning, and automated AWS deployments.",
        proficiency: "Expert",
      },
      {
        name: "Nginx",
        badge: "Reverse Proxy",
        description: "Reverse proxy routing, SSL termination, and web server configuration.",
        proficiency: "Advanced",
      },
    ],
  },
  {
    id: "runtimes",
    title: "Runtimes & Automation Scripting",
    iconType: "terminal",
    defaultOpen: false,
    tools: [
      {
        name: "Python",
        badge: "Backend & ML",
        description: "Boto3 AWS SDK automation scripts, Lambda handlers, and scikit-learn models.",
        proficiency: "Expert",
      },
      {
        name: "Bash & Linux",
        badge: "Shell Scripting",
        description: "Unix system administration, shell automation, environment scripting.",
        proficiency: "Expert",
      },
      {
        name: "Node.js & TypeScript",
        badge: "Runtime",
        description: "Asynchronous API development, build tools, React frontend integrations.",
        proficiency: "Advanced",
      },
    ],
  },
  {
    id: "observability",
    title: "Observability & Security",
    iconType: "shield",
    defaultOpen: false,
    tools: [
      {
        name: "AWS CloudWatch",
        badge: "Monitoring",
        description: "Real-time log analytics, custom alarm triggers, and metric dashboards.",
        proficiency: "Advanced",
      },
      {
        name: "AWS IAM",
        badge: "Security Policy",
        description: "Least-privilege policy creation, role assume policies, and security isolation.",
        proficiency: "Expert",
      },
      {
        name: "Bandit Security",
        badge: "SAST Scanner",
        description: "Static AST security scanning for Python codebase vulnerabilities in CI.",
        proficiency: "Advanced",
      },
    ],
  },
];


export default function StackPage() {
  return (
    <GrainOverlay className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#1A1A2E] overflow-x-hidden">
      <Navigation />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        {/* Page Banner */}
        <div className="border-b-3 border-[#1A1A2E] pb-8 mb-12">
          <MonoLabel className="text-[#FF6B35] font-bold">TOOLS & INFRASTRUCTURE MATRIX</MonoLabel>
          <ViewportType as="h2" className="text-[var(--text-page)] font-black mt-2">
            TECH <span className="text-[#FF6B35]">STACK</span>
          </ViewportType>
          <p className="text-lg text-zinc-700 font-medium max-w-2xl mt-4 leading-relaxed">
            Battle-tested technologies, cloud platforms, IaC tools, and automated pipelines used in production.
          </p>
        </div>

        {/* Infinite Marquee */}
        <TechMarquee />

        {/* Expandable Categories */}
        <div className="flex flex-col gap-4 my-12">
          {STACK_CATEGORIES.map((category) => (
            <StackCategory key={category.id} {...category} />
          ))}
        </div>
      </main>

      <Footer />
    </GrainOverlay>
  );
}
