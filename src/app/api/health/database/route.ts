import type { NextRequest } from "next/server";
import db, { isConnected } from "../../../../services/db";

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Check if database connection is available
    if (!isConnected) {
      return new Response(
        JSON.stringify({
          status: "unhealthy",
          service: "database",
          error: "Database not connected",
          timestamp: new Date().toISOString(),
          responseTime: Date.now() - startTime,
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Try a simple query to verify the database is actually working
    await db.query("SELECT 1");

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
