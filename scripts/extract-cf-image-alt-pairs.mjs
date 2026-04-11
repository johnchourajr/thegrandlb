#!/usr/bin/env node
/**
 * Extracts (image_id -> distinct alt strings) from TS content where
 * `alt: "..."` immediately precedes `url: "https://imagedelivery.net/.../id/public"`.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ACCOUNT = "jq-BfOr8JDGgGxqbx8v5CA";

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

const re = new RegExp(
  `(?:alt|"alt")\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"\\s*,\\s*\\n\\s*(?:url|"url")\\s*:\\s*"https://imagedelivery\\.net\\/${ACCOUNT}\\/([a-f0-9-]+)\\/public"`,
  "g"
);

/** @type {Map<string, Set<string>>} */
const byId = new Map();

for (const file of walk(path.join(ROOT, "src"))) {
  const text = fs.readFileSync(file, "utf8");
  let m;
  re.lastIndex = 0;
  while ((m = re.exec(text)) !== null) {
    const alt = m[1].replace(/\\n/g, " ");
    const id = m[2];
    if (!byId.has(id)) byId.set(id, new Set());
    byId.get(id).add(alt);
  }
}

const out = Object.fromEntries(
  [...byId.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([id, set]) => [id, [...set].sort()])
);

process.stdout.write(JSON.stringify({ accountHash: ACCOUNT, withAltCount: Object.keys(out).length, byId: out }, null, 2));
