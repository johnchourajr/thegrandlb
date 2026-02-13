#!/usr/bin/env node
/**
 * Update Prismic documents with video_url (CDN) via the Migration API.
 * Reads videos/video-manifest.json and, for each video, sets the corresponding
 * document's video_url field to https://cdn.thegrandlb.com/<targetFilename>.
 *
 * Requires:
 *   - PRISMIC_ACCESS_TOKEN: Migration API token (Settings > API & Security > Write APIs)
 *   - Optional: PRISMIC_REPOSITORY (default: the-grand from slicemachine.config.json)
 *
 * Rate limit: 1 request/second (Migration API). Updates create DRAFTS; publish in Prismic.
 *
 * Before each PUT, the current document is written to a backup file so you can restore if needed.
 *
 * Usage: node scripts/update-prismic-video-urls.mjs [--dry-run]
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const DRY_RUN = process.argv.includes("--dry-run");
const MIGRATION_API = "https://migration.prismic.io/documents";
const CONTENT_API_BASE = "https://the-grand.cdn.prismic.io/api/v2";

const token = process.env.PRISMIC_ACCESS_TOKEN;
const repository = process.env.PRISMIC_REPOSITORY || "the-grand";

if (!token && !DRY_RUN) {
  console.error("Set PRISMIC_ACCESS_TOKEN (Write API token from Prismic Settings > API & Security).");
  process.exit(1);
}

const migrationHeaders = (body = false) => ({
  repository,
  Authorization: `Bearer ${token}`,
  ...(body ? { "Content-Type": "application/json" } : {}),
});

/** Get master ref from repository API (required for Content API search). */
async function getMasterRef() {
  const url = `${CONTENT_API_BASE}?access_token=${encodeURIComponent(token)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Prismic API ${res.status}: ${await res.text()}`);
  const json = await res.json();
  const master = json.refs?.find((r) => r.isMasterRef);
  if (!master) throw new Error("No master ref in Prismic API");
  return master.ref;
}

/**
 * Parse source string e.g. "doc:page:menus.data.video_media" or "doc:page:home.data.slices[0].primary.video_media"
 * @returns {{ type: string, uid: string, sliceIndex: number | null } | null}
 */
function parseSource(source) {
  const m = source.match(/^doc:([^:]+):([^.]+)\.data\.(.*)$/);
  if (!m) return null;
  const [, type, uid, path] = m;
  const sliceMatch = path.match(/^slices\[(\d+)\]\.primary\.video_media$/);
  const sliceIndex = sliceMatch ? parseInt(sliceMatch[1], 10) : null;
  if (path === "video_media" || sliceMatch) return { type, uid, sliceIndex };
  return null;
}

/**
 * Fetch document by type and uid from Content API.
 */
async function getDocument(type, uid, ref) {
  const q = `[[at(document.type,"${type}")]][[at(document.uid,"${uid}")]]`;
  const url = `${CONTENT_API_BASE}/documents/search?ref=${encodeURIComponent(ref)}&q=${encodeURIComponent(q)}&access_token=${encodeURIComponent(token)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Content API ${res.status}: ${await res.text()}`);
  const json = await res.json();
  const doc = json.results?.[0];
  if (!doc) throw new Error(`Document not found: ${type} / ${uid}`);
  return doc;
}

/**
 * Apply video_url updates to a copy of data. updates = [ { sliceIndex: null | number, url } ]
 */
function applyVideoUrlUpdates(data, updates) {
  const dataCopy = JSON.parse(JSON.stringify(data));
  for (const { sliceIndex, url } of updates) {
    if (sliceIndex === null) {
      dataCopy.video_url = url;
    } else {
      if (!Array.isArray(dataCopy.slices) || !dataCopy.slices[sliceIndex]) {
        console.warn(`  Warning: slices[${sliceIndex}] missing, skipping`);
        continue;
      }
      if (!dataCopy.slices[sliceIndex].primary) dataCopy.slices[sliceIndex].primary = {};
      dataCopy.slices[sliceIndex].primary.video_url = url;
    }
  }
  return dataCopy;
}

/**
 * PUT document to Migration API (creates draft).
 */
async function putDocument(docId, uid, data) {
  const url = `${MIGRATION_API}/${docId}/`;
  const res = await fetch(url, {
    method: "PUT",
    headers: migrationHeaders(true),
    body: JSON.stringify({ uid, data }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Migration API ${res.status}: ${text}`);
  }
  return res.json();
}

async function main() {
  const manifestPath = join(ROOT, "videos", "video-manifest.json");
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch (e) {
    console.error("Could not read video-manifest.json. Run audit first: node scripts/audit-prismic-videos.mjs");
    process.exit(1);
  }

  const cdnBase = manifest.cdnBase || "https://cdn.thegrandlb.com";
  const videos = manifest.videos || [];

  // Group by (type, uid): list of { sliceIndex, url }
  const byDoc = new Map();
  for (const v of videos) {
    const url = `${cdnBase}/${v.targetFilename}`;
    for (const src of v.sources || []) {
      const parsed = parseSource(src);
      if (!parsed) {
        console.warn(`Skipping unparseable source: ${src}`);
        continue;
      }
      const key = `${parsed.type}:${parsed.uid}`;
      if (!byDoc.has(key)) byDoc.set(key, { type: parsed.type, uid: parsed.uid, updates: [] });
      byDoc.get(key).updates.push({ sliceIndex: parsed.sliceIndex, url });
    }
  }

  console.log(`Found ${byDoc.size} document(s) to update with video_url.`);
  if (DRY_RUN) {
    console.log("Dry run – no requests will be sent.");
    for (const [key, { type, uid, updates }] of byDoc) {
      console.log(`  ${key}: ${updates.length} video_url(s)`);
    }
    return;
  }

  const ref = await getMasterRef();
  const backupDir = join(ROOT, "videos");
  const backupTs = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = join(backupDir, `prismic-backup-${backupTs}.json`);
  const backup = {
    createdAt: new Date().toISOString(),
    repository,
    description: "Document state before video_url Migration API update. Use id + data to restore via Migration API PUT if needed.",
    documents: [],
  };

  mkdirSync(backupDir, { recursive: true });

  for (const [key, { type, uid, updates }] of byDoc) {
    console.log(`Updating ${type}:${uid} ...`);
    try {
      const doc = await getDocument(type, uid, ref);
      backup.documents.push({
        id: doc.id,
        type: doc.type,
        uid: doc.uid,
        lang: doc.lang,
        data: doc.data,
      });
      writeFileSync(backupPath, JSON.stringify(backup, null, 2), "utf8");

      const newData = applyVideoUrlUpdates(doc.data, updates);
      await putDocument(doc.id, doc.uid, newData);
      console.log(`  Done (draft).`);
    } catch (e) {
      console.error(`  Error: ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 1100));
  }

  console.log("Finished. Open Prismic > Migration Releases to review and publish drafts.");
  if (backup.documents.length > 0) {
    console.log(`Backup written to ${backupPath}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
