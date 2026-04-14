"use client";

import { NAV_LINKED_EVENT_PAGE_UIDS } from "content/nav-linked-event-page-uids";
import clsx from "clsx";
import { EventPagesLinkGrid } from "./EventPagesLinkGrid";

export function FooterEventPages() {
  return (
    <EventPagesLinkGrid
      analyticsCategory="footer_item"
      heading="More celebrations"
      headingClassName="uppercase tracking-[0.12em] text-black/70"
      className={clsx(
        "col-span-full xl:col-span-12 2xl:col-span-10 2xl:col-start-2",
        "border-b-2 border-white",
        "padding-top-md padding-bottom-md",
        "print:hidden"
      )}
      excludeEventPageUids={NAV_LINKED_EVENT_PAGE_UIDS}
      showEventsOverview={false}
    />
  );
}
