/**
 * Prints the live column types for the tables this app writes to.
 *
 * The inquiry table is managed outside this repo — there is no CREATE TABLE in
 * the tree — so column types were being inferred from call sites, which is how
 * `head_count` nearly received a string range (#215). Read-only.
 *
 *   pnpm schema:pull
 *
 * Requires NEXT_DATABASE_URL, loaded by node's own --env-file.
 */
import { Pool } from "pg";

// The configured table first, then the production one — a local env commonly
// points at a test table, and the two are worth seeing side by side.
const TABLES = Array.from(
  new Set(
    [
      process.env.NEXT_PUBLIC_DATABASE_TABLE,
      "glb_submissions",
      "analytics_events",
    ].filter((t): t is string => Boolean(t)),
  ),
);

type Column = {
  column_name: string;
  data_type: string;
  udt_name: string;
  is_nullable: string;
  column_default: string | null;
  character_maximum_length: number | null;
};

async function main() {
  if (!process.env.NEXT_DATABASE_URL) {
    console.error("NEXT_DATABASE_URL is not set.");
    console.error("Run via: pnpm schema:pull");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.NEXT_DATABASE_URL,
    max: 2,
    allowExitOnIdle: true,
  });

  try {
    for (const table of TABLES) {
      const { rows } = await pool.query<Column>(
        `SELECT column_name, data_type, udt_name, is_nullable,
                column_default, character_maximum_length
           FROM information_schema.columns
          WHERE table_name = $1
          ORDER BY ordinal_position`,
        [table],
      );

      console.log(`\n${table}`);
      if (rows.length === 0) {
        console.log("  (no such table, or not visible to this role)");
        continue;
      }

      const width = Math.max(...rows.map((r) => r.column_name.length));
      const enums = new Map<string, string[]>();
      for (const r of rows) {
        if (r.data_type !== "USER-DEFINED") continue;
        const { rows: labels } = await pool.query<{ label: string }>(
          `SELECT e.enumlabel AS label
             FROM pg_enum e
             JOIN pg_type t ON t.oid = e.enumtypid
            WHERE t.typname = $1
            ORDER BY e.enumsortorder`,
          [r.udt_name],
        );
        enums.set(r.column_name, labels.map((l) => l.label));
      }
      for (const r of rows) {
        const len = r.character_maximum_length
          ? `(${r.character_maximum_length})`
          : "";
        const bits = [
          r.is_nullable === "YES" ? "null ok" : "NOT NULL",
          r.column_default ? `default ${r.column_default}` : null,
        ].filter(Boolean);
        console.log(
          `  ${r.column_name.padEnd(width)}  ${(r.udt_name + len).padEnd(14)} ${bits.join(", ")}`,
        );
        const labels = enums.get(r.column_name);
        if (labels) {
          console.log(`  ${" ".repeat(width)}  -> ${labels.join(" | ")}`);
        }
      }
    }
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error("Schema pull failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
