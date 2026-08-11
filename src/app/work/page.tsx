import { Metadata } from "next";
import { GrainOverlay } from "@/components/anti-ux/grain-overlay";
import { Navigation } from "@/components/layout/navigation";
import { ViewportType } from "@/components/anti-ux/viewport-type";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { ArchitectureDiagram } from "@/components/sections/architecture-diagram";
import { CaseStudyDetail } from "@/components/sections/case-study-detail";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Work & Case Studies — Prathamesh Lonare | DevOps Projects",
  description:
    "Explore DevOps case studies, AWS serverless architectures, CloudFormation IaC templates, and automated CI/CD deployment pipeline projects.",
  alternates: {
    canonical: "https://prathameshlonare.me/work/",
  },
};

const CASE_STUDIES = [
  {
    id: "online-voting-system",
    title: "Serverless Online Voting Platform",
    subtitle: "AWS Serverless & Automated CI/CD Pipeline",
    year: "2025",
    problem:
      "The college relied on paper-based physical voting for over 500+ students, resulting in manual vote tallying errors, slow result delivery, and vulnerability to tampering.",
    role: "DevOps Engineer & Backend Developer — designed the AWS serverless architecture, Terraform IaC scripts, and GitHub Actions automated deployment pipeline.",
    method: [
      "Wrote 6 AWS Lambda REST microservices using Python.",
      "Configured API Gateway routes with IAM least-privilege policies.",
      "Provisioned DynamoDB On-Demand for automatic peak traffic scaling.",
      "Built GitHub Actions CI/CD pipeline reducing deploys from 8 manual steps to zero.",
    ],
    outcome: [
      "500+ active students served with zero downtime during peak voting hours.",
      "180ms P99 latency recorded across all REST API endpoints.",
      "&lt;0.1% error rate during live operations.",
      "Reduced deployment execution time from 12 minutes to 3 minutes.",
    ],
    tech: ["AWS Lambda", "IAM", "DynamoDB", "Cognito", "CloudWatch", "S3", "GitHub Actions"],
    githubUrl: "https://github.com/prathameshlonare/Online-voting-system",
    showDiagram: true,
    images: [
      { src: "/projects/online voting system/voting app photos/login_page.jpeg", alt: "Login page" },
      { src: "/projects/online voting system/voting app photos/election_control.jpeg", alt: "Election control panel" },
      { src: "/projects/online voting system/voting app photos/vote_form.jpeg", alt: "Vote form" },
      { src: "/projects/online voting system/voting app photos/results.jpeg", alt: "Results dashboard" },
      { src: "/projects/online voting system/architecture diagram/system_architecture.png", alt: "System architecture diagram" },
    ],
  },
  {
    id: "dorm-dish",
    title: "Dorm-Dish Multi-Tier AWS Platform",
    subtitle: "Infrastructure as Code & Serverless Backend",
    year: "2026",
    problem:
      "Traditional EC2 server hosting incurred continuous monthly costs even during idle periods, while lacking automated scaling for high campus demand spikes.",
    role: "Cloud Architect — designed CloudFormation stacks, API Gateway integration, and CloudFront global CDN distribution.",
    method: [
      "Refactored monolithic backend into serverless microservices.",
      "Configured S3 static website hosting fronted by CloudFront edge caching.",
      "Wrote CloudFormation IaC templates for reproducible environment spins.",
    ],
    outcome: [
      "Achieved an 80% cost reduction compared to provisioned EC2 instances.",
      "100% automated infrastructure setup via CloudFormation.",
      "Sub-second global content delivery via CloudFront edge locations.",
    ],
    tech: ["Lambda", "API Gateway", "DynamoDB", "S3", "CloudFront", "CloudFormation", "Python"],
    githubUrl: "https://github.com/prathameshlonare/Dorm-and-Dish",
    images: [],
  },
  {
    id: "statement-dashboard",
    title: "Statement Dashboard PWA",
    subtitle: "Offline-First Bank Analyzer & Financial Health Scoring",
    year: "2026",
    problem:
      "Users hesitated to upload sensitive PDF/CSV bank statements to cloud servers due to privacy concerns and third-party data collection risks.",
    role: "Full-Stack Architect — engineered client-side PDF parsing using pdf.js, local WebStorage persistence, and offline PWA service workers.",
    method: [
      "Integrated React 19 + TypeScript + Vite for client-side execution.",
      "Built offline PDF/CSV parsing pipeline with zero server transmission.",
      "Implemented recurring payment pattern detection algorithms in browser.",
    ],
    outcome: [
      "100% offline security — zero byte data leaves the client device.",
      "Sub-500ms statement parsing speed for 50+ page PDFs.",
      "Complete financial health scoring engine running in local Web Worker.",
    ],
    tech: ["React 19", "TypeScript", "Vite", "Tailwind", "shadcn/ui", "Recharts", "pdf.js"],
    githubUrl: "https://github.com/prathameshlonare/statement-dashboard",
    images: [],
  },
  {
    id: "ai-resume-job-matcher",
    title: "AI Resume-Job Matcher",
    subtitle: "Machine Learning Predictor & Semantic Keyword Extraction",
    year: "2026",
    problem:
      "Job applicants faced high rejection rates due to keyword mismatches and unoptimized resume formatting against Automated Tracking Systems (ATS).",
    role: "ML & Systems Engineer — trained semantic embeddings model on 1,200+ tech job descriptions and deployed Streamlit app.",
    method: [
      "Extracted TF-IDF and sentence-transformer semantic vector embeddings.",
      "Trained Logistic Regression classifier achieving high AUC-ROC metric.",
      "Built Streamlit interactive UI with instant keyword gap analysis.",
    ],
    outcome: [
      "90% classification accuracy on test dataset of tech job postings.",
      "95% AUC-ROC score for candidate-job relevance matching.",
      "Instant actionable ATS keyword suggestions for applicants.",
    ],
    tech: ["Python", "Streamlit", "sentence-transformers", "scikit-learn", "pandas"],
    githubUrl: "https://github.com/prathameshlonare/ai-resume-job-matcher",
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
            DEVOPS WORK <span className="text-[#FF6B35]">&amp;</span> CASE STUDIES
          </ViewportType>
          <p className="text-base md:text-lg text-zinc-700 font-medium max-w-2xl mt-3 md:mt-4 leading-relaxed">
            Detailed technical breakdowns of cloud infrastructure, serverless architectures, CI/CD automation pipelines, and software systems.
          </p>
        </div>

        {/* Live Architecture Diagram */}
        <ArchitectureDiagram />

        {/* Case Studies List */}
        <div className="flex flex-col gap-8 md:gap-12 mt-8 md:mt-12">
          {CASE_STUDIES.map((study) => (
            <CaseStudyDetail key={study.id} {...study} />
          ))}
        </div>
      </main>

      <Footer />
    </GrainOverlay>
  );
}
