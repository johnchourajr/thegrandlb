import {
  checkDatabaseHealth,
  checkEmailHealth,
} from "@/services/health-checks";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Check both email and database health directly (no HTTP overhead)
    const [emailHealth, databaseHealth] = await Promise.all([
      checkEmailHealth(),
      checkDatabaseHealth(),
    ]);

    const overallStatus =
      emailHealth.status === "healthy" && databaseHealth.status === "healthy"
        ? "healthy"
        : "unhealthy";

    const responseTime = Date.now() - startTime;
    const httpStatus = overallStatus === "healthy" ? 200 : 503;

    return new Response(
      JSON.stringify({
        status: overallStatus,
        timestamp: new Date().toISOString(),
        responseTime,
        services: {
          email: emailHealth,
          database: databaseHealth,
        },
        summary: {
          healthy: [emailHealth, databaseHealth].filter(
            (s) => s.status === "healthy"
          ).length,
          total: 2,
        },
      }),
      {
        status: httpStatus,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        responseTime: Date.now() - startTime,
        error:
          error instanceof Error ? error.message : "Unknown health check error",
        services: {
          email: { status: "unhealthy", error: "Health check failed" },
          database: { status: "unhealthy", error: "Health check failed" },
        },
      }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
