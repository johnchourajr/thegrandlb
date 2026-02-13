/**
 * Optimize videos in videos/original/ and write to videos/optimized/.
 * Updates video-manifest.json with optimized sizes.
 * Run: node scripts/optimize-videos.mjs
 * Requires: ffmpeg on PATH
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ORIGINAL = path.join(ROOT, "videos", "original");
const OPTIMIZED = path.join(ROOT, "videos", "optimized");
const MANIFEST_PATH = path.join(ROOT, "videos", "video-manifest.json");

if (!fs.existsSync(MANIFEST_PATH)) {
  console.error("Run audit first: node scripts/audit-prismic-videos.mjs");
  process.exit(1);
}

fs.mkdirSync(OPTIMIZED, { recursive: true });
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));

for (let i = 0; i < manifest.videos.length; i++) {
  const v = manifest.videos[i];
  if (v.downloadError) continue;
  const inPath = path.join(ORIGINAL, v.targetFilename);
  const outFilename = v.targetFilename.replace(/\.(webm|mov)$/i, ".mp4");
  const outPath = path.join(OPTIMIZED, outFilename);
  if (!fs.existsSync(inPath)) continue;

  console.log(`Optimizing ${i + 1}/${manifest.videos.length}: ${v.targetFilename}`);
  const result = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      inPath,
      "-c:v",
      "libx264",
      "-crf",
      "28",
      "-preset",
      "slow",
      "-an",
      "-movflags",
      "+faststart",
      "-vf",
      "scale=trunc(iw/2)*2:trunc(ih/2)*2",
      outPath,
    ],
    { stdio: "inherit" }
  );

  if (result.status !== 0) {
    v.optimizeError = `ffmpeg exited ${result.status}`;
    continue;
  }
  const stat = fs.statSync(outPath);
  v.optimizedSizeBytes = stat.size;
  v.optimizedPath = `videos/optimized/${outFilename}`;
}

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log("Manifest updated. Optimized videos in videos/optimized/");

const totalOrig = manifest.videos.reduce((s, x) => s + (x.originalSizeBytes || 0), 0);
const totalOpt = manifest.videos.reduce((s, x) => s + (x.optimizedSizeBytes || 0), 0);
if (totalOrig) {
  const pct = ((1 - totalOpt / totalOrig) * 100).toFixed(1);
  console.log(`Original total: ${(totalOrig / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized total: ${(totalOpt / 1024 / 1024).toFixed(2)} MB (${pct}% reduction)`);
}
