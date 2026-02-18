# Inquiry Form CI Test

This test validates that the inquiry form submission flow works correctly after each commit.

## What it tests

1. **`/api/add-to-database`** - Validates form data structure and endpoint response
2. **`/api/send-client-email`** - Validates email template rendering and endpoint response

## How it works

- **TEST_MODE**: When `TEST_MODE=true` is set, both endpoints skip actual database inserts and email sends
- **Validation**: The endpoints still validate data structure, required fields, and email template rendering
- **Test email**: Uses `ci-test@thegrandlb.com` (configurable via `TEST_EMAIL` env var)
- **Failure notification**: If tests fail, an error notification email is sent to the address configured in `CI_ERROR_NOTIFICATION_EMAIL`

## Running locally

```bash
# Set TEST_MODE in your environment
export TEST_MODE=true

# Start your Next.js server
npm run build
npm start

# In another terminal, run the test
npm run test:inquiry-form
```

## GitHub Actions

The workflow (`.github/workflows/test-inquiry-form.yml`) runs automatically on:
- Push to `main` or `develop`
- Pull requests to `main` or `develop`
- Manual trigger via `workflow_dispatch`

## Required GitHub Secrets

- `NEXT_RESEND_API_KEY` - Resend API key (for error notifications)
- `NEXT_PUBLIC_RESEND_FROM_EMAIL` - From email address
- `NEXT_PUBLIC_RESEND_SALES_EMAIL` - Sales team email
- `NEXT_PUBLIC_RESEND_REPLY_EMAILS` - Reply-to email
- `CI_ERROR_NOTIFICATION_EMAIL` - Email to receive CI test failure alerts (optional but recommended)
- `NEXT_DATABASE_URL` - Database connection string (not used in TEST_MODE but required for build)
- `NEXT_PUBLIC_DATABASE_TABLE` - Database table name (not used in TEST_MODE but required for build)

## What happens if the test fails

1. The GitHub Actions workflow fails (red X)
2. An error notification email is sent to `CI_ERROR_NOTIFICATION_EMAIL` (if configured)
3. The test output shows which endpoint failed and why
