#!/usr/bin/env node
/**
 * Sets `alt` on every Cloudflare Images media field to the `summary` from
 * docs/cloudflare-images-visual-classification.json (vision catalog).
 *
 * Run from repo root: node scripts/sync-cf-image-alts.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CLASS_PATH = path.join(
  ROOT,
  "docs/cloudflare-images-visual-classification.json"
);

const FILES = [
  "src/app/(site)/content.ts",
  "src/app/(site)/events/content.ts",
  "src/app/(site)/faq/content.ts",
  "src/app/(site)/menus/content.ts",
  "src/app/(site)/about/content.ts",
  "src/app/(site)/tour/content.ts",
  "src/app/(site)/tour/[uid]/content.ts",
  "content/shared.constants.ts",
  ...fs
    .readdirSync(path.join(ROOT, "src/app/(site)/events/[uid]"))
    .filter((f) => f.endsWith(".content.ts"))
    .map((f) => path.join("src/app/(site)/events/[uid]", f)),
];

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeForJsDoubleQuoted(s) {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, " ");
}

const { images } = JSON.parse(fs.readFileSync(CLASS_PATH, "utf8"));
const byId = new Map(images.map((img) => [img.id, img.summary]));

function patchContent(text) {
  let out = text;
  for (const [id, summary] of byId) {
    const esc = escapeForJsDoubleQuoted(summary);
    const fullUrl = `https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/${id}/public`;
    const urlRe = escapeRegex(fullUrl);

    // alt: ... then newline then url: "https://...
    out = out.replace(
      new RegExp(
        `alt:\\s*null(\\s*,\\s*\\r?\\n\\s*url:\\s*"${urlRe}")`,
        "g"
      ),
      `alt: "${esc}"$1`
    );
    out = out.replace(
      new RegExp(
        `alt:\\s*"[^"]*"(\\s*,\\s*\\r?\\n\\s*url:\\s*"${urlRe}")`,
        "g"
      ),
      `alt: "${esc}"$1`
    );

    // alt: null, copyright: null, url: (e.g. ctaFooter in shared.constants)
    out = out.replace(
      new RegExp(
        `alt:\\s*null(\\s*,\\s*\\r?\\n\\s*copyright:\\s*null\\s*,\\s*\\r?\\n\\s*url:\\s*"${urlRe}")`,
        "g"
      ),
      `alt: "${esc}"$1`
    );
    out = out.replace(
      new RegExp(
        `alt:\\s*"[^"]*"(\\s*,\\s*\\r?\\n\\s*copyright:\\s*null\\s*,\\s*\\r?\\n\\s*url:\\s*"${urlRe}")`,
        "g"
      ),
      `alt: "${esc}"$1`
    );

    // "alt": ... then newline then "url": "https://...
    out = out.replace(
      new RegExp(
        `"alt":\\s*null(\\s*,\\s*\\r?\\n\\s*"url":\\s*"${urlRe}")`,
        "g"
      ),
      `"alt": "${esc}"$1`
    );
    out = out.replace(
      new RegExp(
        `"alt":\\s*"[^"]*"(\\s*,\\s*\\r?\\n\\s*"url":\\s*"${urlRe}")`,
        "g"
      ),
      `"alt": "${esc}"$1`
    );

    out = out.replace(
      new RegExp(
        `"alt":\\s*null(\\s*,\\s*\\r?\\n\\s*"copyright":\\s*null\\s*,\\s*\\r?\\n\\s*"url":\\s*"${urlRe}")`,
        "g"
      ),
      `"alt": "${esc}"$1`
    );
    out = out.replace(
      new RegExp(
        `"alt":\\s*"[^"]*"(\\s*,\\s*\\r?\\n\\s*"copyright":\\s*null\\s*,\\s*\\r?\\n\\s*"url":\\s*"${urlRe}")`,
        "g"
      ),
      `"alt": "${esc}"$1`
    );
  }
  return out;
}

for (const rel of FILES) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    console.warn("skip missing", rel);
    continue;
  }
  const before = fs.readFileSync(abs, "utf8");
  const after = patchContent(before);
  if (after !== before) {
    fs.writeFileSync(abs, after);
    console.log("updated", rel);
  } else {
    console.log("unchanged", rel);
  }
}

console.log("done; ids in catalog:", byId.size);
