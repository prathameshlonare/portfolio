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
    name: "Dorm-Dish",
    year: "2026",
    description:
      "Serverless multi-tier platform on AWS — 6 REST endpoints, 3 CloudFormation stacks, 80% cost reduction vs EC2. Lambda + API Gateway + DynamoDB + CloudFront.",
    tech: ["Lambda", "API Gateway", "DynamoDB", "S3", "CloudFront", "CloudFormation", "Python"],
    github: "https://github.com/prathameshlonare/Dorm-and-Dish",
    live: null,
    image: null,
  },
  {
    name: "Online Voting System",
    year: "2025",
    description:
      "CI/CD pipeline reduced manual deploys from 8 to 0. DynamoDB On-Demand handles peak traffic automatically. Cognito + IAM least-privilege across all Lambda roles.",
    tech: ["Lambda", "IAM", "DynamoDB", "Cognito", "CloudWatch", "S3", "GitHub Actions"],
    github: "https://github.com/prathameshlonare/Online-voting-system",
    live: null,
    image: "/projects/online voting system/architecture diagram/system_architecture.png",
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
      "ML predictor trained on 1,200+ job postings. Semantic embeddings + logistic regression — 90% accuracy, 95% AUC-ROC. Streamlit app with keyword extraction.",
    tech: ["Python", "Streamlit", "sentence-transformers", "scikit-learn", "pandas"],
    github: "https://github.com/prathameshlonare/ai-resume-job-matcher",
    live: null,
    image: null,
  },
];
