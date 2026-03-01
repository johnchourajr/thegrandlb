const workflowUrl = process.env.RETOOL_NOBUENO_WORKFLOW_URL ?? "";
const workflowApiKey = process.env.RETOOL_NOBUENO_WORKFLOW_API_KEY ?? "";
const isNotProduction = process.env.NODE_ENV !== "production";

type ErrorContext = {
  service: "email" | "database" | "general";
  endpoint: string;
  error: Error | unknown;
  metadata?: Record<string, unknown>;
  timestamp?: Date;
};

type AlertThrottleEntry = {
  lastSent: Date;
  count: number;
};

const alertThrottle = new Map<string, AlertThrottleEntry>();
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

  async sendErrorAlert(context: ErrorContext): Promise<void> {
    try {
      if (!workflowUrl || !workflowApiKey) {
        console.warn(
          "Error notification not configured - missing RETOOL_NOBUENO_WORKFLOW_URL or RETOOL_NOBUENO_WORKFLOW_API_KEY"
        );
        return;
      }

      const errorKey = this.createErrorKey(context);
      if (!this.shouldSendAlert(errorKey)) {
        console.log(`Error alert throttled for: ${errorKey}`);
        return;
      }

      const errorMessage =
        context.error instanceof Error
          ? context.error.message
          : String(context.error);
      const stack =
        context.error instanceof Error ? context.error.stack : undefined;

      const isCritical =
        context.metadata &&
        (context.metadata as Record<string, unknown>).inquiryFormEmails === true;
      const level = isCritical ? "critical" : "error";

      const payload = {
        service: context.service,
        endpoint: context.endpoint,
        level,
        message: errorMessage,
        stack: stack ?? null,
        environment: isNotProduction ? "development" : "production",
        metadata: context.metadata ?? {},
        occurred_at: (context.timestamp ?? new Date()).toISOString(),
      };

      const res = await fetch(workflowUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Workflow-Api-Key": workflowApiKey,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error(
          `Retool workflow error (${res.status}):`,
          text.slice(0, 500)
        );
        return;
      }

      console.log(
        `Error alert sent to Retool for: ${context.service} - ${context.endpoint}`
      );
    } catch (err) {
      console.error("Failed to send error notification:", err);
    }
  }

  async notifyApiError(
    service: "email" | "database" | "general",
    endpoint: string,
    error: Error | unknown,
    metadata?: Record<string, unknown>
  ): Promise<void> {
    await this.sendErrorAlert({
      service,
      endpoint,
      error,
      metadata,
      timestamp: new Date(),
    });
  }

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

const errorNotificationService = new ErrorNotificationService();
export default errorNotificationService;
