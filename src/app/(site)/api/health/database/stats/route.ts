import type { NextRequest } from "next/server";
import pool from "../../../../../../services/db";

/**
 * Database Pool Statistics Endpoint
 *
 * Provides detailed metrics about the connection pool for monitoring and debugging.
 * Useful for identifying connection exhaustion, slow queries, and other pool-related issues.
 *
 * GET /api/health/database/stats
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Get pool statistics
    const stats = {
      status: "healthy",
      service: "database_pool",
      timestamp: new Date().toISOString(),
      responseTime: Date.now() - startTime,
      pool: {
        // Total number of clients in the pool (active + idle)
        totalCount: pool.totalCount,

        // Number of clients currently idle and available
        idleCount: pool.idleCount,

        // Number of queued requests waiting for a client
        waitingCount: pool.waitingCount,

        // Pool configuration
        config: {
          max: 10,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 10000,
        },

        // Calculate utilization percentage
        utilization:
          pool.totalCount > 0
            ? Math.round(((pool.totalCount - pool.idleCount) / 10) * 100)
            : 0,
      },
      // Health indicators
      health: {
        hasIdleConnections: pool.idleCount > 0,
        hasWaitingClients: pool.waitingCount > 0,
        isNearCapacity: pool.totalCount >= 8, // 80% capacity
        recommendation:
          pool.totalCount >= 8
            ? "Pool is near capacity - consider reviewing slow queries"
            : pool.waitingCount > 0
            ? "Clients are waiting for connections - pool may be exhausted"
            : "Pool is healthy",
      },
    };

    return new Response(JSON.stringify(stats, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "error",
        service: "database_pool",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
        responseTime: Date.now() - startTime,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
