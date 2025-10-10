import { Pool } from "pg";

const connectionString = process.env.NEXT_DATABASE_URL;

if (!connectionString) {
  console.error("NEXT_DATABASE_URL environment variable is not set");
}

/**
 * PostgreSQL connection pool for serverless environments
 *
 * Using Pool instead of Client provides:
 * - Automatic connection management
 * - Connection reuse across requests
 * - Automatic reconnection on connection loss
 * - Better performance in serverless/edge functions
 */
const pool = new Pool({
  connectionString,
  // Serverless-optimized configuration
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // Timeout if connection takes longer than 10 seconds
  // Allow the pool to gracefully handle connection errors
  allowExitOnIdle: true, // Important for serverless - allows process to exit when idle
});

// Handle pool errors to prevent crashes
pool.on("error", (err) => {
  console.error("Unexpected database pool error:", err);
});

// Helper to check pool health
export async function checkConnection(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    return true;
  } catch (error) {
    console.error("Database connection check failed:", error);
    return false;
  }
}

// Graceful shutdown helper (useful for local development)
export async function closePool(): Promise<void> {
  await pool.end();
}

export default pool;
