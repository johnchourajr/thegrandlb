"use client";

import { SITE_ORIGIN, venueInfo } from "@/lib/agent/site-info";
import { useEffect } from "react";

/**
 * Progressive-enhancement WebMCP integration. When a browser/agent exposes
 * `navigator.modelContext` (https://webmachinelearning.github.io/webmcp/), we
 * register read-only tools that surface the venue's public information. The
 * feature is detected at runtime, so unsupported browsers are unaffected.
 */

type McpToolResult = { content: Array<{ type: "text"; text: string }> };

type McpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<McpToolResult>;
};

type ModelContext = {
  provideContext: (context: { tools: McpTool[] }) => void;
};

function text(value: unknown): McpToolResult {
  return {
    content: [
      {
        type: "text",
        text: typeof value === "string" ? value : JSON.stringify(value, null, 2),
      },
    ],
  };
}

const tools: McpTool[] = [
  {
    name: "get_venue_info",
    description:
      "Get core facts about The Grand LB event venue: spaces, capacities, location, parking, accessibility, and contact details.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    execute: async () =>
      text({
        name: venueInfo.legalName,
        tagline: venueInfo.tagline,
        address: venueInfo.address,
        phone: venueInfo.phone,
        spaces: venueInfo.spaces,
        keyDetails: venueInfo.keyDetails,
        catering: venueInfo.catering.summary,
      }),
  },
  {
    name: "list_event_types",
    description: "List the kinds of events The Grand LB hosts.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    execute: async () => text(venueInfo.eventTypes),
  },
  {
    name: "list_menus",
    description: "List the catering menus available at The Grand LB.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    execute: async () => {
      const res = await fetch(`${SITE_ORIGIN}/api/menus`, {
        headers: { Accept: "application/json" },
      });
      return text(await res.json());
    },
  },
  {
    name: "get_menu",
    description:
      "Get the full content of one catering menu (groups, items, per-person pricing).",
    inputSchema: {
      type: "object",
      properties: {
        uid: {
          type: "string",
          enum: [...venueInfo.catering.menuUids],
          description: "Which menu to fetch.",
        },
      },
      required: ["uid"],
      additionalProperties: false,
    },
    execute: async (args) => {
      const uid = String(args.uid ?? "");
      const res = await fetch(`${SITE_ORIGIN}/api/menus/${encodeURIComponent(uid)}`, {
        headers: { Accept: "application/json" },
      });
      return text(await res.json());
    },
  },
  {
    name: "get_inquiry_info",
    description:
      "Get instructions for booking or inquiring about an event at The Grand LB.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    execute: async () =>
      text({
        inquiryUrl: `${SITE_ORIGIN}/inquire`,
        phone: venueInfo.phone,
        note: "Submit the inquiry form or call. The sales team typically responds within 2–3 business days.",
      }),
  },
];

export default function WebMcp() {
  useEffect(() => {
    try {
      const mc = (navigator as Navigator & { modelContext?: ModelContext })
        .modelContext;
      if (mc && typeof mc.provideContext === "function") {
        mc.provideContext({ tools });
      }
    } catch {
      // WebMCP not available or registration failed — no-op.
    }
  }, []);

  return null;
}
