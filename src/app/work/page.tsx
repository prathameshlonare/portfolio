import { Metadata } from "next";
import { GrainOverlay } from "@/components/anti-ux/grain-overlay";
import { Navigation } from "@/components/layout/navigation";
import { ViewportType } from "@/components/anti-ux/viewport-type";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { ArchitectureDiagram } from "@/components/sections/architecture-diagram";
import { CaseStudyDetail } from "@/components/sections/case-study-detail";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Work & Case Studies: Prathamesh Lonare | DevOps Projects",
  description:
    "Explore DevOps case studies, AWS serverless architectures, CloudFormation IaC templates, and automated CI/CD deployment pipeline projects.",
  alternates: {
    canonical: "https://prathameshlonare.me/work/",
  },
};

const CLOUD_CASE_STUDIES = [
  {
    id: "duokart",
    title: "DuoKart Multi-Tier Cloud Infrastructure",
    subtitle: "High Availability, Auto Scaling & Asynchronous Order Decoupling",
    year: "2026",
    problem:
      "Monolithic e-commerce apps risk downtime during traffic surges, database connection exhaustion, and lost order transactions during unexpected compute instance failures.",
    role: "Cloud Infrastructure Engineer (Team of 2): engineered 6-tier modular CloudFormation infrastructure, private Auto Scaling Group, Multi-AZ RDS MySQL, SQS/DLQ asynchronous pipelines, and fault-injection drills.",
    method: [
      "Architected custom VPC across 2 AZs with layered security groups: public subnets (ALB, Bastion, NAT) and private subnets (app instances and RDS).",
      "Configured internet-facing ALB forwarding traffic to a private Auto Scaling Group (2-4 EC2s) running Flask/gunicorn managed by systemd.",
      "Provisioned Multi-AZ RDS MySQL 8.0 in isolated database subnets with SSM Parameter Store dynamic secret injection at instance boot.",
      "Decoupled order processing using SQS Standard with Dead-Letter Queue (3-retry threshold) triggering Python 3.12 Lambda workers for DynamoDB conditional writes (RECEIVED -> PACKING).",
      "Implemented split SNS notifications delivering distinct order alerts to store owners and shipping updates to customers.",
      "Configured 8 CloudWatch alarms (ALB 5xx, unhealthy hosts, RDS CPU, SQS depth), a centralized operational dashboard, and a $20 budget cap.",
    ],
    outcome: [
      "100% continuous 200 OK responses during kill-1-EC2 fault injection drills (ASG auto-healed in 3.5 minutes while ALB drained connections).",
      "Zero lost orders with automatic poison message redrive to DLQ after 3 failures.",
      "Private compute security with zero public IPs on app servers and database instances.",
      "Strict cost discipline sustained under $25 total spend with automated nightly teardown routines.",
    ],
    tech: ["AWS VPC", "CloudFormation", "ALB", "EC2 Auto Scaling", "RDS MySQL", "SQS", "Lambda", "DynamoDB", "SNS", "CloudWatch", "Python"],
    githubUrl: "https://github.com/prathameshlonare/duokart",
    liveUrl: "https://prathameshlonare.github.io/duokart/",
    images: [
      { src: "/projects/duokart/architecture.png", alt: "DuoKart 6-tier AWS system architecture diagram" },
      { src: "/projects/duokart/self-heal.png", alt: "Kill-1-EC2 fault injection self-healing verification" },
      { src: "/projects/duokart/dashboard.png", alt: "CloudWatch operational monitoring dashboard" },
      { src: "/projects/duokart/banner.jpg", alt: "DuoKart project overview banner" },
    ],
  },
  {
    id: "online-voting-system",
    title: "Serverless Online Voting Platform",
    subtitle: "Event-Driven Serverless Backend & Automated CI/CD",
    year: "2025",
    problem:
      "Paper-based college elections for 500+ students caused manual tallying errors, slow result delivery, and vulnerability to ballot tampering.",
    role: "DevOps & Backend Engineer: designed the AWS serverless architecture with Amplify SDK integration, scoped IAM policies, and GitHub Actions automated deployment pipeline.",
    method: [
      "Built React frontend integrated with AWS Amplify SDK for seamless Cognito auth, API Gateway, and S3 access.",
      "Implemented Cognito multi-role auth: Student, Admin, and Owner users with granular role-based access.",
      "Developed 6 Python Lambda REST microservices behind API Gateway with scoped IAM execution policies on specific DynamoDB table ARNs.",
      "Provisioned DynamoDB On-Demand capacity for votes, candidates, and config storage to handle peak concurrent voting bursts without throttling.",
      "Configured S3 for ballot audit CSV storage and data export workflows with presigned URL access.",
      "Built GitHub Actions CI/CD pipeline reducing deploys from 8 manual steps to zero.",
    ],
    outcome: [
      "500+ active students served with zero downtime during peak voting windows.",
      "180ms P99 latency recorded across all REST API endpoints.",
      "<0.1% error rate during live operations.",
      "Reduced deployment execution time from 12 minutes to 3 minutes via dependency caching.",
    ],
    tech: ["React", "AWS Amplify", "Lambda", "API Gateway", "DynamoDB", "Cognito", "S3", "IAM", "GitHub Actions"],
    githubUrl: "https://github.com/prathameshlonare/Online-voting-system",
    liveUrl: "/voting/",
    showDiagram: true,
    images: [
      { src: "/projects/online-voting-system/architecture-diagram/front_&_Integration_flow.png", alt: "System architecture and integration flow diagram" },
      { src: "/projects/online-voting-system/voting-app-photos/login_page.jpeg", alt: "Login page" },
      { src: "/projects/online-voting-system/voting-app-photos/election_control.jpeg", alt: "Election control panel" },
      { src: "/projects/online-voting-system/voting-app-photos/vote_form.jpeg", alt: "Vote form" },
      { src: "/projects/online-voting-system/voting-app-photos/results.jpeg", alt: "Results dashboard" },
    ],
  },
  {
    id: "dorm-dish",
    title: "Dorm-Dish Multi-Tier AWS Platform",
    subtitle: "Infrastructure as Code & Serverless Migration",
    year: "2026",
    problem:
      "Traditional EC2 server hosting incurred continuous monthly costs ($15+/mo) during idle academic breaks while lacking auto-scaling for campus demand spikes.",
    role: "Cloud & Backend Engineer: designed CloudFormation stacks, API Gateway integration, Lambda microservices, and CloudFront global CDN distribution.",
    method: [
      "Refactored monolithic backend into serverless microservices with AWS Lambda + API Gateway.",
      "Designed DynamoDB multi-table schema (UserProfile, Room, Mess, Bookings, Reviews) with composite primary keys.",
      "Integrated Cognito User Pools for multi-role auth across Students, Property Owners, and Admins.",
      "Added Google Maps API for geolocation and an automated recommendation engine for verified listings.",
      "Configured S3 for cover and document photo storage with presigned URL access.",
      "Wrote modular CloudFormation IaC templates for reproducible environment provisioning and teardown.",
    ],
    outcome: [
      "Monthly AWS cost dropped from $15+/mo to $0.00/mo within free tier during idle periods.",
      "100% automated infrastructure setup and teardown via CloudFormation CLI.",
      "Sub-second global content delivery via CloudFront edge locations.",
      "Cold start latency minimized under 350ms with lightweight Python runtime packaging.",
    ],
    tech: ["Lambda", "API Gateway", "DynamoDB", "S3", "CloudFront", "CloudFormation", "Cognito", "Google Maps API", "Python"],
    githubUrl: "https://github.com/prathameshlonare/Dorm-and-Dish",
    liveUrl: "/dorm-dish/",
    images: [
      { src: "/projects/dorm-and-dish/architecture-diagram/architecture%20diagram.png", alt: "Dorm-Dish system architecture diagram" },
    ],
  },
  {
    id: "sysadmin-toolkit",
    title: "Linux SysAdmin Automation Toolkit",
    subtitle: "Daemon Supervision, Network Diagnostics & POSIX Security Audit",
    year: "2026",
    problem:
      "Linux server administrators spend hours weekly diagnosing crashed background services, investigating network socket drops, hunting runaway processes, and auditing insecure file permissions.",
    role: "Linux Systems Developer: authored modular POSIX-compliant Bash automation scripts with ShellCheck CI linting, self-documenting CLI flags, and webhook alerting.",
    method: [
      "Developed monitor-service.sh with systemd status inspection, automatic daemon restart upon failure, and Slack webhook alert dispatching.",
      "Built network-check.sh for rapid diagnostic scans of DNS resolution latency, listening TCP/UDP sockets, and firewall packet drops.",
      "Created setup-permissions.sh to audit filesystem trees, identifying unauthorized SUID/SGID binaries and world-writable files.",
      "Engineered process-manager.sh to monitor top memory and CPU consumers with graduated termination signals (SIGTERM escalating to SIGKILL).",
      "Enforced production safety standards with --dry-run execution previews, standardized POSIX exit codes, and ShellCheck AST linting in GitHub Actions.",
    ],
    outcome: [
      "Sub-30-second root cause diagnosis for crashed systemd units and broken network sockets.",
      "Zero false-positive script executions via strict error handling (set -euo pipefail) and dry-run validation.",
      "Automated security auditing of system filesystems, flagging risky permission bits in under 2 minutes.",
      "100% clean ShellCheck compliance enforced continuously via GitHub Actions CI pipeline.",
    ],
    tech: ["Bash", "Linux (Ubuntu/Debian)", "systemd", "POSIX Shell", "Networking", "ShellCheck", "GitHub Actions"],
    githubUrl: "https://github.com/prathameshlonare/sysadmin-toolkit",
    images: [],
  },
];

const LAB_CASE_STUDIES = [
  {
    id: "100-days-of-devops",
    title: "100 Days of DevOps Practice Lab",
    subtitle: "Hands-on Curriculum: Linux, Git, Docker, CI/CD, Terraform & Kubernetes",
    year: "2026",
    problem:
      "Junior candidates frequently rely on high-level web console tutorials, leaving major gaps in Linux kernel primitives, container runtime isolation, stateful IaC workflows, and cluster failure modes.",
    role: "DevOps Engineer & Author: architected and executed a structured 6-phase engineering curriculum with reproducible configuration files, automated CI test harnesses, and infrastructure blueprints.",
    method: [
      "Phase 01 (Linux Systems): authored modular Bash scripts for systemd daemon supervision, POSIX permission audits, process signals (SIGTERM/SIGKILL), and socket diagnostics.",
      "Phase 02 (Git Automation): established trunk-based development workflows, rebase conventions, commit linting hooks, and branch protection policies.",
      "Phase 03 (Container Runtimes): engineered multi-stage Docker builds, non-root user execution, cgroups/namespaces isolation, and Docker Compose network segmentation.",
      "Phase 04 (CI/CD Pipelines): built GitHub Actions workflows for automated ShellCheck linting, test execution, container image security scanning, and deployment gates.",
      "Phase 05 (AWS & Terraform): developed modular HCL configurations for custom VPCs, S3 remote state storage with DynamoDB state locking, and least-privilege IAM policies.",
      "Phase 06 (Kubernetes Clusters): deployed Pods, ReplicaSets, ClusterIP/NodePort Services, Ingress controllers, ConfigMaps, and probed rolling update strategies.",
    ],
    outcome: [
      "6 structured curriculum phases covering operating systems fundamentals through production cluster orchestration.",
      "Over 50+ self-contained, reproducible lab configurations and shell automation scripts.",
      "100% reproducible environments using pure code configurations without manual AWS console intervention.",
      "Continuous verifiable proof of hands-on daily systems discipline and automation practice.",
    ],
    tech: ["Linux", "Bash", "Git", "Docker", "GitHub Actions", "Terraform (HCL)", "AWS", "Kubernetes"],
    githubUrl: "https://github.com/prathameshlonare/100-days-of-devops",
    images: [],
  },
];

const UTILITY_PROJECTS = [
  {
    id: "statement-dashboard",
    title: "Statement Dashboard PWA",
    subtitle: "Offline-First Bank Analyzer & Financial Health Scoring",
    year: "2026",
    problem:
      "Users hesitated to upload sensitive PDF/CSV bank statements to cloud servers due to privacy concerns and third-party data collection risks.",
    role: "Full-Stack Engineer: engineered client-side PDF parsing using pdf.js, local WebStorage persistence, and offline PWA service workers.",
    method: [
      "Integrated React 19 + TypeScript + Vite for client-side local execution.",
      "Built offline PDF/CSV parsing pipeline with zero server transmission.",
      "Implemented recurring payment pattern detection algorithms running entirely in-browser.",
    ],
    outcome: [
      "100% offline security: zero bytes of user data leave the client device.",
      "Sub-500ms statement parsing speed for 50+ page PDFs.",
      "Complete financial health scoring engine running in local Web Workers.",
    ],
    tech: ["React 19", "TypeScript", "Vite", "Tailwind", "shadcn/ui", "Recharts", "pdf.js"],
    githubUrl: "https://github.com/prathameshlonare/statement-dashboard",
    images: [],
  },
  {
    id: "ats-resume-architect",
    title: "ATS Resume Architect",
    subtitle: "Deterministic 8-Gate Technical Resume Linter & Keyword Engine",
    year: "2026",
    problem:
      "Job seekers rely on generic AI rewrite tools that hallucinate unearned claims, inject corporate buzzwords, and fail standard Applicant Tracking System (ATS) parsing rules.",
    role: "Systems Tooling Developer: built a deterministic CLI and agent skill with 8 structural audit gates, zero-buzzword enforcement dictionaries, and metric extraction rules.",
    method: [
      "Engineered deterministic 8-gate linting engine validating action-verb starters, quantified metrics, technology pairings, and length bounds.",
      "Implemented strict anti-buzzword filter blocking 50+ banned corporate filler terms and generic throat-clearing openers.",
      "Built 4-axis semantic audit analyzing role alignment, engineering depth, measurable impact, and ATS readability.",
      "Added codebase metric mining logic to automatically convert raw git diffs and commit histories into quantified achievement bullets.",
    ],
    outcome: [
      "100% deterministic rule evaluations with zero AI hallucinations or fabricated claims.",
      "Identifies and eliminates 100% of recognized corporate filler terms before candidate submission.",
      "Zero external API dependencies: sub-second local python CLI execution.",
    ],
    tech: ["Python", "AST Parsing", "CLI Architecture", "Regex Engine", "Open-Source Skill"],
    githubUrl: "https://github.com/prathameshlonare/ats-resume-architect",
    images: [],
  },
];

export default function WorkPage() {
  return (
    <GrainOverlay className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#1A1A2E] overflow-x-hidden">
      <Navigation />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 w-full">
        {/* Page Banner */}
        <div className="border-b-3 border-[#1A1A2E] pb-6 md:pb-8 mb-8 md:mb-12">
          <MonoLabel className="text-[#FF6B35] font-bold">CASE STUDIES & SYSTEMS ARCHITECTURE</MonoLabel>
          <ViewportType as="h1" className="text-[var(--text-page)] font-black mt-2">
            DEVOPS WORK <span className="text-[#FF6B35]">&</span> CASE STUDIES
          </ViewportType>
          <p className="text-base md:text-lg text-zinc-700 font-medium max-w-2xl mt-3 md:mt-4 leading-relaxed">
            Detailed technical breakdowns of cloud infrastructure, serverless architectures, CI/CD automation pipelines, and software systems.
          </p>
        </div>

        {/* Live Architecture Diagram */}
        <ArchitectureDiagram />

        {/* Primary Cloud Case Studies List */}
        <div className="flex flex-col gap-8 md:gap-12 mt-8 md:mt-12">
          {CLOUD_CASE_STUDIES.map((study) => (
            <CaseStudyDetail key={study.id} {...study} />
          ))}
        </div>

        {/* Engineering Practice Lab Section */}
        <div className="mt-14 md:mt-20 pt-8 md:pt-12 border-t-3 border-[#1A1A2E]">
          <div className="mb-6 md:mb-8">
            <MonoLabel className="text-[#FF6B35]">CONTINUOUS SYSTEMS DISCIPLINE</MonoLabel>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-[#1A1A2E] tracking-tight mt-1">
              ENGINEERING PRACTICE LAB
            </h2>
            <p className="text-sm md:text-base text-zinc-600 mt-2 max-w-2xl font-medium">
              Hands-on curriculum repository documenting deliberate practice across Linux internals, containerization, Infrastructure as Code, and cluster orchestration.
            </p>
          </div>

          <div className="flex flex-col gap-8 md:gap-12">
            {LAB_CASE_STUDIES.map((study) => (
              <CaseStudyDetail key={study.id} {...study} />
            ))}
          </div>
        </div>

        {/* Secondary Utilities Section */}
        <div className="mt-14 md:mt-20 pt-8 md:pt-12 border-t-3 border-[#1A1A2E]">
          <div className="mb-6 md:mb-8">
            <MonoLabel className="text-[#7C3AED]">CLIENT RUNTIMES & PACKAGED UTILITIES</MonoLabel>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-[#1A1A2E] tracking-tight mt-1">
              SOFTWARE & DATA TOOLS
            </h2>
            <p className="text-sm md:text-base text-zinc-600 mt-2 max-w-2xl font-medium">
              Focused offline-first applications, data extraction models, and local developer utilities.
            </p>
          </div>

          <div className="flex flex-col gap-8 md:gap-12">
            {UTILITY_PROJECTS.map((study) => (
              <CaseStudyDetail key={study.id} {...study} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </GrainOverlay>
  );
}
