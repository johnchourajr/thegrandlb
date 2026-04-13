import { cookies } from "next/headers";
import * as fs from "fs";
import * as path from "path";
import type { NextRequest } from "next/server";
import type { MenuDoc } from "content/types";

const VALID_UIDS = ["classic", "corporate", "milestones", "weddings"] as const;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH ?? "feat/menu-migration";

function localMenuPath(uid: string) {
  return path.join(process.cwd(), "content", "menus", `${uid}.menu.json`);
}

function githubFilePath(uid: string) {
  return `content/menus/${uid}.menu.json`;
}

function githubContentsUrl(uid: string) {
  return `https://api.github.com/repos/${GITHUB_REPO}/contents/${githubFilePath(uid)}`;
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

// ─── GET — reads from local filesystem ────────────────────────────────────────

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  if (!(await isAuthenticated())) return unauthorized();

  const { uid } = await params;

  if (!VALID_UIDS.includes(uid as (typeof VALID_UIDS)[number])) {
    return notFound(uid);
  }

  try {
    const filePath = localMenuPath(uid);
    if (!fs.existsSync(filePath)) return notFound(uid);
    const raw = fs.readFileSync(filePath, "utf-8");
    const menu: MenuDoc = JSON.parse(raw);
    return new Response(JSON.stringify(menu), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to read menu",
        detail: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// ─── PUT — commits to GitHub ───────────────────────────────────────────────────

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  if (!(await isAuthenticated())) return unauthorized();

  const { uid } = await params;

  if (!VALID_UIDS.includes(uid as (typeof VALID_UIDS)[number])) {
    return notFound(uid);
  }

  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return new Response(
      JSON.stringify({ error: "GitHub credentials not configured." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
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
    const encoded = Buffer.from(JSON.stringify(body, null, 2), "utf-8").toString("base64");

    const commitPayload: Record<string, unknown> = {
      message: `cms: update ${uid} menu`,
      content: encoded,
      branch: GITHUB_BRANCH,
    };

    if (currentSha) commitPayload.sha = currentSha;

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
      JSON.stringify({ ok: true, sha: result.content?.sha, commit: result.commit?.sha }),
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
