"use client";

import { eventPageUids, eventPages } from "@/app/(site)/events/[uid]/content";
import { handleEvent } from "@/utils/events";
import clsx from "clsx";
import type { DocumentLink } from "content/types";
import type { StringTextProps } from "./StringText";
import AppLink from "./AppLink";
import StringText from "./StringText";

const eventIndexField: DocumentLink = {
  link_type: "Document",
  type: "event_index_page",
  uid: "events",
  isBroken: false,
};

function eventPageField(uid: string): DocumentLink {
  return {
    link_type: "Document",
    type: "event_page",
    uid,
    isBroken: false,
  };
}

const underlineClass = clsx(
  "relative inline-flex w-fit py-1.5",
  "after:absolute after:bottom-0 after:left-0 after:z-20 after:h-[1.5px] after:w-[100%] after:origin-top-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-out-expo after:content-['']",
  "group-hover:after:origin-top-left group-hover:after:scale-x-100"
);

type EventPageNavLinkProps = {
  field: DocumentLink;
  label: string;
  value: string;
  analyticsCategory: string;
  textSize: StringTextProps["size"];
};

function EventPageNavLink({
  field,
  label,
  value,
  analyticsCategory,
  textSize,
}: EventPageNavLinkProps) {
  return (
    <AppLink
      field={field}
      className="group relative z-10 text-start"
      onClick={() =>
        handleEvent({
          category: analyticsCategory,
          label,
          value,
        })
      }
    >
      <StringText size={textSize} className={underlineClass}>
        {label}
      </StringText>
    </AppLink>
  );
}

export type EventPagesLinkGridProps = {
  /** Passed to analytics `category` for each link click */
  analyticsCategory: string;
  heading: string;
  /** Merged into `<nav>` */
  className?: string;
  headingClassName?: string;
  /** `StringText` size for the section heading */
  headingSize?: StringTextProps["size"];
  headingUppercase?: boolean;
  headingBold?: boolean;
  /** Link row text size */
  linkTextSize?: StringTextProps["size"];
  listClassName?: string;
  /** Include a link to `/events` (usually false on the events index itself) */
  showEventsOverview?: boolean;
  /** Event page UIDs to omit (e.g. already in primary Events nav) */
  excludeEventPageUids?: readonly string[];
};

export function EventPagesLinkGrid({
  analyticsCategory,
  heading,
  className,
  headingClassName,
  headingSize = "small",
  headingUppercase = true,
  headingBold = false,
  linkTextSize = "small",
  listClassName,
  showEventsOverview = true,
  excludeEventPageUids,
}: EventPagesLinkGridProps) {
  const excluded = new Set(excludeEventPageUids ?? []);
  const visibleEventUids = eventPageUids.filter((uid) => !excluded.has(uid));

  return (
    <nav
      aria-label="Celebrations and event types"
      className={clsx(className)}
    >
      <StringText
        as="h2"
        size={headingSize}
        uppercase={headingUppercase}
        bold={headingBold}
        className={clsx("mb-4 block", headingClassName)}
      >
        {heading}
      </StringText>
      <ul
        className={clsx(
          "grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
          listClassName
        )}
      >
        {showEventsOverview ? (
          <li>
            <EventPageNavLink
              field={eventIndexField}
              label="Events overview"
              value="events"
              analyticsCategory={analyticsCategory}
              textSize={linkTextSize}
            />
          </li>
        ) : null}
        {visibleEventUids.map((uid) => {
          const title = eventPages[uid].data.title?.trim();
          return (
            <li key={uid}>
              <EventPageNavLink
                field={eventPageField(uid)}
                label={title || uid}
                value={uid}
                analyticsCategory={analyticsCategory}
                textSize={linkTextSize}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
