import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import type { DeployRecord } from "@/app/(site)/api/admin/menus/[uid]/history/route";
import { GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH } from "../_github";

const MENU_UIDS = ["classic", "corporate", "milestones", "weddings", "shared"] as const;

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

export type GlobalCommitRecord = {
  sha: string;
  shortSha: string;
  message: string;
  menuUid: string;
  menuLabel: string;
  authorEmail: string;
  authorName: string;
  date: string;
  githubUrl: string;
  deploy: DeployRecord | null;
};

const MENU_LABELS: Record<string, string> = {
  classic: "Classic",
  corporate: "Corporate",
  milestones: "Milestones",
  weddings: "Weddings",
  shared: "Shared",
};

const NO_STORE_HEADERS = {
  "Cache-Control": "private, no-store, no-cache, must-revalidate",
};

export async function GET(_request: NextRequest) {
  if (!(await getAuthenticatedEmail())) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401, headers: NO_STORE_HEADERS }
    );
  }

  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return Response.json(
      { commits: [], error: "GitHub not configured" },
      { headers: NO_STORE_HEADERS }
    );
  }

  // ─── Fetch commits for all menus in parallel ────────────────────────────────
  const results = await Promise.all(
    MENU_UIDS.map(async (uid) => {
      const filePath = `content/menus/${uid}.menu.json`;
      const url = `https://api.github.com/repos/${GITHUB_REPO}/commits?path=${filePath}&sha=${GITHUB_BRANCH}&per_page=20`;
      const res = await fetch(url, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
        cache: "no-store",
      }).catch(() => null);
      if (!res?.ok) return [];

      const all: Array<{
        sha: string;
        commit: { message: string; author: { email: string; name: string; date: string } };
        html_url: string;
      }> = await res.json();

      const expectedMessage = `cms: update ${uid} menu`;
      return all
        .filter((c) => c.commit.message.trimStart().toLowerCase().startsWith(expectedMessage))
        .map((c) => ({ uid, commit: c }));
    })
  );

  // ─── Fetch Vercel deployments ───────────────────────────────────────────────
  const deployBySha = new Map<string, DeployRecord>();
  if (VERCEL_TOKEN && VERCEL_PROJECT_ID) {
    const teamParam = VERCEL_TEAM_ID ? `&teamId=${VERCEL_TEAM_ID}` : "";
    const deploysRes = await fetch(
      `https://api.vercel.com/v6/deployments?projectId=${VERCEL_PROJECT_ID}&limit=100${teamParam}`,
      { headers: { Authorization: `Bearer ${VERCEL_TOKEN}` }, next: { revalidate: 60 } }
    ).catch(() => null);
    if (deploysRes?.ok) {
      const { deployments } = await deploysRes.json() as {
        deployments: Array<{ uid: string; url: string; state: string; createdAt: number; meta?: { githubCommitSha?: string } }>;
      };
      for (const d of deployments ?? []) {
        const sha = d.meta?.githubCommitSha;
        if (sha) deployBySha.set(sha, { uid: d.uid, url: d.url, state: d.state, createdAt: d.createdAt });
      }
    }
  }

  // ─── Flatten, sort, correlate ───────────────────────────────────────────────
  const flat: GlobalCommitRecord[] = results
    .flat()
    .map(({ uid, commit: c }) => ({
      sha: c.sha,
      shortSha: c.sha.slice(0, 7),
      message: c.commit.message.split("\n")[0],
      menuUid: uid,
      menuLabel: MENU_LABELS[uid] ?? uid,
      authorEmail: c.commit.author.email,
      authorName: c.commit.author.name,
      date: c.commit.author.date,
      githubUrl: c.html_url,
      deploy: deployBySha.get(c.sha) ?? null,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return Response.json({ commits: flat }, { headers: NO_STORE_HEADERS });
}
