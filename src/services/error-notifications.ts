import ErrorNotificationEmail from "@/emails/errorNotificationEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
const fromEmail = "hello+critical@thegrandlb.com";
const alertEmail = "hi+critical@john.design";
const isNotProduction = process.env.NODE_ENV !== "production";

type ErrorContext = {
  service: "email" | "database" | "general";
  endpoint: string;
  error: Error | unknown;
  metadata?: Record<string, any>;
  timestamp?: Date;
};

type AlertThrottleEntry = {
  lastSent: Date;
  count: number;
};

// Simple in-memory throttling (resets on server restart)
const alertThrottle = new Map<string, AlertThrottleEntry>();

// Throttle alerts: max 1 per hour for same error type
const THROTTLE_MINUTES = 60;

class ErrorNotificationService {
  private shouldSendAlert(errorKey: string): boolean {
    const now = new Date();
    const existing = alertThrottle.get(errorKey);

    if (!existing) {
      alertThrottle.set(errorKey, { lastSent: now, count: 1 });
      return true;
    }

    const minutesSinceLastAlert =
      (now.getTime() - existing.lastSent.getTime()) / (1000 * 60);

    if (minutesSinceLastAlert >= THROTTLE_MINUTES) {
      alertThrottle.set(errorKey, { lastSent: now, count: existing.count + 1 });
      return true;
    }

    // Update count but don't send
    existing.count += 1;
    return false;
  }

  private createErrorKey(context: ErrorContext): string {
    const errorMessage =
      context.error instanceof Error
        ? context.error.message
        : String(context.error);
    return `${context.service}-${context.endpoint}-${errorMessage.substring(
      0,
      50
    )}`;
  }

  private formatErrorForEmail(context: ErrorContext): {
    subject: string;
    react: JSX.Element;
  } {
    const testPrefix = isNotProduction ? "[TEST] " : "[PROD] ";
    const errorMessage =
      context.error instanceof Error
        ? context.error.message
        : String(context.error);
    const errorStack =
      context.error instanceof Error ? context.error.stack : undefined;

    const subject = `${testPrefix}🚨 ${context.service.toUpperCase()} Error - ${
      context.endpoint
    }`;

    const errorKey = this.createErrorKey(context);
    const throttleData = alertThrottle.get(errorKey);

    const react = ErrorNotificationEmail({
      service: context.service,
      endpoint: context.endpoint,
      errorMessage,
      errorStack,
      timestamp: (context.timestamp || new Date()).toISOString(),
      environment: isNotProduction ? "development" : "production",
      metadata: context.metadata,
      throttleInfo: throttleData
        ? {
            count: throttleData.count,
            isThrottled: false, // We only call this if we're sending
          }
        : undefined,
    });

    return { subject, react };
  }

  async sendErrorAlert(context: ErrorContext): Promise<void> {
    try {
      // Check if required env vars exist
      if (!process.env.NEXT_RESEND_API_KEY || !fromEmail) {
        console.warn(
          "Error notification service not configured - missing Resend API key or from email"
        );
        return;
      }

      const errorKey = this.createErrorKey(context);

      if (!this.shouldSendAlert(errorKey)) {
        console.log(`Error alert throttled for: ${errorKey}`);
        return;
      }

      const emailContent = this.formatErrorForEmail(context);

      await resend.emails.send({
        from: fromEmail,
        to: [alertEmail],
        subject: emailContent.subject,
        react: emailContent.react,
      });

      console.log(
        `Error alert sent for: ${context.service} - ${context.endpoint}`
      );
    } catch (notificationError) {
      // Don't let notification errors break the main flow
      console.error("Failed to send error notification:", notificationError);
    }
  }

  // Utility method for common error scenarios
  async notifyApiError(
    service: "email" | "database" | "general",
    endpoint: string,
    error: Error | unknown,
    metadata?: Record<string, any>
  ): Promise<void> {
    await this.sendErrorAlert({
      service,
      endpoint,
      error,
      metadata,
      timestamp: new Date(),
    });
  }

  // Get throttle stats (for debugging)
  getThrottleStats(): Array<{
    errorKey: string;
    lastSent: Date;
    count: number;
  }> {
    return Array.from(alertThrottle.entries()).map(([errorKey, entry]) => ({
      errorKey,
      lastSent: entry.lastSent,
      count: entry.count,
    }));
  }
}

export default new ErrorNotificationService();
