# GitHub Actions Secrets

Add these in **Settings → Secrets and variables → Actions** for this repository. Use **New repository secret** for each; never commit real values.

---

## Test Inquiry Form workflow

| Secret                            | Required                 | Description                                                                                                     | Example / where to get it                                          |
| --------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `NEXT_RESEND_API_KEY`             | Yes (for failure emails) | Resend API key. Used in CI for sending test-failure notification emails.                                        | `re_xxxxxxxx` from [Resend Dashboard](https://resend.com/api-keys) |
| `NEXT_PUBLIC_RESEND_FROM_EMAIL`   | No (has fallback)        | From address for emails. Workflow uses `test@thegrandlb.com` if unset.                                          | `hello@thegrandlb.com`                                             |
| `NEXT_PUBLIC_RESEND_SALES_EMAIL`  | No (has fallback)        | Sales team recipient. Workflow uses `test@thegrandlb.com` if unset.                                             | `rachael@grandfandb.com`                                           |
| `NEXT_PUBLIC_RESEND_REPLY_EMAILS` | No (has fallback)        | Reply-to address(es), comma-separated. Workflow uses `test@thegrandlb.com` if unset.                            | `rachael@grandfandb.com`                                           |
| `CI_ERROR_NOTIFICATION_EMAIL`     | Recommended              | Email that receives an alert when the inquiry form CI test fails.                                               | `hi+critical@john.design`                                          |
| `NEXT_DATABASE_URL`               | No (has fallback)        | Postgres connection string. Not used during TEST_MODE but needed for build. Workflow uses a dummy URL if unset. | `postgresql://user:pass@host:5432/dbname?sslmode=require`          |
| `NEXT_PUBLIC_DATABASE_TABLE`      | No (has fallback)        | Table name for submissions. Workflow uses `glb_submissions` if unset.                                           | `glb_submissions`                                                  |

---

## Checklist

Copy this and fill in as you add each secret:

```
[ ] NEXT_RESEND_API_KEY
[ ] NEXT_PUBLIC_RESEND_FROM_EMAIL
[ ] NEXT_PUBLIC_RESEND_SALES_EMAIL
[ ] NEXT_PUBLIC_RESEND_REPLY_EMAILS
[ ] CI_ERROR_NOTIFICATION_EMAIL
[ ] NEXT_DATABASE_URL
[ ] NEXT_PUBLIC_DATABASE_TABLE
```

---

## Notes

- **TEST_MODE**: The workflow sets `TEST_MODE=true` so the app never writes to the real database or sends real inquiry emails. Secrets are still used so the build and server start correctly.
- **Failure emails**: If the inquiry form test fails, the script sends one email to `CI_ERROR_NOTIFICATION_EMAIL` (if set) with the error details. That uses `NEXT_RESEND_API_KEY` and `NEXT_PUBLIC_RESEND_FROM_EMAIL`.
- Prefer using the same Resend key and from-email as production so failure alerts are reliable; you can use a separate key for CI if you prefer.
