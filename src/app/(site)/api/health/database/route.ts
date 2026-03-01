import errorNotificationService from "@/services/error-notifications";
import { checkDatabaseHealth } from "@/services/health-checks";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const result = await checkDatabaseHealth();

  if (result.status === "unhealthy") {
    await errorNotificationService.notifyApiError(
      "database",
      "/api/health/database",
      new Error(result.error ?? "Database unhealthy"),
      { endpoint: "health/database", serviceResult: result }
    );
  }

  const httpStatus = result.status === "healthy" ? 200 : 503;

  return new Response(JSON.stringify(result), {
    status: httpStatus,
    headers: { "Content-Type": "application/json" },
  });
}
