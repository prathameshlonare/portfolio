export interface WorkflowRun {
  name: string;
  conclusion: string | null;
  createdAt: string;
}

export interface RepoCommit {
  sha: string;
  message: string;
  date: string;
}

export interface RepoActivity {
  slug: string;
  name: string;
  available: boolean;
  passRate7d: number | null;
  lastRun: WorkflowRun | null;
  commits: RepoCommit[];
  stars: number;
  language: string;
  pushedAt: string;
}

export interface ActivitySnapshot {
  fetchedAt: string;
  repos: RepoActivity[];
}

const OWNER = "prathameshlonare";

const REPOS = [
  { slug: "duokart", name: "DuoKart" },
  { slug: "Dorm-and-Dish", name: "Dorm-Dish" },
  { slug: "Online-voting-system", name: "Voting" },
  { slug: "sysadmin-toolkit", name: "Toolkit" },
];

const FALLBACK_DATE = "2026-10-06";

function unavailable(slug: string, name: string): RepoActivity {
  return {
    slug,
    name,
    available: false,
    passRate7d: null,
    lastRun: null,
    commits: [],
    stars: 0,
    language: "",
    pushedAt: "",
  };
}

export const FALLBACK_SNAPSHOT: ActivitySnapshot = {
  fetchedAt: FALLBACK_DATE,
  repos: REPOS.map((r) => unavailable(r.slug, r.name)),
};

async function gh<T>(path: string, token?: string): Promise<T> {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "portfolio-activity-snapshot",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`GitHub ${res.status} on ${path}`);
  return (await res.json()) as T;
}

interface GhRun {
  name: string;
  conclusion: string | null;
  created_at: string;
}

interface GhCommit {
  sha: string;
  commit: { message: string; author: { date: string } | null };
}

interface GhRepo {
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
}

async function fetchRepo(
  slug: string,
  name: string,
  token?: string
): Promise<RepoActivity> {
  const [runs, commits, repo] = await Promise.all([
    gh<{ workflow_runs: GhRun[] }>(
      `/repos/${OWNER}/${slug}/actions/runs?branch=main&per_page=30`,
      token
    ),
    gh<GhCommit[]>(`/repos/${OWNER}/${slug}/commits?sha=main&per_page=5`, token),
    gh<GhRepo>(`/repos/${OWNER}/${slug}`, token),
  ]);

  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const weekRuns = runs.workflow_runs.filter(
    (r) => Date.parse(r.created_at) >= weekAgo && r.conclusion !== null
  );
  const passed = weekRuns.filter((r) => r.conclusion === "success").length;
  const first = runs.workflow_runs[0];

  return {
    slug,
    name,
    available: true,
    passRate7d:
      weekRuns.length > 0 ? Math.round((passed / weekRuns.length) * 100) : null,
    lastRun: first
      ? { name: first.name, conclusion: first.conclusion, createdAt: first.created_at }
      : null,
    commits: commits.slice(0, 5).map((c) => ({
      sha: c.sha.slice(0, 7),
      message: c.commit.message.split("\n")[0],
      date: c.commit.author?.date ?? "",
    })),
    stars: repo.stargazers_count,
    language: repo.language ?? "",
    pushedAt: repo.pushed_at,
  };
}

export async function getActivitySnapshot(): Promise<ActivitySnapshot> {
  const token = process.env.GITHUB_TOKEN || undefined;
  try {
    const repos = await Promise.all(
      REPOS.map((r) =>
        fetchRepo(r.slug, r.name, token).catch(() => unavailable(r.slug, r.name))
      )
    );
    return { fetchedAt: new Date().toISOString().slice(0, 10), repos };
  } catch {
    return FALLBACK_SNAPSHOT;
  }
}
