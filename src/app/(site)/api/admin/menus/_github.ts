// Shared GitHub helpers for menu admin API routes

export const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
export const GITHUB_REPO = process.env.GITHUB_REPO;

export function githubHeaders() {
  return {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };
}

// Cache the resolved branch for the lifetime of the serverless instance
let _cachedBranch: string | null = null;

/**
 * Returns the branch to commit/read from.
 * Priority: GITHUB_BRANCH env var → repo default branch from GitHub API → "main"
 */
export async function getActiveBranch(): Promise<string> {
  if (process.env.GITHUB_BRANCH) return process.env.GITHUB_BRANCH;
  if (_cachedBranch) return _cachedBranch;

  if (!GITHUB_TOKEN || !GITHUB_REPO) return "main";

  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      headers: githubHeaders(),
      next: { revalidate: 300 }, // cache for 5 min
    });
    if (res.ok) {
      const data = await res.json();
      _cachedBranch = data.default_branch ?? "main";
      return _cachedBranch!;
    }
  } catch {
    // fall through
  }

  return "main";
}
