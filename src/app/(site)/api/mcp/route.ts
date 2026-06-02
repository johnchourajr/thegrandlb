import type { NextRequest } from "next/server";
import { SITE_ORIGIN, venueInfo } from "@/lib/agent/site-info";

const PROTOCOL_VERSION = "2024-11-05";

const TOOLS = [
  {
    name: "get_venue_info",
    description:
      "Get core facts about The Grand LB event venue: spaces, capacities, location, parking, accessibility, and contact details.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "list_event_types",
    description: "List the kinds of events The Grand LB hosts.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "list_menus",
    description: "List the catering menus available at The Grand LB.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
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
  },
  {
    name: "get_inquiry_info",
    description:
      "Get instructions for booking or inquiring about an event at The Grand LB.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
];

async function callTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case "get_venue_info":
      return {
        name: venueInfo.legalName,
        tagline: venueInfo.tagline,
        address: venueInfo.address,
        phone: venueInfo.phone,
        spaces: venueInfo.spaces,
        keyDetails: venueInfo.keyDetails,
        catering: venueInfo.catering.summary,
      };
    case "list_event_types":
      return venueInfo.eventTypes;
    case "list_menus": {
      const res = await fetch(`${SITE_ORIGIN}/api/menus`, {
        headers: { Accept: "application/json" },
      });
      return await res.json();
    }
    case "get_menu": {
      const uid = String(args.uid ?? "");
      const res = await fetch(
        `${SITE_ORIGIN}/api/menus/${encodeURIComponent(uid)}`,
        { headers: { Accept: "application/json" } },
      );
      return await res.json();
    }
    case "get_inquiry_info":
      return {
        inquiryUrl: `${SITE_ORIGIN}/inquire`,
        phone: venueInfo.phone,
        note: "Submit the inquiry form or call. The sales team typically responds within 2–3 business days.",
      };
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

function ok(id: unknown, result: unknown) {
  return Response.json({ jsonrpc: "2.0", id, result }, {
    headers: corsHeaders(),
  });
}

function err(id: unknown, code: number, message: string) {
  return Response.json({ jsonrpc: "2.0", id, error: { code, message } }, {
    headers: corsHeaders(),
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return err(null, -32700, "Parse error");
  }

  const req = body as Record<string, unknown>;
  const { id, method, params } = req;

  switch (method) {
    case "initialize":
      return ok(id, {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: { tools: {} },
        serverInfo: { name: "The Grand LB", version: "1.0.0" },
      });

    case "notifications/initialized":
      return new Response(null, { status: 204, headers: corsHeaders() });

    case "tools/list":
      return ok(id, { tools: TOOLS });

    case "tools/call": {
      const p = (params ?? {}) as Record<string, unknown>;
      const toolName = String(p.name ?? "");
      const toolArgs = (p.arguments ?? {}) as Record<string, unknown>;
      try {
        const result = await callTool(toolName, toolArgs);
        return ok(id, {
          content: [
            {
              type: "text",
              text:
                typeof result === "string"
                  ? result
                  : JSON.stringify(result, null, 2),
            },
          ],
        });
      } catch (e) {
        return err(id, -32602, e instanceof Error ? e.message : "Tool error");
      }
    }

    case "ping":
      return ok(id, {});

    default:
      return err(id, -32601, "Method not found");
  }
}
