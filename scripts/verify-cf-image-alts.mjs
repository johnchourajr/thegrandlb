#!/usr/bin/env node
/**
 * Verifies every imagedelivery.net URL in src/ and content/ has media.alt === vision summary.
 * Exit 1 on mismatch. Run: node scripts/verify-cf-image-alts.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CLASS = JSON.parse(
  fs.readFileSync(
    path.join(ROOT, "docs/cloudflare-images-visual-classification.json"),
    "utf8"
  )
);
const byId = new Map(CLASS.images.map((i) => [i.id, i.summary]));

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === "node_modules" || ent.name === ".next") continue;
      walk(p, out);
    } else if (/\.tsx?$/.test(ent.name)) out.push(p);
  }
  return out;
}

const urlRe =
  /https:\/\/imagedelivery\.net\/jq-BfOr8JDGgGxqbx8v5CA\/([a-f0-9-]{36})\/public/g;

function decodeAlt(raw) {
  return raw.replace(/\\n/g, " ").replace(/\\"/g, '"');
}

function altBeforeUrl(text, urlIndex) {
  const slice = text.slice(Math.max(0, urlIndex - 900), urlIndex);
  const unquoted = [...slice.matchAll(/\balt:\s*"((?:[^"\\]|\\.)*)"/g)].map(
    (m) => decodeAlt(m[1])
  );
  const quoted = [...slice.matchAll(/"alt":\s*"((?:[^"\\]|\\.)*)"/g)].map(
    (m) => decodeAlt(m[1])
  );
  const candidates = [...unquoted, ...quoted];
  return candidates.length ? candidates[candidates.length - 1] : null;
}

const errors = [];
for (const abs of [
  ...walk(path.join(ROOT, "src")),
  ...walk(path.join(ROOT, "content")),
]) {
  const text = fs.readFileSync(abs, "utf8");
  let m;
  urlRe.lastIndex = 0;
  while ((m = urlRe.exec(text)) !== null) {
    const id = m[1];
    const idx = m.index;
    const summary = byId.get(id);
    if (!summary) {
      errors.push(`${path.relative(ROOT, abs)}: unknown id ${id}`);
      continue;
    }
    const alt = altBeforeUrl(text, idx);
    if (alt == null) {
      errors.push(
        `${path.relative(ROOT, abs)}: no alt in media block before url ${id.slice(0, 8)}…`
      );
      continue;
    }
    if (alt !== summary) {
      errors.push(
        `${path.relative(ROOT, abs)}: id ${id}\n  expected: ${summary}\n  got:      ${alt}`
      );
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n\n"));
  process.exit(1);
}
console.log("OK: all Cloudflare Images URLs have alt matching vision summary.");
