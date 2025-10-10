# Monitoring Quick Reference

Quick commands and URLs for monitoring The Grand LB's critical services.

## Health Check Endpoints

### Production

Replace `thegrandlb.com` with your actual domain:

```bash
# Overall system health
curl https://thegrandlb.com/api/health

# Email service
curl https://thegrandlb.com/api/health/email

# Database health
curl https://thegrandlb.com/api/health/database

# Database pool stats (detailed)
curl https://thegrandlb.com/api/health/database/stats
```

### Local Development

```bash
# Overall system health
curl http://localhost:3000/api/health

# Database pool stats
curl http://localhost:3000/api/health/database/stats
```

## Understanding Pool Statistics

### Healthy Pool Example

```json
{
  "pool": {
    "totalCount": 2, // ✅ Low, good
    "idleCount": 1, // ✅ Has idle connections
    "waitingCount": 0, // ✅ No waiting requests
    "utilization": 10 // ✅ Low utilization
  },
  "health": {
    "recommendation": "Pool is healthy"
  }
}
```

### Warning Signs

**🚨 Pool Exhausted:**

```json
{
  "pool": {
    "totalCount": 10, // ⚠️ Max connections
    "idleCount": 0, // ⚠️ No idle connections
    "waitingCount": 5, // 🚨 Requests queued!
    "utilization": 100 // 🚨 Fully utilized
  }
}
```

**Action:** Investigate slow queries or increase pool size

**⚠️ High Utilization:**

```json
{
  "pool": {
    "totalCount": 9, // ⚠️ Near max
    "idleCount": 1, // ⚠️ Only 1 idle
    "utilization": 80 // ⚠️ High load
  }
}
```

**Action:** Monitor for patterns, review query performance

## Error Notification Details

**Email Recipient:** `hi+critical@john.design`

**Throttling:** 1 email per hour per error type

**What's Included:**

- Full error message and stack trace
- Endpoint where error occurred
- Environment (production/development)
- Timestamp
- **For database errors**: Pool statistics at time of error
  - Total connections
  - Idle connections
  - Waiting clients
  - Utilization percentage

## Common Error Patterns

### Database Connection Timeouts (FIXED ✅)

```
Error: Connection timeout
```

**Status:** Fixed in Jan 2024 by migrating to connection pool
**If you see this:** Check `/api/health/database/stats` for pool exhaustion

### Pool Exhaustion (Rare)

**Symptoms:**

- High response times
- `waitingCount > 0` in stats
- Timeout errors

**Check:**

```bash
curl https://thegrandlb.com/api/health/database/stats
```

**Solutions:**

1. Review slow queries
2. Check for long-running transactions
3. Increase pool `max` if consistently near capacity

### Email Delivery Failures

**Symptoms:**

- Error notifications about Resend API
- Users not receiving confirmation emails

**Check:**

```bash
curl https://thegrandlb.com/api/health/email
```

## Monitoring Schedule

### Daily

- Check error notification emails
- Verify no critical alerts

### Weekly

- Review pool statistics trends
- Check all health endpoints
- Review error patterns

### Monthly

- Analyze error notification frequency
- Review and update alert thresholds
- Test error notification system

## Emergency Response

### Database Issues

1. Check pool stats: `curl .../api/health/database/stats`
2. Review recent error emails for patterns
3. Check database provider dashboard
4. If pool exhausted, restart functions to clear pool

### Email Issues

1. Check Resend dashboard for quota/issues
2. Verify API key validity
3. Test with manual submission
4. Check error notification emails

## Setup External Monitoring

### UptimeRobot (Recommended - Free)

1. **Sign up**: https://uptimerobot.com
2. **Add monitors**:

   - Name: "Grand LB - Overall Health"

     - URL: `https://thegrandlb.com/api/health`
     - Type: HTTP(s)
     - Interval: 5 minutes

   - Name: "Grand LB - Database"

     - URL: `https://thegrandlb.com/api/health/database`
     - Type: HTTP(s)
     - Interval: 5 minutes

   - Name: "Grand LB - Email Service"
     - URL: `https://thegrandlb.com/api/health/email`
     - Type: HTTP(s)
     - Interval: 5 minutes

3. **Configure alerts**:
   - Alert after: 2 failed checks
   - Send to: Your phone/email/Slack

## Testing Error Notifications (Dev Only)

```bash
# Test database error notification
curl -X POST http://localhost:3000/api/test-error-notification \
  -H "Content-Type: application/json" \
  -d '{"service": "database", "message": "Test connection error"}'

# Test email error notification
curl -X POST http://localhost:3000/api/test-error-notification \
  -H "Content-Type: application/json" \
  -d '{"service": "email", "message": "Test email delivery error"}'
```

## Key Metrics Reference

| Metric         | Good    | Warning   | Critical |
| -------------- | ------- | --------- | -------- |
| `totalCount`   | < 5     | 5-8       | 9-10     |
| `idleCount`    | > 0     | 0-1       | 0        |
| `waitingCount` | 0       | 1-2       | > 2      |
| `utilization`  | < 50%   | 50-80%    | > 80%    |
| Response time  | < 100ms | 100-500ms | > 500ms  |

## Quick Troubleshooting

**Problem:** No error notifications received

- ✅ Check Resend API key is set
- ✅ Check `hi+critical@john.design` inbox (including spam)
- ✅ Verify error is new (not throttled)

**Problem:** Health checks failing

- ✅ Check environment variables
- ✅ Test database connection string
- ✅ Verify Resend API key
- ✅ Check Netlify function logs

**Problem:** High pool utilization

- ✅ Check for slow queries
- ✅ Review database indexes
- ✅ Check for long-running transactions
- ✅ Consider increasing pool `max`

---

**Full Documentation:** See [monitoring-setup.md](./monitoring-setup.md)
