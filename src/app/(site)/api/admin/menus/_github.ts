// Shared GitHub helpers for menu admin API routes

export const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
export const GITHUB_REPO = process.env.GITHUB_REPO;
export const GITHUB_BRANCH = process.env.GITHUB_BRANCH ?? "main";

export function githubHeaders() {
  return {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };
}
