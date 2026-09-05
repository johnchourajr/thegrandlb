<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# The Grand Long Beach

Marketing site for a Long Beach event venue — seven bookable rooms, menus, and
an inquiry form that is the only conversion path on the site. Single client,
single repo, deployed on Vercel.

## Stack

Next.js 16 App Router · React · TypeScript 7 · Tailwind · pnpm · Postgres ·
Resend · Framer Motion. Content is first-party TypeScript and JSON — Prismic was
removed in #169, so ignore any CMS-shaped instinct.

## Layout

```
src/app/(site)      public pages + all API routes
src/app/(admin)     password-gated menu editor
src/proxy.ts        middleware — Next 16 renamed it; bot blocking, Link headers,
                    experiment cookie
src/flags.ts        Vercel Flags declarations
src/components      UI; form/, email/, media-frame/, menu/ are the substantial ones
src/data            form.json — the inquiry form's entire question set
src/utils           shared logic; anything with a .test.ts lives here
src/emails          React Email templates rendered server-side by Resend
src/services        data access (menu-files.ts loads via import.meta.glob)
scripts/            one-off and repeatable tooling — schema:pull, backfill:analytics
content/menus       *.menu.json — the live menu data
analysis/           funnel analysis, SQL, time log. Gitignored, local only.
docs/               media catalog, voice & tone, DNS notes
```

Aliases: `@/*` → `src/*`, `@components/*` → `src/components/*`.

## Conventions worth knowing before you edit

**Cache Components is on, and every route opts out.** `next.config.ts` sets
`cacheComponents: true`, and all 24 routes carry `export const instant = false`
(#207). A new route needs that line too, or it will behave differently from
every one of its neighbours. Opting a route _in_ is a deliberate decision, not a
cleanup.

**TypeScript 7 with a TypeScript 6 sidecar for lint.** TS 7 is the native
compiler and ships no JS compiler API. typescript-eslint hard-throws above TS 6,
so `.pnpmfile.cjs` rewrites its `typescript` peer into a nested TS 6 dependency
while the root stays on 7. `next.config.ts` sets
`experimental.useTypeScriptCli: true` for the same reason. **Delete both when
typescript-eslint supports TS 7** — the file says so at the top.

**Dates are calendar days, not instants.** `formatDate` in `src/utils/utils.ts`
does no timezone conversion, on purpose, and is idempotent. It used to read the
month locally and the day in UTC, which shifted the 1st of every month for
anyone west of Greenwich, and the submit path formatted twice so the database
got it wrong twice (#213). Do not "simplify" it back to `new Date()`.

## The inquiry form

The commercially important path in the repo, and the subject of the current
workstream (#220).

`src/data/form.json` defines every question. Three pages: six required fields
about the event, three required contact fields, then a recap that submits.
`InquireFormContainer` owns state; `InquireFormSection` renders a step.

On submit it fires two independent requests:

| Request                       | Payload              | Notes                                                                |
| ----------------------------- | -------------------- | -------------------------------------------------------------------- |
| `POST /api/add-to-database`   | flattened, formatted | Fixed 11-column INSERT. **No UPDATE path, and it returns no row id** |
| `POST /api/send-client-email` | raw `formState`      | Renders both templates via Resend, server-side                       |

Consequences to keep in mind: an inquiry cannot currently be amended after it
lands, the email templates render a fixed list of nine fields regardless of what is
filled in, and nothing at all is recorded before the final submit — which is why
811 abandoners left no trace. #216 is about changing that.

`TEST_MODE=true` renders the emails and validates the payload without sending or
inserting.

## Analytics

First-party, no third-party session cookie.

- `src/utils/session.ts` — CSPRNG session id, 30-minute sliding idle window,
  localStorage with an in-memory fallback. Returns `null` rather than a weak id
  when `crypto.getRandomValues` is unavailable; CodeQL flagged the earlier
  `Math.random()` fallback and it is not coming back.
- `src/utils/analytics.ts` — `trackEvent` stamps `session_id` on every event.
- `src/utils/field-obstruction.ts` — measures whether the form's floating action
  bar physically covers its own inputs. Pure core (`assessObstruction`) is split
  from DOM access (`surveyObstruction`) so the arithmetic is testable without a
  browser. Follow that split for anything similar; there is no jsdom here.
- `/api/analytics-drain` — receives the Vercel log drain, writes
  `analytics_events`. Columns are added with `ADD COLUMN IF NOT EXISTS`, so it is
  safe to re-run.
- `/api/analytics` — read API consumed by a Retool dashboard.

Event names are namespaced (`conversion.*`, `engagement.*`). A mismatch here is
invisible: an `email_click` tile read zero for months because the dashboard
queried `conversion.email_click` and the site emitted `engagement.email_click`.

## Feature flags and the experiment

Flags are **Vercel Flags**, via `flags` + `@flags-sdk/vercel`. The declaration
lives in `src/flags.ts`; `@vercel/toolbar` is already mounted, so Flags Explorer
can override a value per-viewer for QA.

**Vercel decides, not this repo.** The adapter's own type is
`Omit<FlagDeclaration, 'decide' | 'origin'>` — supplying a `decide` alongside it
is a category error. Variants, per-environment values and percentage rollouts
are all configured on the platform:

```bash
vercel flags inspect inquiry-form-variant
vercel flags set inquiry-form-variant --environment preview --variant treatment
vercel flags rollout inquiry-form-variant --environment production \
  --by user.id --from-variant control --to-variant treatment \
  --default-variant control --stage 10,2h --stage 50,12h
vercel flags evaluations inquiry-form-variant --since 24h
```

**`identify` supplies the bucketing entity.** The site has no accounts, so
`user.id` comes from `glb.exp`, a year-long cookie minted in `src/proxy.ts`.
It is deliberately **not** the analytics session id — that has a 30-minute idle
window, so bucketing on it would reassign anyone returning the next day, and
returning visitors are the whole point of #216. The proxy injects a newly
minted id into the _current_ request as well as the response; without that,
every visitor's first render falls back to control and the experiment is
biased from the start.

**Failure modes all resolve to `defaultValue`.** No `FLAGS` key, no cookie, or a
malformed cookie each mean the visitor sees today's form. That is deliberate —
a missing credential must never show someone an untested variant. It also means
**the app builds and runs fine without `FLAGS`**, which is how CI and local dev
work; do not add it as a hard requirement.

Two environment variables, both set on the Vercel project rather than committed:
`FLAGS` (server SDK key, from `vercel flags sdk-keys add`) and `FLAGS_SECRET`
(for Flags Explorer). `vercel env pull` brings them local.

Arm constants in `src/utils/experiment.ts` must match the variants registered on
the flag. A test pins them, because a mismatch resolves to a variant Vercel has
never heard of and fails silently to the default.

Every custom analytics event carries `experiment_arm`, taken from what the
server resolved rather than recomputed in the browser — a Flags Explorer
override changes the render without changing the cookie, and reporting an arm
the visitor is not seeing is worse than reporting none. It lands in
`analytics_events.event_data`, queryable as `event_data->>'experiment_arm'`.

## Testing

`node:test` via `tsx --test`. No jsdom, no React testing library — write logic
you can test as a pure function.

```
pnpm test:unit        src/utils/*.test.ts
pnpm test:menu-unit   src/__tests__/admin/*.test.ts
pnpm test:menu-api    auth checks against a running server
pnpm test:inquiry-form  end-to-end against a running server
```

**Both unit scripts name their files one at a time.** Adding a `.test.ts` file
does not run it. `rich-text.test.ts` sat unreferenced with 20 passing tests
because of exactly this — if you add a test file, add it to the script.

**`test:unit` pins `TZ=America/Los_Angeles`**, the venue's timezone. CI runners
are UTC, where the date bug above does not reproduce at all. Leave the pin.

## CI, and what it does not cover

`.github/workflows/` runs CodeQL, `test-inquiry-form` (unit tests + build +
end-to-end), and `test-menu-admin`.

**Lint is in no workflow.** `pnpm lint` currently reports 29 problems on `main`,
all pre-existing and tracked in #214. If you are checking whether you regressed
anything, compare the count — do not assume zero.

## Working agreements

- **Tickets are GitHub Issues.** Not Linear, not Notion, despite both being
  connected. The inquiry workstream is grouped under the `inquiry-gap` label
  with #220 as the tracking issue.
- Branch from `main` and open a PR; `main` is the deploy branch.
- `analysis/` is gitignored (#208) because the repo is public. Client figures,
  the time log, and working drafts belong there and must not be committed.
