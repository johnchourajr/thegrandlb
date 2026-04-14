"use client";

import type { LinkField } from "content/types";
import Link from "next/link";
import React from "react";

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export interface AppLinkProps extends Omit<AnchorProps, "href"> {
  field?: LinkField | Record<string, unknown> | null;
  href?: string;
  children?: React.ReactNode;
  /** Accepted and silently ignored — prevents passing to DOM when coming from legacy call sites */
  linkResolver?: unknown;
}

function resolveDocumentUrl(field: Record<string, unknown>): string | null {
  const uid = typeof field.uid === "string" ? field.uid : null;
  const type = typeof field.type === "string" ? field.type : null;
  if (!uid && !type) return null;

  switch (type) {
    case "tour_index_page":
      return "/tour";
    case "tour_page":
      return `/tour/${uid}`;
    case "event_index_page":
      return "/events";
    case "event_page":
      return `/events/${uid}`;
    case "menu_page":
      return `/menus/${uid}`;
    case "inquire_page":
      return "/inquire";
    // Generic "page" type — use uid directly
    case "page":
    default:
      return uid ? `/${uid}` : null;
  }
}

function resolveField(
  field: AppLinkProps["field"]
): { url: string; external: boolean } | null {
  if (!field || typeof field !== "object") return null;

  if ("link_type" in field) {
    if (
      field.link_type === "Web" &&
      "url" in field &&
      typeof field.url === "string"
    ) {
      const url = field.url;
      const external =
        url.startsWith("http") ||
        url.startsWith("mailto:") ||
        url.startsWith("tel:");
      return { url, external };
    }

    if (field.link_type === "Document") {
      const url = resolveDocumentUrl(field as Record<string, unknown>);
      if (url) return { url, external: false };
    }
  }

  return null;
}

const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ field, href, children, linkResolver: _ignored, ...rest }, ref) => {
    let resolvedUrl = href;
    let isExternal = false;

    if (!resolvedUrl && field) {
      const resolved = resolveField(field);
      if (resolved) {
        resolvedUrl = resolved.url;
        isExternal = resolved.external;
      }
    } else if (resolvedUrl) {
      isExternal =
        resolvedUrl.startsWith("http") ||
        resolvedUrl.startsWith("mailto:") ||
        resolvedUrl.startsWith("tel:");
    }

    if (!resolvedUrl) {
      return (
        <span ref={ref as React.Ref<HTMLSpanElement>} {...(rest as any)}>
          {children}
        </span>
      );
    }

    if (isExternal) {
      const target = (field as any)?.target || rest.target || "_blank";
      return (
        <a
          ref={ref}
          href={resolvedUrl}
          target={target}
          rel="noopener noreferrer"
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link ref={ref} href={resolvedUrl} {...(rest as any)}>
        {children}
      </Link>
    );
  }
);

AppLink.displayName = "AppLink";

export default AppLink;
