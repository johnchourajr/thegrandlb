import { cookies } from "next/headers";
import * as fs from "fs";
import * as path from "path";
import type { NextRequest } from "next/server";
import type { MenuDoc } from "content/types";
import { Resend } from "resend";
import PublishEmail from "@/emails/publishEmail";

const VALID_UIDS = ["classic", "corporate", "milestones", "weddings"] as const;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH ?? "feat/menu-migration";

const MENU_TITLES: Record<string, string> = {
  classic: "Classic",
  corporate: "Corporate",
  milestones: "Milestones",
  weddings: "Weddings",
};

const MENU_URLS: Record<string, string> = {
  classic: "https://thegrandlb.com/menus/classic",
  corporate: "https://thegrandlb.com/menus/corporate",
  milestones: "https://thegrandlb.com/menus/milestones",
  weddings: "https://thegrandlb.com/menus/weddings",
};

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

// Returns the authenticated user's email, or null if not authenticated
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
  if (!(await getAuthenticatedEmail())) return unauthorized();

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
  const publisherEmail = await getAuthenticatedEmail();
  if (!publisherEmail) return unauthorized();

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

    // 3. Send publish notification (fire-and-forget — don't block the response)
    const resendKey = process.env.NEXT_RESEND_API_KEY;
    const fromEmail = process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL;
    if (resendKey && fromEmail) {
      const resend = new Resend(resendKey);
      resend.emails.send({
        from: fromEmail,
        to: publisherEmail,
        subject: `${MENU_TITLES[uid] ?? uid} menu published`,
        react: PublishEmail({
          menuTitle: MENU_TITLES[uid] ?? uid,
          menuUrl: MENU_URLS[uid] ?? "https://thegrandlb.com/menus",
          publishedBy: publisherEmail,
        }),
      }).catch((err) => console.error("[publish-notify] Failed to send email:", err));
    }

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
