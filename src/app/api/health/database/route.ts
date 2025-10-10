import type { NextRequest } from "next/server";
import { checkConnection } from "../../../../services/db";

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Check database pool health
    const isHealthy = await checkConnection();

    if (!isHealthy) {
      return new Response(
        JSON.stringify({
          status: "unhealthy",
          service: "database",
          error: "Database connection failed",
          timestamp: new Date().toISOString(),
          responseTime: Date.now() - startTime,
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        status: "healthy",
        service: "database",
        timestamp: new Date().toISOString(),
        responseTime: Date.now() - startTime,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "unhealthy",
        service: "database",
        error:
          error instanceof Error ? error.message : "Unknown database error",
        timestamp: new Date().toISOString(),
        responseTime: Date.now() - startTime,
      }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
