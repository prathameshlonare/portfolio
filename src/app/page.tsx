"use client";

import { Avatar } from "@/components/Avatar";
import { TypingText } from "@/components/TypingText";
import { ProjectCard } from "@/components/ProjectCard";
import { ArchDiagram } from "@/components/ArchDiagram";
import { ScrollSpy } from "@/components/ScrollSpy";
import { TerminalSection } from "@/components/TerminalSection";
import { HeroContent } from "@/components/HeroContent";
import { StaggerGrid } from "@/components/StaggerGrid";
import { MagneticWrap } from "@/components/MagneticWrap";
import { SectionReveal } from "@/components/SectionReveal";
import { TerminalCursor } from "@/components/TerminalCursor";
import { useParallax } from "@/hooks/useParallax";
import { useToast } from "@/components/Toast";

const skills = [
  "AWS",
  "Lambda",
  "DynamoDB",
  "API Gateway",
  "CloudFormation",
  "Terraform",
  "Python",
  "Boto3",
  "GitHub Actions",
  "Git",
  "Linux",
  "Bash",
  "IAM",
  "CloudWatch",
  "S3",
  "CloudFront",
  "Cognito",
  "VPC",
];

export default function Home() {
  const heroRef = useParallax<HTMLDivElement>({ strength: 8 });
  const { toast, ToastContainer } = useToast();

  return (
    <>
      <TerminalCursor />
      <ScrollSpy />
      <main className="max-w-6xl mx-auto px-4 md:px-8 lg:px-10 pt-16 md:pt-24 pb-16 md:pb-24">
        {/* Hero */}
        <section id="intro" ref={heroRef} className="mb-20 md:mb-24 flex flex-col items-center scroll-mt-16 md:scroll-mt-24">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-6 md:mb-10 mx-auto">
            <div className="relative">
              <Avatar />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[var(--accent-green)] border-2 border-[var(--bg-primary)] rounded-full glow-green"></div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-[var(--text-dim)] text-xs md:text-sm mb-3 font-mono prompt-ripple rounded-lg px-2 py-1 inline-block">
                prathamesh@portfolio:~$
              </div>
              <h1 className="text-2xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text-primary)] terminal-heading">
                <TypingText text="Prathamesh Lonare" />
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="hire-dot"></div>
                <span className="text-xs text-[var(--accent-green)] font-mono">Available for hire</span>
              </div>
            </div>
          </div>

          <HeroContent>
            <div className="mb-6">
              <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-medium">
                Cloud &amp; DevOps Engineer
              </p>
              <p className="text-sm text-[var(--text-dim)] mt-2 font-mono">
                I build and automate cloud infrastructure
              </p>
            </div>

            <p className="text-base md:text-lg text-[var(--text-dim)] mb-10 font-mono">
              B.Tech CSE · AWS · Serverless · Infrastructure as Code
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-center justify-center w-full">
              <MagneticWrap strength={4}>
                <a
                  href="https://github.com/prathameshlonare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive group cta-cursor min-h-[44px] flex items-center px-4 sm:px-6 py-3 text-xs sm:text-sm border border-[var(--border)] rounded-lg text-[var(--text-muted)] hover:text-[var(--accent-green)] hover:border-[var(--accent-green)] hover:bg-[color-mix(in_srgb,var(--accent-green)_8%,transparent)] font-mono text-center"
                >
                  <span className="mr-1 sm:mr-2 text-[var(--accent-green)] group-hover:text-[var(--accent-green)]">{"{"}</span>
                  <span className="group-hover:text-[var(--accent-green)]">GitHub</span>
                  <span className="ml-1 sm:ml-2 text-[var(--accent-green)]">{"}"}</span>
                </a>
              </MagneticWrap>
              <MagneticWrap strength={4}>
                <a
                  href="https://www.linkedin.com/in/prathamesh-lonare-a0759b275/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive group cta-cursor min-h-[44px] flex items-center px-4 sm:px-6 py-3 text-xs sm:text-sm border border-[var(--border)] rounded-lg text-[var(--text-muted)] hover:text-[var(--accent-blue)] hover:border-[var(--accent-blue)] hover:bg-[color-mix(in_srgb,var(--accent-blue)_8%,transparent)] font-mono text-center"
                >
                  <span className="mr-1 sm:mr-2 text-[var(--accent-blue)] group-hover:text-[var(--accent-blue)]">{"{"}</span>
                  <span className="group-hover:text-[var(--accent-blue)]">LinkedIn</span>
                  <span className="ml-1 sm:ml-2 text-[var(--accent-blue)]">{"}"}</span>
                </a>
              </MagneticWrap>
              <MagneticWrap strength={4}>
                <a
                  href="mailto:prathameshlonare9@gmail.com"
                  className="interactive group cta-cursor min-h-[44px] flex items-center px-4 sm:px-6 py-3 text-xs sm:text-sm border border-[var(--border)] rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] hover:bg-[color-mix(in_srgb,var(--text-primary)_8%,transparent)] font-mono text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText("prathameshlonare9@gmail.com").then(() => {
                      toast("Email copied to clipboard");
                    });
                  }}
                >
                  <span className="mr-1 sm:mr-2 text-[var(--text-primary)] group-hover:text-[var(--text-primary)]">{"{"}</span>
                  <span className="group-hover:text-[var(--text-primary)]">Email</span>
                  <span className="ml-1 sm:ml-2 text-[var(--text-primary)]">{"}"}</span>
                </a>
              </MagneticWrap>
              <MagneticWrap strength={4}>
                <a
                  href="/prathamesh_resume.pdf"
                  download
                  className="interactive group cta-cursor min-h-[44px] flex items-center px-4 sm:px-6 py-3 text-xs sm:text-sm border border-[var(--border)] rounded-lg text-[var(--text-muted)] hover:text-[var(--accent-green)] hover:border-[var(--accent-green)] hover:bg-[color-mix(in_srgb,var(--accent-green)_8%,transparent)] font-mono text-center"
                >
                  <span className="mr-1 sm:mr-2 text-[var(--accent-green)] group-hover:text-[var(--accent-green)]">{"{"}</span>
                  <span className="group-hover:text-[var(--accent-green)]">Resume</span>
                  <span className="ml-1 sm:ml-2 text-[var(--accent-green)]">{"}"}</span>
                </a>
              </MagneticWrap>
            </div>
          </HeroContent>
        </section>

        {/* whoami */}
        <SectionReveal>
        <section id="whoami" className="scroll-mt-16 md:scroll-mt-24 max-w-[75ch] mx-auto terminal-mono mb-10">
          <TerminalSection command="whoami">
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm md:text-base items-baseline">
              <span className="text-[var(--accent-green)] font-medium whitespace-nowrap">login:</span>
              <span className="text-[var(--text-primary)] font-mono break-words">Prathamesh Lonare</span>

              <span className="text-[var(--accent-green)] font-medium whitespace-nowrap">role:</span>
              <span className="text-[var(--text-secondary)] break-words">Cloud & DevOps Engineer</span>

              <span className="text-[var(--accent-green)] font-medium whitespace-nowrap">vibe:</span>
              <span className="text-[var(--text-secondary)] break-words">Terminal enthusiast, AWS nerd, automation addict</span>

              <span className="text-[var(--accent-green)] font-medium whitespace-nowrap">status:</span>
              <span className="text-[var(--text-secondary)] break-words">Building serverless stuff on AWS</span>

              <span className="text-[var(--accent-green)] font-medium whitespace-nowrap">motto:</span>
              <span className="text-[var(--text-secondary)] italic break-words">
                &ldquo;If it hurts, automate it.&rdquo;
              </span>

              <span className="text-[var(--accent-green)] font-medium whitespace-nowrap">chai:</span>
              <span className="text-[var(--text-secondary)]">Yes, always.</span>
            </div>
          </TerminalSection>
        </section>
        </SectionReveal>

        {/* About */}
        <SectionReveal>
        <section id="about" className="scroll-mt-16 md:scroll-mt-24 max-w-[75ch] mx-auto terminal-mono mb-10">
          <TerminalSection command="cat about.txt">
            <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed max-w-[65ch] lg:text-justify terminal-body break-words">
              Final-year B.Tech CSE student specialising in AWS cloud
              infrastructure, with hands-on experience designing and deploying two
              end-to-end serverless apps using Lambda, API Gateway, DynamoDB,
              CloudFront, and CloudFormation. Seeking an entry-level Cloud / DevOps
              Engineer role where I can apply AWS-native development and IaC skills
              in a production environment.
            </p>
          </TerminalSection>
        </section>
        </SectionReveal>

        {/* Projects */}
        <SectionReveal>
        <section id="projects" className="scroll-mt-16 md:scroll-mt-24 mb-10">
          <TerminalSection command="ls projects">
            <div className="space-y-6">
              <ProjectCard
                name="Dorm-Dish"
                role="Backend Engineer"
                year="2026"
                githubUrl="https://github.com/prathameshlonare/Dorm-and-Dish"
                tech="Lambda · API Gateway · DynamoDB · S3 · CloudFront · CloudFormation · CloudWatch · Python"
                bullets={[
                  "Designed and deployed a serverless multi-tier platform on AWS, projected hosting cost reduction of 80% compared to traditional EC2 deployments.",
                  "Developed 6 RESTful API endpoints using API Gateway and Python (Boto3) Lambda functions.",
                  "Provisioned infrastructure as code via 3 modular CloudFormation stacks, enabling single-command environment deployments.",
                  "Configured CloudWatch alarms for Lambda error rates and API latency to monitor production health.",
                ]}
              />
              <ArchDiagram
                nodes={[
                  { label: "CloudFront" },
                  { label: "S3" },
                  { label: "API Gateway" },
                  { label: "Lambda" },
                  { label: "DynamoDB" },
                  { label: "CloudWatch" },
                ]}
                title="Dorm-Dish"
              />
              <ProjectCard
                name="online-voting-system"
                role="Cloud Engineer"
                year="2025"
                githubUrl="https://github.com/prathameshlonare/Online-voting-system"
                tech="Lambda · IAM · DynamoDB · Cognito · CloudWatch · S3 · GitHub Actions"
                bullets={[
                  "Engineered a GitHub Actions CI/CD pipeline, reducing manual deployment steps from 8 to zero.",
                  "Implemented a highly available backend using DynamoDB On-Demand capacity to automatically handle peak voting traffic without manual provisioning.",
                  "Secured application access via Cognito User Pools, enforcing IAM least-privilege policies across all Lambda execution roles.",
                ]}
                isLast
              />
              <ArchDiagram
                nodes={[
                  { label: "S3" },
                  { label: "Cognito" },
                  { label: "Lambda" },
                  { label: "DynamoDB" },
                  { label: "CloudWatch" },
                  { label: "IAM" },
                  { label: "GitHub Actions" },
                ]}
                title="online-voting-system"
              />
            </div>
          </TerminalSection>
        </section>
        </SectionReveal>

        {/* Skills */}
        <SectionReveal>
        <section id="skills" className="scroll-mt-16 md:scroll-mt-24 mb-10">
          <TerminalSection command="cat skills.json">
            <StaggerGrid skills={skills} />
          </TerminalSection>
        </section>
        </SectionReveal>

        {/* Education */}
        <SectionReveal>
        <section id="education" className="scroll-mt-16 md:scroll-mt-24 mb-10">
          <TerminalSection command="cat education.txt">
            <div className="space-y-6 text-sm md:text-base terminal-body">
              <div>
                <div className="flex flex-wrap items-baseline gap-x-2 mb-1">
                  <span className="text-[var(--text-primary)] font-medium">
                    B.Tech (CSE)
                  </span>
                  <span className="text-[var(--text-dim)]">|</span>
                  <span className="text-[var(--accent-green)]">7.4 CGPA</span>
                  <span className="text-[var(--text-dim)]">|</span>
                  <span className="text-[var(--text-dim)]">2022–2026</span>
                </div>
                <div className="text-[var(--text-muted)] break-words">
                  Rajiv Gandhi College of Engineering, Research and Technology,
                  Chandrapur
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-2 mb-1">
                  <span className="text-[var(--text-primary)] font-medium">
                    XII (HSC)
                  </span>
                  <span className="text-[var(--text-dim)]">|</span>
                  <span className="text-[var(--accent-green)]">72.67%</span>
                  <span className="text-[var(--text-dim)]">|</span>
                  <span className="text-[var(--text-dim)]">2022</span>
                </div>
                <div className="text-[var(--text-muted)] break-words">
                  Lal Bahadur Shastri Dyanpeeth and Junior College, Akot
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-2 mb-1">
                  <span className="text-[var(--text-primary)] font-medium">
                    X (SSC)
                  </span>
                  <span className="text-[var(--text-dim)]">|</span>
                  <span className="text-[var(--accent-green)]">78.80%</span>
                  <span className="text-[var(--text-dim)]">|</span>
                  <span className="text-[var(--text-dim)]">2020</span>
                </div>
                <div className="text-[var(--text-muted)] break-words">
                  Shri Swami Vivekanand English School, Akot
                </div>
              </div>
            </div>
          </TerminalSection>
        </section>
        </SectionReveal>

        {/* Certifications */}
        <SectionReveal>
        <section id="certifications" className="scroll-mt-16 md:scroll-mt-24 mb-10">
          <TerminalSection command="cat certifications.txt">
            <div className="text-sm md:text-base terminal-body">
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline gap-0.5 sm:gap-x-3 sm:gap-y-1">
                <span className="text-[var(--text-primary)] font-medium break-words">
                  Microsoft Elevate &amp; AICTE
                </span>
                <span className="text-[var(--text-secondary)] break-words">
                  Azure Fundamentals Training Program (25 Hours)
                </span>
                <span className="text-[var(--text-dim)]">Jan–Feb 2026</span>
              </div>
            </div>
          </TerminalSection>
        </section>
        </SectionReveal>

        {/* Contact */}
        <SectionReveal>
        <section id="contact" className="scroll-mt-16 md:scroll-mt-24">
          <TerminalSection command="echo $CONTACT">
            <div className="space-y-3 md:space-y-4 text-sm md:text-base pl-0 md:pl-4 border-l-0 md:border-l border-[var(--border)] terminal-body">
              <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-0">
                <span className="text-[var(--text-dim)] w-full sm:w-24 shrink-0 whitespace-nowrap">
                  GitHub:
                </span>
                <a
                  href="https://github.com/prathameshlonare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-blue)] hover:underline transition-colors break-all"
                >
                  github.com/prathameshlonare
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-0">
                <span className="text-[var(--text-dim)] w-full sm:w-24 shrink-0 whitespace-nowrap">
                  Email:
                </span>
                <a
                  href="mailto:prathameshlonare9@gmail.com"
                  className="text-[var(--accent-blue)] hover:underline transition-colors terminal-mono break-all"
                >
                  prathameshlonare9@gmail.com
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-0">
                <span className="text-[var(--text-dim)] w-full sm:w-24 shrink-0 whitespace-nowrap">
                  LinkedIn:
                </span>
                <a
                  href="https://www.linkedin.com/in/prathamesh-lonare-a0759b275/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-blue)] hover:underline transition-colors terminal-mono break-all"
                >
                  prathamesh-lonare
                </a>
              </div>
            </div>
          </TerminalSection>
        </section>
        </SectionReveal>
      </main>
      <ToastContainer />
    </>
  );
}