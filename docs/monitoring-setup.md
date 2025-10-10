# API Monitoring & Error Notifications

This document outlines the low-fi monitoring system implemented for critical API routes at The Grand LB.

## Overview

The monitoring system provides:

- Automatic error notifications via email alerts
- Health check endpoints for external monitoring
- Throttled notifications to prevent spam
- Rich error context and debugging information

## Components

### 1. Error Notification Service

- **Location**: `/src/services/error-notifications.ts`
- **Purpose**: Central service for sending error alerts via email
- **Features**:
  - Email alerts using existing Resend setup
  - Smart throttling (max 1 alert per hour per error type)
  - Rich HTML email templates with error context
  - Automatic retry tracking

### 2. Error Email Template

- **Location**: `/src/emails/errorNotificationEmail.tsx`
- **Purpose**: Clean, Sentry-style email template for error alerts
- **Features**:
  - React Email components with minimal styling
  - Simple, professional layout similar to Sentry alerts
  - Essential error information with stack traces
  - Compact format for quick scanning

### 3. Health Check Endpoints

- **Base URL**: `/api/health`
- **Individual Services**:
  - `/api/health/email` - Email service health
  - `/api/health/database` - Database pool connectivity
  - `/api/health/database/stats` - Database pool statistics (detailed metrics)
  - `/api/health` - Combined system health

**Database Health Check Details:**

- Uses PostgreSQL connection pool (pg.Pool)
- Tests actual query execution (SELECT 1)
- Checks connection acquisition from pool
- Returns response time for monitoring
- Automatically handles connection cleanup

**Database Pool Stats Endpoint:**

```bash
GET /api/health/database/stats
```

Returns detailed pool metrics:

```json
{
  "status": "healthy",
  "pool": {
    "totalCount": 2,
    "idleCount": 1,
    "waitingCount": 0,
    "utilization": 10,
    "config": {
      "max": 10,
      "idleTimeoutMillis": 30000,
      "connectionTimeoutMillis": 10000
    }
  },
  "health": {
    "hasIdleConnections": true,
    "hasWaitingClients": false,
    "isNearCapacity": false,
    "recommendation": "Pool is healthy"
  }
}
```

### 4. Test Endpoint (Development Only)

- **Location**: `/api/test-error-notification`
- **Purpose**: Test error notifications in development environment
- **Methods**: GET (info), POST (send test alert)

## Configuration

### Required Environment Variables

#### Existing (already configured)

```bash
NEXT_RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_RESEND_FROM_EMAIL=your_from_email
NEXT_DATABASE_URL=your_database_connection_string
```

#### Alert Configuration

Error alerts are automatically sent to: **`hi+critical@john.design`**

This is hardcoded in the error notification service and doesn't require any environment variable configuration.

### Monitored API Routes

The following critical API routes now include automatic error notifications:

1. **`/api/send-client-email`** - Email sending service

   - Missing configuration errors
   - Email delivery failures
   - Resend API errors

2. **`/api/add-to-database`** - Database insertion service
   - Connection pool errors
   - Query execution failures
   - Transaction timeouts
   - Missing database configuration
   - **Enhanced Error Context**: Includes pool stats at error time

**Database Connection Pool:**

- **Type**: PostgreSQL Pool (pg.Pool)
- **Max Connections**: 10
- **Idle Timeout**: 30 seconds
- **Connection Timeout**: 10 seconds
- **Serverless Optimized**: Yes (allowExitOnIdle: true)
- **Automatic Monitoring**: Pool stats included in all error notifications

## Usage

### Automatic Notifications

Error notifications are automatically sent when:

- Configuration is missing (env vars)
- Email sending fails
- Database operations fail
- Service connectivity issues occur

### Manual Testing

#### Health Check Testing

```bash
# Check overall system health
curl https://yourdomain.com/api/health

# Check email service specifically
curl https://yourdomain.com/api/health/email

# Check database connectivity
curl https://yourdomain.com/api/health/database

# Check detailed database pool statistics
curl https://yourdomain.com/api/health/database/stats
```

#### Interpreting Pool Statistics

**Key Metrics:**

- `totalCount`: Total active connections (should be < 10)
- `idleCount`: Available connections (should be > 0 during normal operation)
- `waitingCount`: Queued requests (should be 0; if >0, pool is exhausted)
- `utilization`: Percentage of pool in use (80%+ indicates high load)

**Warning Signs:**

- `waitingCount > 0`: Pool exhausted, queries queued
- `totalCount === 10`: All connections in use
- `utilization > 80%`: Near capacity, investigate slow queries
- `idleCount === 0`: No available connections

#### Error Notification Testing (Development Only)

```bash
# Test basic error notification
curl -X POST http://localhost:3000/api/test-error-notification \
  -H "Content-Type: application/json" \
  -d '{}'

# Test with specific service and message
curl -X POST http://localhost:3000/api/test-error-notification \
  -H "Content-Type: application/json" \
  -d '{"service": "email", "errorType": "smtp", "message": "SMTP connection failed"}'

# Get test endpoint info
curl http://localhost:3000/api/test-error-notification
```

### Expected Response Format

```json
{
  "status": "healthy" | "unhealthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "responseTime": 123,
  "services": {
    "email": {
      "status": "healthy",
      "service": "email",
      "timestamp": "2024-01-01T00:00:00.000Z",
      "responseTime": 45
    },
    "database": {
      "status": "healthy",
      "service": "database",
      "timestamp": "2024-01-01T00:00:00.000Z",
      "responseTime": 78
    }
  }
}
```

## External Monitoring Integration

### Recommended Services

- **UptimeRobot** (free tier available)
- **Pingdom**
- **StatusCake**
- **New Relic Synthetics**

### Setup Instructions

1. **Create monitors** for each health check endpoint:

   - `https://yourdomain.com/api/health/email`
   - `https://yourdomain.com/api/health/database`
   - `https://yourdomain.com/api/health` (overall)

2. **Configure checks**:

   - Interval: Every 5-10 minutes
   - Timeout: 30 seconds
   - Expected status: 200 OK
   - Expected content: `"status":"healthy"`

3. **Alert rules**:
   - Alert after 2-3 failed checks
   - Send to appropriate team channels/emails

## Alert Throttling

- **Frequency**: Maximum 1 alert per hour for the same error type
- **Reset**: Throttle resets on server restart
- **Logic**: Based on service + endpoint + error message (first 50 chars)

## Troubleshooting

### No Alerts Received

1. **Check environment variables**:

   ```bash
   curl https://yourdomain.com/api/debug-env
   ```

2. **Verify Resend configuration**:

   - API key is valid (`re_` prefix)
   - From email is configured
   - Alerts are sent to: `hi+critical@john.design`

3. **Check logs** for error notification failures

4. **Check throttling**: Alerts are limited to 1 per hour per error type

### Health Checks Failing

1. **Email service**: Verify Resend API key and configuration
2. **Database**: Check connection string and network connectivity
3. **Overall**: Check if individual services are healthy

### Database Connection Issues

Common issues and solutions:

**Connection Timeout Errors:**

- ✅ **Fixed (2024-01)**: Migrated from single Client to connection Pool
- Pool automatically handles stale connections in serverless environments
- Max 10 concurrent connections with auto-reconnection

**Symptoms to watch for:**

```
Error: Connection timeout
Error connecting to the database
Unexpected database pool error
```

**Diagnostic steps:**

1. Check health endpoint: `curl https://yourdomain.com/api/health/database`
2. Check pool statistics: `curl https://yourdomain.com/api/health/database/stats`
3. Review error notification emails for patterns (now includes pool stats)
4. Check database provider dashboard for connection limits
5. Verify `NEXT_DATABASE_URL` is correctly set
6. Look for slow queries that hold connections too long

**Pool-specific issues:**

- **Pool exhausted**: If all 10 connections are in use (rare in normal traffic)
  - Solution: Review slow queries or increase `max` connections
- **Idle timeout**: Connections close after 30s idle (expected behavior)
- **Connection timeout**: If acquiring connection takes >10s
  - Solution: Check database availability and network latency

### Spam Prevention

- Alerts are throttled automatically
- Max 1 email per hour per error type
- Consider additional filtering if needed

## Monitoring Dashboard & Visibility

### Current Visibility

**Error Notifications (Email):**

- Sent to: `hi+critical@john.design`
- Throttled to 1 per hour per error type
- Includes full stack traces and metadata
- Shows environment (production/development)
- **Database errors include pool stats**: totalCount, idleCount, waitingCount, utilization

**Database Pool Monitoring:**

```typescript
// Available in /src/services/db.ts
import pool, { checkConnection } from "@/services/db";

// Pool automatically tracks:
// - Active connections
// - Idle connections
// - Total connections
// - Waiting clients
```

**Manual Pool Stats (Development):**

```javascript
// In your route or component
console.log("Pool stats:", {
  totalCount: pool.totalCount,
  idleCount: pool.idleCount,
  waitingCount: pool.waitingCount,
});
```

### Recommended External Monitoring

**1. UptimeRobot (Free tier: 50 monitors)**

- Monitor health endpoints every 5 minutes
- Alert on 2+ consecutive failures
- SMS/Email/Slack notifications

**2. Database Provider Monitoring**

- Most providers (Supabase, Neon, Heroku) have built-in metrics
- Track connection count, query performance, errors

**3. Netlify/Vercel Logs**

- Review function logs for patterns
- Set up log drains to external services

### Future Enhancements

Consider implementing:

- **Real-time error dashboard** (e.g., Grafana, DataDog)
- **Slack/Discord webhook notifications** for critical errors
- **Custom alerting rules** (e.g., >10 errors in 5 minutes)
- **Historical error tracking** with database storage
- **Performance metrics** (response times, query duration)
- **Database pool metrics endpoint** at `/api/health/database/stats`

## Maintenance

### Regular Tasks

- Monitor alert frequency and adjust throttling if needed
- Review error patterns monthly
- Update external monitoring service configurations
- Test health check endpoints during deployments

### Updates

- When adding new critical API routes, integrate with `errorNotificationService`
- Update this documentation when making changes
- Test notification system after major deployments

## Cost Considerations

- **Resend**: Email alerts use your existing Resend quota
- **External monitoring**: Most services have free tiers (UptimeRobot: 50 monitors free)
- **Server resources**: Minimal impact, health checks are lightweight

## Next Steps

1. **Test the system** in development:

   ```bash
   curl -X POST http://localhost:3000/api/test-error-notification \
     -H "Content-Type: application/json" \
     -d '{"service": "email", "message": "Test alert"}'
   ```

2. **Set up external monitoring service** (recommended: UptimeRobot):

   - Monitor `/api/health` endpoints
   - Configure alerts for service downtime

3. **Deploy to production** and verify alerts work correctly

4. **Optional enhancements**:

   - Slack/Discord webhook notifications
   - Custom alerting rules
   - Error dashboard

5. **Monitor alert frequency** and adjust throttling if needed

## Email Template Style

The error notification emails are designed to be:

- **Clean and minimal** - Similar to Sentry alert emails
- **Easy to scan** - Key information highlighted
- **Professional** - No excessive colors or graphics
- **Focused** - Essential details only

Sample email structure:

```
EMAIL Error
December 15, 2024, 2:30:15 PM PST • PRODUCTION

Error Message
[Error details in red-bordered box]

Context
Endpoint: /api/send-client-email
Service: email
Environment: production

[Stack trace if available]
[Additional metadata if available]

The Grand LB • Automated Error Monitoring
```
