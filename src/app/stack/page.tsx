import { Metadata } from "next";
import { GrainOverlay } from "@/components/anti-ux/grain-overlay";
import { Navigation } from "@/components/layout/navigation";
import { ViewportType } from "@/components/anti-ux/viewport-type";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { StackCategory, StackCategoryProps } from "@/components/sections/stack-category";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Tech Stack & Tools Matrix: Prathamesh Lonare | DevOps & Cloud Tools",
  description:
    "Explore the AWS cloud services, Terraform IaC configurations, Docker container workflows, and Linux automation tools I actively build with.",
  alternates: {
    canonical: "https://prathameshlonare.me/stack/",
  },
};

const STACK_CATEGORIES: StackCategoryProps[] = [
  {
    id: "cloud-infra",
    title: "Cloud Infrastructure (AWS)",
    iconType: "cloud",
    defaultOpen: true,
    tools: [
      {
        name: "AWS Lambda",
        badge: "Serverless",
        context: "Dorm-Dish & Voting",
        description: "41 REST handlers with API Gateway proxy routing and scoped IAM execution roles.",
        depth: 4,
      },
      {
        name: "Amazon DynamoDB",
        badge: "NoSQL DB",
        context: "Voting & Dorm-Dish",
        description: "On-Demand auto-scaling tables with composite primary keys (PK/SK) and conditional writes.",
        depth: 4,
      },
      {
        name: "AWS ALB & EC2 Auto Scaling",
        badge: "Compute & LB",
        context: "DuoKart Multi-Tier",
        description: "Internet-facing ALB routing to private Auto Scaling EC2s with connection draining.",
        depth: 3,
      },
      {
        name: "Amazon RDS (MySQL Multi-AZ)",
        badge: "Relational DB",
        context: "DuoKart Multi-Tier",
        description: "Automated multi-AZ failover in isolated subnets with SSM dynamic credential injection.",
        depth: 3,
      },
      {
        name: "Amazon SQS & DLQ",
        badge: "Message Queue",
        context: "DuoKart Orders",
        description: "Asynchronous order decoupling with 3-retry dead-letter queue poison isolation.",
        depth: 3,
      },
      {
        name: "Amazon S3 & CloudFront",
        badge: "Storage & CDN",
        context: "Portfolio & Dorm-Dish",
        description: "Private origin buckets with edge SSL/TLS termination and separate HTML/asset cache policies.",
        depth: 3,
      },
      {
        name: "Amazon API Gateway",
        badge: "REST Gateway",
        context: "Voting & Dorm-Dish",
        description: "HTTP REST API routing, CORS preflight handling, and Cognito authorizer validation.",
        depth: 3,
      },
    ],
  },
  {
    id: "iac",
    title: "Infrastructure as Code (IaC)",
    iconType: "layers",
    defaultOpen: false,
    tools: [
      {
        name: "Terraform",
        badge: "Declarative IaC",
        context: "Cloud Infrastructure",
        description: "Declarative AWS provisioning with S3 remote state and DynamoDB state locking.",
        depth: 4,
      },
      {
        name: "AWS CloudFormation",
        badge: "Native IaC",
        context: "DuoKart & Dorm-Dish",
        description: "Modular YAML resource stacks with parameter-driven subnets and automated rollback on failure.",
        depth: 3,
      },
    ],
  },
  {
    id: "cicd-containers",
    title: "CI/CD & Container Systems",
    iconType: "server",
    defaultOpen: false,
    tools: [
      {
        name: "GitHub Actions",
        badge: "CI/CD Pipelines",
        context: "Portfolio & Voting",
        description: "Multi-stage test/deploy pipelines with npm layer caching and automated CloudFront invalidation.",
        depth: 4,
      },
      {
        name: "Docker",
        badge: "Containers",
        context: "Local Dev & Build",
        description: "Multi-stage Dockerfiles optimizing image size and enforcing non-root user execution.",
        depth: 3,
      },
      {
        name: "Nginx",
        badge: "Reverse Proxy",
        context: "Web Routing",
        description: "Reverse proxy routing, SSL/TLS header pass-through, and upstream connection pooling.",
        depth: 2,
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
        name: "Linux & Bash",
        badge: "Operating System",
        context: "System Administration",
        description: "Process inspection, systemd service management, and POSIX shell deployment automation.",
        depth: 4,
      },
      {
        name: "Python",
        badge: "Backend & Boto3",
        context: "Lambda & Automation",
        description: "Boto3 AWS SDK client calls, Lambda event handlers, and data parsing pipelines.",
        depth: 4,
      },
      {
        name: "Node.js & TypeScript",
        badge: "Web Runtime",
        context: "Full-Stack Integrations",
        description: "Asynchronous API client development, React builds, and type-safe infrastructure configs.",
        depth: 3,
      },
    ],
  },
  {
    id: "observability",
    title: "Security & Observability",
    iconType: "shield",
    defaultOpen: false,
    tools: [
      {
        name: "AWS IAM",
        badge: "Access Policy",
        context: "All AWS Projects",
        description: "Strict least-privilege policy authoring with resource ARN scoping and zero wildcards.",
        depth: 4,
      },
      {
        name: "AWS CloudWatch",
        badge: "Monitoring",
        context: "DuoKart Infrastructure",
        description: "Centralized log groups, ALB 5xx and RDS CPU alarms, and billing budget notifications.",
        depth: 3,
      },
      {
        name: "Bandit Security",
        badge: "SAST Scanner",
        context: "Python CI Pipelines",
        description: "Static AST vulnerability scanner integrated into git pre-commit and CI runs.",
        depth: 2,
      },
    ],
  },
];

export default function StackPage() {
  return (
    <GrainOverlay className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#1A1A2E] overflow-x-hidden">
      <Navigation />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 w-full">
        {/* Page Banner */}
        <div className="border-b-3 border-[#1A1A2E] pb-6 md:pb-8 mb-8 md:mb-12">
          <MonoLabel className="text-[#FF6B35] font-bold">TOOLS & INFRASTRUCTURE MATRIX</MonoLabel>
          <ViewportType as="h1" className="text-[var(--text-page)] font-black mt-2">
            TECH <span className="text-[#FF6B35]">STACK</span>
          </ViewportType>
          <p className="text-base md:text-lg text-zinc-700 font-medium max-w-2xl mt-3 md:mt-4 leading-relaxed">
            Tools, cloud services, and runtimes I actively build with. Rather than subjective self-ratings, each entry lists the specific operational context and deliverable I configured.
          </p>
        </div>

        {/* Infinite Marquee */}
        <TechMarquee />

        {/* Expandable Categories */}
        <div className="flex flex-col gap-3 md:gap-4 my-8 md:my-12">
          {STACK_CATEGORIES.map((category) => (
            <StackCategory key={category.id} {...category} />
          ))}
        </div>
      </main>

      <Footer />
    </GrainOverlay>
  );
}
