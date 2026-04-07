import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import type { MenuDoc } from "content/types";

const VALID_UIDS = ["classic", "corporate", "milestones", "weddings"] as const;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH ?? "feat/menu-migration";

function menuFilePath(uid: string) {
  return `content/menus/${uid}.menu.json`;
}

function githubContentsUrl(uid: string) {
  return `https://api.github.com/repos/${GITHUB_REPO}/contents/${menuFilePath(uid)}`;
}

function githubHeaders() {
  return {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };
}

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === process.env.ADMIN_PASSWORD;
}

function unauthorized() {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}

function notFound(uid: string) {
  return new Response(JSON.stringify({ error: `Menu '${uid}' not found` }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
}

// ─── GET ──────────────────────────────────────────────────────────────────────

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  if (!isAuthenticated()) return unauthorized();

  const { uid } = await params;

  if (!VALID_UIDS.includes(uid as (typeof VALID_UIDS)[number])) {
    return notFound(uid);
  }

  try {
    const url = `${githubContentsUrl(uid)}?ref=${GITHUB_BRANCH}`;
    const res = await fetch(url, { headers: githubHeaders() });

    if (res.status === 404) return notFound(uid);

    if (!res.ok) {
      const text = await res.text();
      return new Response(
        JSON.stringify({ error: "GitHub API error", detail: text }),
        { status: res.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const githubFile = await res.json();
    const decoded = Buffer.from(githubFile.content, "base64").toString("utf-8");
    const menu: MenuDoc = JSON.parse(decoded);

    return new Response(
      JSON.stringify({ sha: githubFile.sha, menu }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch menu",
        detail: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// ─── PUT ──────────────────────────────────────────────────────────────────────

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  if (!isAuthenticated()) return unauthorized();

  const { uid } = await params;

  if (!VALID_UIDS.includes(uid as (typeof VALID_UIDS)[number])) {
    return notFound(uid);
  }

  let body: MenuDoc;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // 1. Fetch current file SHA from GitHub
    const getUrl = `${githubContentsUrl(uid)}?ref=${GITHUB_BRANCH}`;
    const getRes = await fetch(getUrl, { headers: githubHeaders() });

    if (!getRes.ok && getRes.status !== 404) {
      const text = await getRes.text();
      return new Response(
        JSON.stringify({ error: "Failed to fetch current file SHA", detail: text }),
        { status: getRes.status, headers: { "Content-Type": "application/json" } }
      );
    }

    let currentSha: string | undefined;
    if (getRes.ok) {
      const current = await getRes.json();
      currentSha = current.sha;
    }

    // 2. Commit updated JSON
    const encoded = Buffer.from(
      JSON.stringify(body, null, 2),
      "utf-8"
    ).toString("base64");

    const commitPayload: Record<string, unknown> = {
      message: `cms: update ${uid} menu`,
      content: encoded,
      branch: GITHUB_BRANCH,
    };

    if (currentSha) {
      commitPayload.sha = currentSha;
    }

    const putRes = await fetch(githubContentsUrl(uid), {
      method: "PUT",
      headers: githubHeaders(),
      body: JSON.stringify(commitPayload),
    });

    if (!putRes.ok) {
      const text = await putRes.text();
      return new Response(
        JSON.stringify({ error: "GitHub commit failed", detail: text }),
        { status: putRes.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await putRes.json();

    return new Response(
      JSON.stringify({
        ok: true,
        sha: result.content?.sha,
        commit: result.commit?.sha,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to commit menu",
        detail: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
