import { faqPage } from "@/app/(site)/faq/content";
import { fetchMenuCollection } from "@/services/menu-data";
import type { RtBlock } from "content/types";
import { menuCollectionToMarkdown } from "./menu-markdown";
import { richTextToPlain } from "./rich-text-to-markdown";
import { SITE_ORIGIN, sitePages, venueInfo } from "./site-info";

const MENU_UIDS = venueInfo.catering.menuUids;

function htmlNote(path: string): string {
  return `\n\n---\n\n_This is a Markdown rendering for agents. The full page is at ${SITE_ORIGIN}${path}._\n`;
}

function siteOverviewMarkdown(): string {
  const v = venueInfo;
  const out: string[] = [];
  out.push(`# ${v.legalName} (${v.name})`);
  out.push(`> ${v.tagline}`);
  out.push(
    `${v.legalName} is a full-service event venue operated by ${v.operator}. Located at ${v.address.street}, ${v.address.city}, ${v.address.state} ${v.address.postalCode}. Phone: ${v.phone}.`,
  );

  out.push("## Venue Spaces");
  out.push(
    v.spaces.map((s) => `- **${s.name}** — ${s.capacity}. ${s.description}`).join("\n"),
  );

  out.push("## Events Hosted");
  out.push(v.eventTypes.join(", ") + ".");

  out.push("## Catering");
  out.push(v.catering.summary);
  out.push(v.catering.dietary);

  out.push("## Key Details");
  out.push(v.keyDetails.map((d) => `- ${d}`).join("\n"));

  out.push("## Pages");
  out.push(
    sitePages.map((p) => `- [${p.title}](${SITE_ORIGIN}${p.path}) — ${p.description}`).join("\n"),
  );

  out.push("## For agents");
  out.push(
    [
      `- API catalog: ${SITE_ORIGIN}/.well-known/api-catalog`,
      `- OpenAPI: ${SITE_ORIGIN}/.well-known/openapi.json`,
      `- Agent skills: ${SITE_ORIGIN}/.well-known/agent-skills/index.json`,
      `- Menus (JSON): ${SITE_ORIGIN}/api/menus`,
      `- Send \`Accept: text/markdown\` to any page on this site for a Markdown rendering.`,
    ].join("\n"),
  );

  return out.join("\n\n") + "\n";
}

function faqMarkdown(): string {
  const out: string[] = ["# Frequently Asked Questions"];
  const caption = faqPage.data.caption;
  if (caption) out.push(caption);

  type FaqItem = { question: RtBlock[]; answer: RtBlock[] };
  type FaqSlice = { type?: string; title?: string; items?: FaqItem[] };

  for (const slice of faqPage.data.slices as FaqSlice[]) {
    if (slice.type !== "faq_section") continue;
    if (slice.title) out.push(`## ${slice.title}`);
    for (const item of slice.items ?? []) {
      const q = richTextToPlain(item.question);
      const a = richTextToPlain(item.answer);
      if (q) out.push(`### ${q}\n\n${a}`);
    }
  }
  return out.join("\n\n") + "\n";
}

function menusIndexMarkdown(): string {
  const out: string[] = ["# Catering Menus"];
  out.push(venueInfo.catering.summary);
  out.push(venueInfo.catering.dietary);
  out.push(
    MENU_UIDS.map(
      (uid) =>
        `- **${uid.charAt(0).toUpperCase() + uid.slice(1)}** — ${SITE_ORIGIN}/menus/${uid} (JSON: ${SITE_ORIGIN}/api/menus/${uid})`,
    ).join("\n"),
  );
  return out.join("\n\n") + "\n";
}

function genericPageMarkdown(path: string): string | null {
  const page = sitePages.find((p) => p.path === path);
  if (!page) return null;
  const v = venueInfo;
  const out: string[] = [`# ${page.title} — ${v.name}`, page.description];

  if (path === "/contact" || path === "/inquire") {
    out.push(
      `To book or inquire about an event, call ${v.phone} or submit the inquiry form at ${SITE_ORIGIN}/inquire. The sales team typically responds within 2–3 business days.`,
    );
    out.push(
      `Address: ${v.address.street}, ${v.address.city}, ${v.address.state} ${v.address.postalCode}.`,
    );
  }
  if (path === "/tour") {
    out.push("## Spaces");
    out.push(v.spaces.map((s) => `- **${s.name}** — ${s.capacity}. ${s.description}`).join("\n"));
  }
  if (path === "/events") {
    out.push("## Events Hosted");
    out.push(v.eventTypes.join(", ") + ".");
  }
  return out.join("\n\n");
}

/**
 * Build a Markdown rendering for a site path, or return null if the path is
 * not supported (the caller should then fall through to HTML).
 */
export async function buildPageMarkdown(pathname: string): Promise<string | null> {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;

  if (path === "" || path === "/") return siteOverviewMarkdown() + htmlNote("/");
  if (path === "/faq") return faqMarkdown() + htmlNote("/faq");
  if (path === "/menus") return menusIndexMarkdown() + htmlNote("/menus");

  const menuMatch = path.match(/^\/menus\/([a-z0-9-]+)$/);
  if (menuMatch && (MENU_UIDS as readonly string[]).includes(menuMatch[1])) {
    try {
      const doc = await fetchMenuCollection(menuMatch[1]);
      return menuCollectionToMarkdown(doc) + htmlNote(path);
    } catch {
      return null;
    }
  }

  const generic = genericPageMarkdown(path);
  if (generic) return generic + htmlNote(path);

  return null;
}

export { isMarkdownSupportedPath } from "./markdown-paths";
