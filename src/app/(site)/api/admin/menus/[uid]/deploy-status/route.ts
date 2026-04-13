import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

const VALID_UIDS = ["classic", "corporate", "milestones", "weddings"] as const;
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

export type DeployStatus = {
  state: "BUILDING" | "QUEUED" | "READY" | "ERROR" | "CANCELED" | null;
  url: string | null;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> },
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

  const sha = request.nextUrl.searchParams.get("sha");

  const empty: DeployStatus = { state: null, url: null };

  if (!VERCEL_TOKEN || !VERCEL_PROJECT_ID) {
    return Response.json(empty);
  }

  const teamParam = VERCEL_TEAM_ID ? `&teamId=${VERCEL_TEAM_ID}` : "";
  const url = `https://api.vercel.com/v6/deployments?projectId=${VERCEL_PROJECT_ID}&limit=25${teamParam}`;

  const deploysRes = await fetch(url, {
    headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
    // No cache — this is a live status poll
    cache: "no-store",
  }).catch(() => null);

  if (!deploysRes?.ok) {
    return Response.json(empty);
  }

  const { deployments } = (await deploysRes.json()) as {
    deployments: Array<{
      uid: string;
      url: string;
      state: string;
      meta?: { githubCommitSha?: string };
    }>;
  };

  // If a specific commit SHA was provided, match against it.
  // Otherwise fall back to the most recent non-cancelled deployment.
  let match = sha
    ? deployments.find((d) => d.meta?.githubCommitSha === sha)
    : deployments.find((d) => d.state !== "CANCELED");

  if (!match) {
    return Response.json(empty);
  }

  const result: DeployStatus = {
    state: match.state as DeployStatus["state"],
    url: match.url,
  };

  return Response.json(result);
}
