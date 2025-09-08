import type { NextRequest } from "next/server";

type HealthCheckResult = {
  status: "healthy" | "unhealthy";
  service: string;
  error?: string;
  timestamp: string;
  responseTime: number;
  note?: string;
};

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const baseUrl = request.nextUrl.origin;

  try {
    // Check both email and database health
    const [emailResponse, databaseResponse] = await Promise.allSettled([
      fetch(`${baseUrl}/api/health/email`),
      fetch(`${baseUrl}/api/health/database`),
    ]);

    const emailHealth: HealthCheckResult =
      emailResponse.status === "fulfilled" && emailResponse.value.ok
        ? await emailResponse.value.json()
        : {
            status: "unhealthy",
            service: "email",
            error:
              emailResponse.status === "rejected"
                ? emailResponse.reason?.message
                : "HTTP error",
            timestamp: new Date().toISOString(),
            responseTime: 0,
          };

    const databaseHealth: HealthCheckResult =
      databaseResponse.status === "fulfilled" && databaseResponse.value.ok
        ? await databaseResponse.value.json()
        : {
            status: "unhealthy",
            service: "database",
            error:
              databaseResponse.status === "rejected"
                ? databaseResponse.reason?.message
                : "HTTP error",
            timestamp: new Date().toISOString(),
            responseTime: 0,
          };

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
