/**
 * Guest capacity per bookable space.
 *
 * Visitors told us this was missing at the moment it mattered — "I am not sure
 * what capacity each room holds" was given as a reason for abandoning the
 * inquiry form, and another wrote "I have to go back and see what room works
 * for 30 people." The room dropdown is where that question gets asked, so it is
 * where the answer belongs (#215).
 *
 * Figures are the `max_capacity` values carried by each room's tour page in
 * `src/app/(site)/tour/[uid]/content.ts`. That file is the editorial source;
 * this is a narrow projection of it for the form, because importing the tour
 * content into the client bundle would pull in every room's copy, media and FAQ.
 *
 * Two known inconsistencies in that source, left alone here rather than
 * silently reconciled — both are content questions for the venue:
 *   - The Monarch Room declares `max_capacity: 280` but its own page reads
 *     "50-180 Event Capacity". 280 is used below.
 *   - The Grand Ballroom and Palm Terrace carry no per-format breakdown at all.
 */
export const ROOM_MAX_CAPACITY: Record<string, number> = {
  "grand-ballroom": 675,
  "catalina-room": 400,
  "palm-terrace": 400,
  "monarch-room": 280,
  "garden-room": 140,
  "pacific-room": 90,
  "board-room": 40,
};

/** Sentinel for "I don't know which room yet" — deliberately not a room. */
export const ROOM_UNDECIDED = "undecided";

/**
 * Appends capacity to a room's label, e.g. "The Pacific Room · up to 90 guests".
 *
 * Returns the label untouched for anything without a known capacity, including
 * the undecided sentinel — a room we have no figure for should read as a plain
 * name rather than as one that holds nobody.
 */
export function withCapacity(label: string, roomValue: string): string {
  const capacity = ROOM_MAX_CAPACITY[roomValue];
  if (!capacity) return label;
  return `${label} · up to ${capacity} guests`;
}
