import errorNotificationService from "@/services/error-notifications";
import { checkEmailHealth } from "@/services/health-checks";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const result = await checkEmailHealth();

  if (result.status === "unhealthy") {
    await errorNotificationService.notifyApiError(
      "email",
      "/api/health/email",
      new Error(result.error ?? "Email unhealthy"),
      { endpoint: "health/email", serviceResult: result }
    );
  }

  const httpStatus = result.status === "healthy" ? 200 : 503;

  return new Response(JSON.stringify(result), {
    status: httpStatus,
    headers: { "Content-Type": "application/json" },
  });
}
