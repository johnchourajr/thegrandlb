/**
 * Recovers session ids and UTM values that the drain dropped.
 *
 * The drain read `queryParams` as a query string when Vercel sends a JSON
 * object, so `.get()` always returned null and `session_uid` / `utm_*` were
 * never written. The values were never lost — every event's full payload is
 * kept in `analytics_events.raw` — so they can be recomputed in place.
 *
 * Only ever fills columns that are currently NULL. Never overwrites.
 *
 *   pnpm backfill:analytics           # dry run, prints what would change
 *   pnpm backfill:analytics --apply   # writes
 */
import { Pool } from "pg";
import { parseUtm, sessionUid } from "../src/utils/analytics-query";

const APPLY = process.argv.includes("--apply");
const BATCH = 500;

async function main() {
  if (!process.env.NEXT_DATABASE_URL) {
    console.error("NEXT_DATABASE_URL is not set. Run via pnpm backfill:analytics");
    process.exit(1);
  }
  const pool = new Pool({
    connectionString: process.env.NEXT_DATABASE_URL,
    max: 2,
    allowExitOnIdle: true,
  });

  let scanned = 0;
  let wouldSetSession = 0;
  let wouldSetUtm = 0;
  let lastId = "0";

  try {
    for (;;) {
      const { rows } = await pool.query<{ id: string; raw: Record<string, unknown> }>(
        `SELECT id, raw FROM analytics_events
          WHERE id > $1
            AND raw IS NOT NULL
            AND (session_uid IS NULL OR utm_source IS NULL)
          ORDER BY id LIMIT $2`,
        [lastId, BATCH],
      );
      if (rows.length === 0) break;

      for (const row of rows) {
        scanned += 1;
        lastId = row.id;

        const uid = sessionUid(row.raw);
        const utm = parseUtm(row.raw.queryParams);
        const hasUtm = Object.values(utm).some((v) => v !== null);
        if (!uid && !hasUtm) continue;

        if (uid) wouldSetSession += 1;
        if (hasUtm) wouldSetUtm += 1;

        if (!APPLY) continue;

        // COALESCE so an existing value always wins over a recomputed one.
        await pool.query(
          `UPDATE analytics_events SET
             session_uid  = COALESCE(session_uid, $2),
             utm_source   = COALESCE(utm_source, $3),
             utm_medium   = COALESCE(utm_medium, $4),
             utm_campaign = COALESCE(utm_campaign, $5),
             utm_term     = COALESCE(utm_term, $6),
             utm_content  = COALESCE(utm_content, $7)
           WHERE id = $1`,
          [row.id, uid, utm.utm_source, utm.utm_medium, utm.utm_campaign, utm.utm_term, utm.utm_content],
        );
      }
      process.stdout.write(`\r  scanned ${scanned}…`);
    }

    console.log(`\n\n${APPLY ? "APPLIED" : "DRY RUN — nothing written"}`);
    console.log(`  rows scanned            ${scanned}`);
    console.log(`  session_uid recoverable ${wouldSetSession}`);
    console.log(`  utm recoverable         ${wouldSetUtm}`);
    if (!APPLY && (wouldSetSession || wouldSetUtm)) {
      console.log(`\n  re-run with --apply to write.`);
    }
  } finally {
    await pool.end();
  }
}

main().catch((e) => {
  console.error("\nBackfill failed:", e instanceof Error ? e.message : e);
  process.exit(1);
});
