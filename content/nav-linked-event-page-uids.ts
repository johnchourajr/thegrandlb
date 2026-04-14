import { navigation } from "./shared.constants";
import type { Slice } from "./types";

type NavLinkTreeSlice = Slice & {
  slice_type?: string;
  primary?: {
    link_source?: { type?: string; uid?: string };
  };
  items?: Array<{
    child_link_source?: { type?: string; uid?: string };
    show?: boolean | null;
  }>;
};

/**
 * Event page UIDs already linked under the primary Events nav item
 * (same tree appears in header and footer). Used to de-duplicate "More celebrations."
 */
export function getNavLinkedEventPageUids(): string[] {
  const slices = navigation?.data?.slices;
  if (!Array.isArray(slices)) return [];

  const eventsSlice = slices.find((raw): raw is NavLinkTreeSlice => {
    const s = raw as NavLinkTreeSlice;
    return (
      s.slice_type === "nav_link_tree" &&
      s.primary?.link_source?.type === "event_index_page"
    );
  });

  if (!eventsSlice?.items?.length) return [];

  const uids: string[] = [];
  for (const item of eventsSlice.items) {
    if (item?.show === false) continue;
    const src = item.child_link_source;
    if (src?.type === "event_page" && typeof src.uid === "string") {
      uids.push(src.uid);
    }
  }
  return uids;
}

/** Cached at module load — keep in sync when editing `navigation` in shared.constants */
export const NAV_LINKED_EVENT_PAGE_UIDS: readonly string[] =
  getNavLinkedEventPageUids();
