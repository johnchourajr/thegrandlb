/**
 * Audit Prismic CDN for video assets and download to videos/original/.
 * Run: node scripts/audit-prismic-videos.mjs
 *
 * Requires: Prismic repo is public (no token). Uses the-grand.cdn.prismic.io.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const API_BASE = "https://the-grand.cdn.prismic.io/api/v2";
const VIDEO_EXT = /\.(mp4|webm|mov)(\?|$)/i;
const PRISMIC_CDN = /(?:the-grand\.cdn\.prismic\.io|images\.prismic\.io)/;

const DOC_TYPES = [
  "page",
  "tour_index_page",
  "event_index_page",
  "fragment_cta_footer",
  "tour_page",
  "event_page",
  "menu_page",
  "offsite_index_page",
  "offsite_page",
  "inquire_page",
  "settings",
  "fragment_card",
];

function isVideoUrl(url) {
  if (typeof url !== "string") return false;
  return PRISMIC_CDN.test(url) && VIDEO_EXT.test(url);
}

function collectUrls(obj, out, source = "") {
  if (!obj || typeof obj !== "object") return;
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => collectUrls(item, out, `${source}[${i}]`));
    return;
  }
  if (obj.url && isVideoUrl(obj.url)) {
    out.push({ url: obj.url, source });
    return;
  }
  for (const [key, value] of Object.entries(obj)) {
    collectUrls(value, out, source ? `${source}.${key}` : key);
  }
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function getMasterRef() {
  const api = await fetchJson(API_BASE);
  const master = api.refs?.find((r) => r.id === "master");
  if (!master) throw new Error("No master ref in Prismic API");
  return master.ref;
}

async function getAllDocuments(ref) {
  const seen = new Set();
  const all = [];

  for (const type of DOC_TYPES) {
    let page = 1;
    let hasMore = true;
    while (hasMore) {
      const q = encodeURIComponent(`[[at(document.type,"${type}")]]`);
      const url = `${API_BASE}/documents/search?ref=${ref}&q=${q}&pageSize=100&page=${page}`;
      const data = await fetchJson(url);
      const results = data.results || [];
      for (const doc of results) {
        const id = doc.id;
        if (!seen.has(id)) {
          seen.add(id);
          all.push({ ...doc, _type: type });
        }
      }
      hasMore = results.length === 100;
      page += 1;
    }
  }

  return all;
}

function slugify(name) {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase() || "video";
}

function suggestFilename(url, index) {
  try {
    const u = new URL(url);
    const base = path.basename(u.pathname);
    const name = base.replace(/\.[^.]+$/, "").replace(/[^a-z0-9-_]+/gi, "-");
    return `${slugify(name || `video-${index}`)}.mp4`;
  } catch {
    return `video-${index}.mp4`;
  }
}

async function download(url, filepath) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`Download failed: ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, buf);
  return buf.length;
}

async function main() {
  console.log("Fetching Prismic API ref...");
  const ref = await getMasterRef();
  console.log("Fetching documents...");
  const documents = await getAllDocuments(ref);

  const found = [];
  for (const doc of documents) {
    collectUrls(doc, found, `doc:${doc._type}:${doc.uid || doc.id}`);
  }

  const byUrl = new Map();
  for (const { url, source } of found) {
    const normalized = url.replace(/\?.*/, "");
    if (!byUrl.has(normalized)) {
      byUrl.set(normalized, { url: normalized, sources: [], originalUrl: url });
    }
    byUrl.get(normalized).sources.push(source);
  }

  const unique = Array.from(byUrl.values());
  console.log(`Found ${unique.length} unique video URL(s).`);

  const originalDir = path.join(ROOT, "videos", "original");
  fs.mkdirSync(originalDir, { recursive: true });

  const manifest = {
    generated: new Date().toISOString(),
    cdnBase: "https://cdn.thegrandlb.com",
    bucket: "grandlb-videos",
    videos: [],
  };

  for (let i = 0; i < unique.length; i++) {
    const entry = unique[i];
    const targetFilename = suggestFilename(entry.url, i + 1);
    const filepath = path.join(originalDir, targetFilename);

    const record = {
      originalPrismicUrl: entry.originalUrl,
      targetFilename,
      sources: entry.sources,
      originalSizeBytes: null,
      optimizedSizeBytes: null,
      optimizedPath: null,
    };

    try {
      console.log(`Downloading ${i + 1}/${unique.length}: ${targetFilename}`);
      const size = await download(entry.url, filepath);
      record.originalSizeBytes = size;
    } catch (err) {
      console.error(`Failed to download ${entry.url}:`, err.message);
      record.downloadError = err.message;
    }

    manifest.videos.push(record);
  }

  const manifestPath = path.join(ROOT, "videos", "video-manifest.json");
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Manifest written to ${manifestPath}`);

  const totalBytes = manifest.videos.reduce(
    (s, v) => s + (v.originalSizeBytes || 0),
    0
  );
  console.log(
    `Total downloaded: ${(totalBytes / 1024 / 1024).toFixed(2)} MB (${manifest.videos.length} files)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
