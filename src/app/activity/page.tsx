import { GrainOverlay } from "@/components/anti-ux/grain-overlay";
import { Navigation } from "@/components/layout/navigation";
import { ViewportType } from "@/components/anti-ux/viewport-type";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { NeoCard } from "@/components/anti-ux/neo-card";
import { Footer } from "@/components/layout/footer";
import { getActivitySnapshot } from "@/lib/activity";

export const metadata = {
  title: "Activity & Pipelines: Prathamesh Lonare | Live GitHub Proof",
  description:
    "Live pipeline pass-rates, recent commits, and repo vitals fetched from GitHub on every deploy.",
  alternates: { canonical: "https://prathameshlonare.me/activity/" },
};

export const dynamic = "force-static";

export default async function ActivityPage() {
  const snapshot = await getActivitySnapshot();
  const hasCommits = snapshot.repos.some((r) => r.commits.length > 0);

  return (
    <GrainOverlay className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#1A1A2E] overflow-x-hidden">
      <Navigation />
      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 w-full">
        <div className="border-b-3 border-[#1A1A2E] pb-6 md:pb-8 mb-8 md:mb-12">
          <MonoLabel className="text-[#FF6B35] font-bold">
            PROOF OF WORK · GITHUB SNAPSHOT
          </MonoLabel>
          <ViewportType as="h1" className="text-[var(--text-page)] font-black mt-2">
            ACTIVITY <span className="text-[#FF6B35]">&</span> PIPELINES
          </ViewportType>
          <p className="text-base md:text-lg text-zinc-700 font-medium max-w-2xl mt-3 md:mt-4 leading-relaxed">
            Refreshed from the GitHub API on every deploy of this site. No
            polling, no quota risk.
          </p>
          <p className="inline-block mt-4 font-mono text-[11px] font-bold text-white bg-[#1A1A2E] border-2 border-[#1A1A2E] shadow-[2px_2px_0px_#FF6B35] px-2 py-0.5">
            SNAPSHOT · {snapshot.fetchedAt} · {snapshot.repos.length} REPOS
          </p>
        </div>

        <h2 className="font-mono text-xs font-bold tracking-[0.15em] text-zinc-500 mb-4">
          01 / PIPELINE STATUS (7-DAY PASS RATE)
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          {snapshot.repos.map((repo) => (
            <NeoCard key={repo.slug} variant="orange" className="flex flex-col">
              <div className="flex justify-between items-center gap-2 mb-4 pb-3 border-b-2 border-[#1A1A2E]">
                <span className="font-mono text-xs font-bold text-[#1A1A2E]">
                  {repo.name.toUpperCase()}
                </span>
                {repo.available && repo.passRate7d !== null ? (
                  <span className="font-mono text-[10px] font-bold text-white bg-[#1A1A2E] border-2 border-[#1A1A2E] px-2 py-0.5">
                    {repo.passRate7d}% GREEN
                  </span>
                ) : (
                  <span className="font-mono text-[10px] font-bold text-zinc-500 border-2 border-zinc-400 px-2 py-0.5">
                    UNAVAILABLE
                  </span>
                )}
              </div>
              {repo.available && repo.lastRun ? (
                <p className="font-mono text-[11px] text-zinc-600 leading-relaxed break-words">
                  Last run: {repo.lastRun.name} · {repo.lastRun.conclusion ?? "running"} ·{" "}
                  {repo.lastRun.createdAt.slice(0, 10)}
                </p>
              ) : (
                <p className="font-mono text-[11px] text-zinc-500 leading-relaxed">
                  No runs recorded in range.
                </p>
              )}
              <a
                href={`https://github.com/prathameshlonare/${repo.slug}/actions`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${repo.name} workflow runs on GitHub`}
                className="mt-3 font-mono text-[11px] font-bold text-[#1A1A2E] hover:text-[#FF6B35] transition-colors"
              >
                View runs ↗
              </a>
            </NeoCard>
          ))}
        </div>

        <h2 className="font-mono text-xs font-bold tracking-[0.15em] text-zinc-500 mb-4">
          02 / RECENT COMMITS
        </h2>
        {hasCommits ? (
        <ul className="flex flex-col gap-3 mb-8 md:mb-12">
          {snapshot.repos.flatMap((repo) =>
            repo.commits.map((c) => (
              <li
                key={`${repo.slug}-${c.sha}`}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 bg-white border-2 border-[#1A1A2E] shadow-[4px_4px_0px_#1A1A2E] px-3 py-2.5 font-mono text-xs"
              >
                <span className="font-bold text-white bg-[#1A1A2E] px-1.5 py-px">
                  {c.sha}
                </span>
                <span className="font-bold flex-1 min-w-0 break-words">{c.message}</span>
                <span className="text-zinc-500 text-[11px]">
                  {repo.name} · {c.date.slice(0, 10)}
                </span>
              </li>
            ))
          )}
        </ul>
        ) : (
          <p className="font-mono text-[11px] text-zinc-500 leading-relaxed mb-8 md:mb-12">No recent commits in this snapshot.</p>
        )}

        <h2 className="font-mono text-xs font-bold tracking-[0.15em] text-zinc-500 mb-4">
          03 / REPO VITALS
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {snapshot.repos.map((repo) => (
            <div
              key={repo.slug}
              className="bg-white border-2 border-[#1A1A2E] shadow-[4px_4px_0px_#1A1A2E] p-3 md:p-4"
            >
              <p className="font-mono text-xs font-bold">{repo.name.toUpperCase()}</p>
              <p className="text-xl md:text-2xl font-black mt-1">
                <span aria-hidden="true">★</span> {repo.available ? repo.stars : "—"}
              </p>
              <p className="font-mono text-[11px] text-zinc-500 mt-1">
                {repo.available
                  ? `${repo.language ? `${repo.language} · ` : ""}pushed ${repo.pushedAt.slice(0, 10)}`
                  : "unavailable"}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </GrainOverlay>
  );
}
