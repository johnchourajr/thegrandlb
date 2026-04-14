import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import type { MenuDoc } from "content/types";
import { diffMenuDocs } from "@/app/(admin)/admin/(protected)/menus/[uid]/utils/diff";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;

const NO_STORE_HEADERS = {
  "Cache-Control": "private, no-store, no-cache, must-revalidate",
};

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

async function fetchFileAtRef(filePath: string, ref: string): Promise<MenuDoc | null> {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}?ref=${ref}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
    cache: "no-store",
  }).catch(() => null);
  if (!res?.ok) return null;
  const data = await res.json();
  if (!data.content) return null;
  try {
    return JSON.parse(Buffer.from(data.content, "base64").toString("utf-8")) as MenuDoc;
  } catch {
    return null;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sha: string }> }
) {
  if (!(await getAuthenticatedEmail())) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401, headers: NO_STORE_HEADERS }
    );
  }

  const { sha } = await params;
  const uid = request.nextUrl.searchParams.get("uid");

  if (!uid || !sha) {
    return Response.json(
      { error: "Missing uid or sha" },
      { status: 400, headers: NO_STORE_HEADERS }
    );
  }

  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return Response.json(
      { error: "GitHub not configured" },
      { status: 503, headers: NO_STORE_HEADERS }
    );
  }

  const filePath = `content/menus/${uid}.menu.json`;

  // Get parent SHA from commit metadata
  const commitRes = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/commits/${sha}`,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    }
  ).catch(() => null);

  if (!commitRes?.ok) {
    return Response.json(
      { error: "Failed to fetch commit" },
      { status: 502, headers: NO_STORE_HEADERS }
    );
  }

  const commitData = await commitRes.json();
  const parentSha: string | undefined = commitData.parents?.[0]?.sha;

  const [current, parent] = await Promise.all([
    fetchFileAtRef(filePath, sha),
    parentSha ? fetchFileAtRef(filePath, parentSha) : Promise.resolve(null),
  ]);

  if (!current) {
    return Response.json(
      { error: "Could not fetch file at commit" },
      { status: 502, headers: NO_STORE_HEADERS }
    );
  }

  const changes = parent ? diffMenuDocs(parent, current) : [];

  return Response.json({ changes }, { headers: NO_STORE_HEADERS });
}
