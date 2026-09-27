export interface ProjectItem {
  name: string;
  year: string;
  description: string;
  tech: string[];
  github: string | null;
  live: string | null;
  image?: string | null;
}

export const projects: ProjectItem[] = [
  {
    name: "DuoKart",
    year: "2026",
    description:
      "Resilient multi-tier e-commerce cloud infrastructure across 2 AZs on AWS us-east-2. Internet-facing ALB routing to private Auto Scaling EC2 instances, Multi-AZ RDS MySQL, and SQS/DLQ decoupled event-driven Lambda order workers.",
    tech: ["CloudFormation", "VPC", "ALB", "Auto Scaling", "RDS MySQL", "SQS", "Lambda", "DynamoDB", "CloudWatch", "Python"],
    github: "https://github.com/prathameshlonare/duokart",
    live: "https://prathameshlonare.github.io/duokart/",
    image: "/projects/duokart/architecture.png",
  },
  {
    name: "Dorm-Dish",
    year: "2026",
    description:
      "Serverless student accommodation platform on AWS: Cognito auth, Lambda + API Gateway backend, DynamoDB multi-table design, S3 media storage, Google Maps integration, and a recommendation engine. 80% cost reduction vs EC2.",
    tech: ["Lambda", "API Gateway", "DynamoDB", "S3", "CloudFront", "CloudFormation", "Cognito", "Python"],
    github: "https://github.com/prathameshlonare/Dorm-and-Dish",
    live: "/dorm-dish/",
    image: "/projects/dorm-and-dish/architecture-diagram/architecture%20diagram.png",
  },
  {
    name: "Online Voting System",
    year: "2025",
    description:
      "React + Amplify SDK frontend with Cognito multi-role auth (Student/Admin/Owner). Lambda + API Gateway backend, DynamoDB On-Demand for peak traffic, S3 CSV export. CI/CD from 8 manual deploys to zero.",
    tech: ["React", "AWS Amplify", "Lambda", "DynamoDB", "Cognito", "S3", "GitHub Actions"],
    github: "https://github.com/prathameshlonare/Online-voting-system",
    live: "/voting/",
    image: "/projects/online-voting-system/architecture-diagram/front_&_Integration_flow.png",
  },
  {
    name: "Statement Dashboard",
    year: "2026",
    description:
      "100% offline-first PWA bank statement analyzer. PDF/CSV import, OCR fallback, recurring payment detection, financial health scoring. Zero data leaves the device.",
    tech: ["React 19", "TypeScript", "Vite", "Tailwind", "shadcn/ui", "Recharts", "pdf.js"],
    github: "https://github.com/prathameshlonare/statement-dashboard",
    live: null,
    image: null,
  },
  {
    name: "AI Resume-Job Matcher",
    year: "2026",
    description:
      "ML predictor trained on 1,200+ job postings. Semantic embeddings + logistic regression: 90% accuracy, 95% AUC-ROC. Streamlit app with keyword extraction.",
    tech: ["Python", "Streamlit", "sentence-transformers", "scikit-learn", "pandas"],
    github: "https://github.com/prathameshlonare/ai-resume-job-matcher",
    live: null,
    image: null,
  },
];
