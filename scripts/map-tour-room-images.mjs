#!/usr/bin/env node
/**
 * Maps Cloudflare image IDs in tour/[uid]/content.ts to tour page keys
 * (board-room, catalina-room, etc.) based on object key structure.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const file = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../src/app/(site)/tour/[uid]/content.ts"
);
const text = fs.readFileSync(file, "utf8");
const lines = text.split("\n");

const ACCOUNT = "jq-BfOr8JDGgGxqbx8v5CA";
const urlRe = new RegExp(
  `https://imagedelivery\\.net/${ACCOUNT}/([a-f0-9-]+)/public`,
  "g"
);

/** @type {string | null} */
let currentKey = null;
/** @type {Map<string, string[]>} */
const idToRooms = new Map();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const keyMatch = line.match(/^\s{2}"([^"]+)"\s*:\s*\{\s*$/);
  if (keyMatch && line.includes(": {")) {
    const k = keyMatch[1];
    if (k !== "export" && !k.startsWith("type") && k.includes("-")) {
      currentKey = k;
    }
  }
  let m;
  urlRe.lastIndex = 0;
  while ((m = urlRe.exec(line)) !== null) {
    const id = m[1];
    if (!currentKey) continue;
    if (!idToRooms.has(id)) idToRooms.set(id, []);
    const arr = idToRooms.get(id);
    if (!arr.includes(currentKey)) arr.push(currentKey);
  }
}

const obj = Object.fromEntries(
  [...idToRooms.entries()].sort((a, b) => a[0].localeCompare(b[0]))
);
process.stdout.write(JSON.stringify(obj, null, 2));
