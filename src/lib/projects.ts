export interface ProjectItem {
  name: string;
  year: string;
  category: "cloud" | "lab" | "utility";
  description: string;
  tech: string[];
  github: string | null;
  live: string | null;
  image?: string | null;
  outcome?: string | null;
  role?: string | null;
  evidence?: string | null;
  failureLearned?: string | null;
  impact?: "HIGH" | "MEDIUM" | null;
}

export const cloudProjects: ProjectItem[] = [
  {
    name: "DuoKart",
    year: "2026",
    category: "cloud",
    description:
      "Multi-tier e-commerce cloud infrastructure across 2 AZs on AWS us-east-2. Internet-facing ALB routing to private Auto Scaling EC2 instances, Multi-AZ RDS MySQL, and SQS/DLQ decoupled event-driven Lambda order workers.",
    tech: ["CloudFormation", "VPC", "ALB", "Auto Scaling", "RDS MySQL", "SQS", "Lambda", "DynamoDB", "CloudWatch", "Python"],
    github: "https://github.com/prathameshlonare/duokart",
    live: "https://prathameshlonare.github.io/duokart/",
    image: "/projects/duokart/architecture.png",
    outcome: "Survived a kill-1-EC2 drill with zero dropped responses",
    role: "Cloud Infra Engineer, team of 2",
    evidence: "ASG auto-healed in 3.5 min, DLQ redrive after 3 failures",
    failureLearned:
      "Monoliths drop orders when compute dies mid-request; fixed with SQS decoupling plus DLQ redrive",
    impact: "HIGH",
  },
  {
    name: "Dorm-Dish",
    year: "2026",
    category: "cloud",
    description:
      "Serverless student accommodation platform on AWS: Cognito auth, Lambda + API Gateway backend, DynamoDB multi-table design, S3 media storage, and CloudFront global CDN distribution. Scaled down to $0/mo idle cost.",
    tech: ["Lambda", "API Gateway", "DynamoDB", "S3", "CloudFront", "CloudFormation", "Cognito", "Python"],
    github: "https://github.com/prathameshlonare/Dorm-and-Dish",
    live: "/dorm-dish/",
    image: "/projects/dorm-and-dish/architecture-diagram/architecture%20diagram.png",
    outcome: "$15+/mo idle cut to $0.00/mo",
    role: "Cloud and Backend Engineer",
    evidence: "CFN teardown, CloudFront edge, 350ms cold starts",
    failureLearned:
      "Idle EC2 billed through academic breaks; fixed by going serverless",
    impact: "HIGH",
  },
  {
    name: "Online Voting System",
    year: "2025",
    category: "cloud",
    description:
      "React + Amplify frontend with Cognito multi-role auth. 6 Python Lambda REST microservices, DynamoDB On-Demand for burst vote writes, S3 audit export, and GitHub Actions CI/CD cutting deploy time to 3 minutes.",
    tech: ["React", "AWS Amplify", "Lambda", "DynamoDB", "Cognito", "S3", "GitHub Actions"],
    github: "https://github.com/prathameshlonare/Online-voting-system",
    live: "/voting/",
    image: "/projects/online-voting-system/architecture-diagram/front_&_Integration_flow.png",
    outcome: "500+ students voted with zero downtime",
    role: "DevOps and Backend Engineer",
    evidence: "12m to 3m deploys, 180ms P99 latency",
    failureLearned:
      "Paper tallying caused errors and slow results; fixed with DynamoDB burst writes plus S3 audit export",
    impact: "HIGH",
  },
  {
    name: "SysAdmin Toolkit",
    year: "2026",
    category: "cloud",
    description:
      "Modular Linux system administration and automation toolkit in Bash. Features systemd service supervision with auto-restart, sub-30s network diagnostics, POSIX file permission auditing, and ShellCheck CI linting.",
    tech: ["Bash", "Linux", "systemd", "POSIX Shell", "Networking", "ShellCheck", "GitHub Actions"],
    github: "https://github.com/prathameshlonare/sysadmin-toolkit",
    live: null,
    image: null,
    outcome: "Crashed units diagnosed in under 30 seconds",
    role: "Sole builder, Bash",
    evidence: "systemd supervision, ShellCheck CI, dry-run validation",
    failureLearned:
      "Hand-checking units and sockets wasted on-call time; fixed with strict scripts",
    impact: "MEDIUM",
  },
];

export const labProjects: ProjectItem[] = [
  {
    name: "100 Days of DevOps",
    year: "2026",
    category: "lab",
    description:
      "Structured 6-phase engineering curriculum and practice lab: Linux internals, Git automation, Docker container isolation, GitHub Actions CI/CD, modular Terraform on AWS, and Kubernetes cluster orchestration.",
    tech: ["Linux", "Bash", "Docker", "GitHub Actions", "Terraform", "AWS", "Kubernetes"],
    github: "https://github.com/prathameshlonare/100-days-of-devops",
    live: null,
    image: null,
  },
];

export const utilityProjects: ProjectItem[] = [
  {
    name: "Statement Dashboard",
    year: "2026",
    category: "utility",
    description:
      "Offline-first PWA bank statement analyzer. Client-side PDF/CSV parsing with pdf.js, local Web Worker pattern detection, and financial health scoring. Zero data leaves the client device.",
    tech: ["React 19", "TypeScript", "Vite", "Tailwind", "shadcn/ui", "Recharts", "pdf.js"],
    github: "https://github.com/prathameshlonare/statement-dashboard",
    live: null,
    image: null,
  },
  {
    name: "ATS Resume Architect",
    year: "2026",
    category: "utility",
    description:
      "Deterministic 8-gate technical resume linter and audit engine in Python. Scans for metric density, enforces zero corporate buzzwords, and extracts quantified bullet points with zero AI hallucinations.",
    tech: ["Python", "AST Parsing", "CLI Architecture", "Regex Engine", "Open-Source Skill"],
    github: "https://github.com/prathameshlonare/ats-resume-architect",
    live: null,
    image: null,
  },
];

// Default export for Featured Work (pure cloud & systems showcase)
export const projects: ProjectItem[] = cloudProjects;
