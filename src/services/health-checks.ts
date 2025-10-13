import { checkConnection } from "./db";

export type HealthCheckResult = {
  status: "healthy" | "unhealthy";
  service: string;
  error?: string;
  timestamp: string;
  responseTime: number;
  note?: string;
};

/**
 * Check email service health
 * Validates environment variables and Resend API key format
 */
export async function checkEmailHealth(): Promise<HealthCheckResult> {
  const startTime = Date.now();

  try {
    // Check required environment variables
    const requiredEnvVars = [
      "NEXT_RESEND_API_KEY",
      "NEXT_PUBLIC_RESEND_FROM_EMAIL",
      "NEXT_PUBLIC_RESEND_SALES_EMAIL",
    ];

    const missingVars = requiredEnvVars.filter(
      (varName) => !process.env[varName]
    );

    if (missingVars.length > 0) {
      return {
        status: "unhealthy",
        service: "email",
        error: `Missing environment variables: ${missingVars.join(", ")}`,
        timestamp: new Date().toISOString(),
        responseTime: Date.now() - startTime,
      };
    }

    // Test Resend API connectivity (without sending an actual email)
    const apiKey = process.env.NEXT_RESEND_API_KEY;
    if (!apiKey || !apiKey.startsWith("re_")) {
      return {
        status: "unhealthy",
        service: "email",
        error: "Invalid Resend API key format",
        timestamp: new Date().toISOString(),
        responseTime: Date.now() - startTime,
      };
    }

    return {
      status: "healthy",
      service: "email",
      timestamp: new Date().toISOString(),
      responseTime: Date.now() - startTime,
      note: "Environment variables validated - actual email service availability not tested to avoid sending test emails",
    };
  } catch (error) {
    return {
      status: "unhealthy",
      service: "email",
      error:
        error instanceof Error
          ? error.message
          : "Unknown email service error",
      timestamp: new Date().toISOString(),
      responseTime: Date.now() - startTime,
    };
  }
}

/**
 * Check database health
 * Tests actual PostgreSQL connection pool connectivity
 */
export async function checkDatabaseHealth(): Promise<HealthCheckResult> {
  const startTime = Date.now();

  try {
    // Check database pool health
    const isHealthy = await checkConnection();

    if (!isHealthy) {
      return {
        status: "unhealthy",
        service: "database",
        error: "Database connection failed",
        timestamp: new Date().toISOString(),
        responseTime: Date.now() - startTime,
      };
    }

    return {
      status: "healthy",
      service: "database",
      timestamp: new Date().toISOString(),
      responseTime: Date.now() - startTime,
    };
  } catch (error) {
    return {
      status: "unhealthy",
      service: "database",
      error:
        error instanceof Error ? error.message : "Unknown database error",
      timestamp: new Date().toISOString(),
      responseTime: Date.now() - startTime,
    };
  }
}

