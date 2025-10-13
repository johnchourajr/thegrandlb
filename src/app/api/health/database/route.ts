import { checkDatabaseHealth } from "@/services/health-checks";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const result = await checkDatabaseHealth();

  const httpStatus = result.status === "healthy" ? 200 : 503;

  return new Response(JSON.stringify(result), {
    status: httpStatus,
    headers: { "Content-Type": "application/json" },
  });
}
