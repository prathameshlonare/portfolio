import { projects } from "@/lib/projects";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { NeoCard } from "@/components/anti-ux/neo-card";
import { NeoButton } from "@/components/anti-ux/neo-button";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { TransitionLink } from "@/components/layout/transition-link";

export function FeaturedWorkPreview() {
  return (
    <section id="work" className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-3 md:gap-4">
        <div>
          <MonoLabel className="text-[#FF6B35]">SELECTED CASE STUDIES & PROJECTS</MonoLabel>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-black text-[#1A1A2E] tracking-tight mt-1">
            INFRASTRUCTURE IN ACTION
          </h2>
        </div>
        <TransitionLink href="/work/">
          <NeoButton variant="secondary" className="font-mono text-xs">
            VIEW ALL <ArrowUpRight className="w-4 h-4" />
          </NeoButton>
        </TransitionLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
        {projects.map((project, idx) => (
          <NeoCard
            key={project.name}
            variant={idx % 2 === 0 ? "orange" : "purple"}
            className="flex flex-col h-full"
          >
            <div className="flex justify-between items-center gap-2 mb-4 pb-3 border-b-2 border-[#1A1A2E]">
              <span className="font-mono text-xs font-bold text-[#1A1A2E]">
                0{idx + 1} / {project.name.toUpperCase()} &middot; {project.year}
              </span>
              {project.impact && (
                <span className="font-mono text-[10px] font-bold text-white bg-[#FF6B35] border-2 border-[#1A1A2E] px-2 py-0.5 shrink-0">
                  IMPACT {project.impact}
                </span>
              )}
            </div>

            <h3 className="text-xl md:text-2xl font-black text-[#1A1A2E] mb-3">
              {project.outcome ?? project.name}
            </h3>

            {project.image && (
              <div className="w-full h-36 md:h-44 mb-4 border-2 border-[#1A1A2E] bg-black shadow-[2px_2px_0px_#1A1A2E] md:shadow-[3px_3px_0px_#1A1A2E] relative overflow-hidden group">
                <img
                  src={project.image}
                  alt={`${project.name} Architecture / Screenshot`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            <p className="text-sm font-medium text-zinc-700 leading-relaxed mb-3">
              {project.description}
            </p>

            {project.role && (
              <p className="font-mono text-[11px] text-[#1A1A2E] leading-relaxed">
                Role: {project.role}
              </p>
            )}
            {project.evidence && (
              <p className="font-mono text-[11px] text-zinc-500 leading-relaxed">
                Evidence: {project.evidence}
              </p>
            )}
            {project.failureLearned && (
              <p className="font-mono text-[11px] leading-relaxed mt-2 bg-amber-100 border-2 border-[#1A1A2E] px-2.5 py-2">
                Failure learned: {project.failureLearned}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mt-auto pt-6">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] font-bold bg-[#FAFAFA] border border-[#1A1A2E] px-2 py-0.5"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-4 mt-4 border-t-2 border-[#1A1A2E]">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn neo-btn-secondary text-xs font-mono py-1.5 px-3"
                >
                  <GithubIcon className="w-3.5 h-3.5" /> Source
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn text-xs font-mono py-1.5 px-3"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                </a>
              )}
            </div>
          </NeoCard>
        ))}
      </div>
    </section>
  );
}
