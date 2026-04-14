import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH } from "../../_github";

const VALID_UIDS = ["classic", "corporate", "milestones", "weddings", "shared"] as const;

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;

async function getAuthenticatedEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  const email = session?.value ?? "";
  if (!email) return null;
  const raw = process.env.ADMIN_USERS ?? "";
  const validEmails = raw
    .split(",")
    .map((p) => p.slice(0, p.indexOf(":")).trim().toLowerCase())
    .filter(Boolean);
  return validEmails.includes(email) ? email : null;
}

export type CommitRecord = {
  sha: string;
  shortSha: string;
  message: string;
  authorEmail: string;
  authorName: string;
  date: string;
  githubUrl: string;
  deploy: DeployRecord | null;
};

export type DeployRecord = {
  uid: string;
  url: string;
  state: "READY" | "BUILDING" | "ERROR" | "CANCELED" | "QUEUED" | string;
  createdAt: number;
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  if (!(await getAuthenticatedEmail())) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { uid } = await params;

  if (!VALID_UIDS.includes(uid as (typeof VALID_UIDS)[number])) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return new Response(JSON.stringify({ commits: [], error: "GitHub not configured" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const filePath = `content/menus/${uid}.menu.json`;
  // ─── Fetch commit history from GitHub ────────────────────────────────────────
  const commitsUrl = `https://api.github.com/repos/${GITHUB_REPO}/commits?path=${filePath}&sha=${GITHUB_BRANCH}&per_page=20`;
  const commitsRes = await fetch(commitsUrl, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
    next: { revalidate: 60 },
  });

  if (!commitsRes.ok) {
    return new Response(
      JSON.stringify({ commits: [], error: "Failed to fetch commit history" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  const allCommits: Array<{
    sha: string;
    commit: { message: string; author: { email: string; name: string; date: string } };
    html_url: string;
  }> = await commitsRes.json();

  // Only surface commits that were published through the admin (message matches the
  // pattern used by the PUT route). This filters out developer commits that
  // incidentally touched the same file.
  const expectedMessage = `cms: update ${uid} menu`;
  const rawCommits = allCommits.filter((c) =>
    c.commit.message.trimStart().toLowerCase().startsWith(expectedMessage)
  );

  // ─── Fetch Vercel deployments ─────────────────────────────────────────────────
  const deployBySha = new Map<string, DeployRecord>();

  if (VERCEL_TOKEN && VERCEL_PROJECT_ID) {
    const teamParam = VERCEL_TEAM_ID ? `&teamId=${VERCEL_TEAM_ID}` : "";
    const deploysUrl = `https://api.vercel.com/v6/deployments?projectId=${VERCEL_PROJECT_ID}&limit=50${teamParam}`;

    const deploysRes = await fetch(deploysUrl, {
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
      next: { revalidate: 60 },
    }).catch(() => null);

    if (deploysRes?.ok) {
      const { deployments } = await deploysRes.json() as {
        deployments: Array<{
          uid: string;
          url: string;
          state: string;
          createdAt: number;
          meta?: { githubCommitSha?: string };
        }>;
      };

      for (const d of deployments ?? []) {
        const sha = d.meta?.githubCommitSha;
        if (sha) {
          deployBySha.set(sha, {
            uid: d.uid,
            url: d.url,
            state: d.state,
            createdAt: d.createdAt,
          });
        }
      }
    }
  }

  // ─── Correlate ────────────────────────────────────────────────────────────────
  const commits: CommitRecord[] = rawCommits.map((c) => ({
    sha: c.sha,
    shortSha: c.sha.slice(0, 7),
    message: c.commit.message.split("\n")[0],
    authorEmail: c.commit.author.email,
    authorName: c.commit.author.name,
    date: c.commit.author.date,
    githubUrl: c.html_url,
    deploy: deployBySha.get(c.sha) ?? null,
  }));

  return new Response(JSON.stringify({ commits }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
