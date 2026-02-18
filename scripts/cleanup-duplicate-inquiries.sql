-- Cleanup duplicate inquiries from the last 7 days
-- Table: glb_submissions (replace with your table if you use NEXT_PUBLIC_DATABASE_TABLE)
-- Run these in order. Use a transaction so you can ROLLBACK if the counts look wrong.
--
-- Duplicate rule: same email + event_name + desired_date + desired_time in last 7 days.
-- We keep the earliest submission (min created_date) per group and delete the rest.

-- =============================================================================
-- STEP 1: See how many duplicates would be removed (review before deleting)
-- =============================================================================

-- Duplicates = same email + event_name + desired_date + desired_time in last 7 days;
-- we keep the earliest submission (min created_date) per group.
WITH last_7_days AS (
  SELECT id, email, event_name, desired_date, desired_time, created_date,
         ROW_NUMBER() OVER (
           PARTITION BY LOWER(TRIM(email)), event_name, desired_date, desired_time
           ORDER BY created_date ASC
         ) AS rn
  FROM glb_submissions
  WHERE created_date >= (NOW() - INTERVAL '7 days')
)
SELECT COUNT(*) AS duplicate_rows_to_delete
FROM last_7_days
WHERE rn > 1;

-- =============================================================================
-- STEP 2: List the duplicate rows (IDs and key fields) so you can verify
-- =============================================================================

WITH last_7_days AS (
  SELECT id, email, event_name, desired_date, desired_time, created_date, full_name,
         ROW_NUMBER() OVER (
           PARTITION BY LOWER(TRIM(email)), event_name, desired_date, desired_time
           ORDER BY created_date ASC
         ) AS rn
  FROM glb_submissions
  WHERE created_date >= (NOW() - INTERVAL '7 days')
)
SELECT id, email, event_name, desired_date, desired_time, created_date, full_name, rn
FROM last_7_days
WHERE rn > 1
ORDER BY email, event_name, created_date;

-- =============================================================================
-- STEP 3: Delete duplicates (keep earliest per group). Run inside a transaction.
-- =============================================================================

BEGIN;

WITH last_7_days AS (
  SELECT id,
         ROW_NUMBER() OVER (
           PARTITION BY LOWER(TRIM(email)), event_name, desired_date, desired_time
           ORDER BY created_date ASC
         ) AS rn
  FROM glb_submissions
  WHERE created_date >= (NOW() - INTERVAL '7 days')
),
ids_to_delete AS (
  SELECT id FROM last_7_days WHERE rn > 1
)
DELETE FROM glb_submissions
WHERE id IN (SELECT id FROM ids_to_delete);

-- Review the result, then either:
COMMIT;
-- or
-- ROLLBACK;
