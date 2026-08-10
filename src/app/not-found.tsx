import { GrainOverlay } from "@/components/anti-ux/grain-overlay";
import { ExposedGrid } from "@/components/anti-ux/exposed-grid";
import { Navigation } from "@/components/layout/navigation";
import { ViewportType } from "@/components/anti-ux/viewport-type";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { NeoCard } from "@/components/anti-ux/neo-card";
import { NeoButton } from "@/components/anti-ux/neo-button";
import { TransitionLink } from "@/components/layout/transition-link";
import { Footer } from "@/components/layout/footer";
import { AlertOctagon, ArrowLeft, Terminal, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <GrainOverlay className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#1A1A2E] overflow-x-hidden">
      <Navigation />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col justify-center items-center w-full my-auto">
        <ExposedGrid className="w-full bg-white border-3 border-[#1A1A2E] shadow-[8px_8px_0px_#FF6B35] p-8 md:p-14 text-center flex flex-col items-center gap-6">
          {/* Status Badge */}
          <div className="flex items-center gap-2 bg-rose-100 border-2 border-[#1A1A2E] px-4 py-1.5 shadow-[3px_3px_0px_#1A1A2E]">
            <AlertOctagon className="w-4 h-4 text-rose-600 animate-pulse" />
            <MonoLabel className="text-rose-700 font-bold text-xs">
              ERROR 404 // ROUTE_NOT_FOUND
            </MonoLabel>
          </div>

          {/* Fluid Viewport Title — one tier below hero */}
          <div className="flex flex-col items-center">
            <ViewportType as="h1" className="text-[var(--text-page)] font-black text-[#1A1A2E]">
              404 // <span className="text-[#FF6B35]">NULL</span>
            </ViewportType>
            <span className="font-mono text-sm font-extrabold text-zinc-500 uppercase tracking-widest mt-2">
              [ENDPOINT_DECOMMISSIONED_OR_INVALID]
            </span>
          </div>

          <p className="text-base md:text-lg text-zinc-700 font-medium max-w-lg leading-relaxed">
            The requested cloud route or infrastructure endpoint does not exist on this server. Check your URL or return to base.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <TransitionLink href="/">
              <NeoButton variant="primary" className="font-mono text-sm tracking-wider">
                <ArrowLeft className="w-4 h-4" /> RETURN TO SYSTEM BASE
              </NeoButton>
            </TransitionLink>

            <TransitionLink href="/work">
              <NeoButton variant="secondary" className="font-mono text-sm tracking-wider">
                <Terminal className="w-4 h-4" /> VIEW DEVOPS WORK
              </NeoButton>
            </TransitionLink>
          </div>
        </ExposedGrid>
      </main>

      <Footer />
    </GrainOverlay>
  );
}
