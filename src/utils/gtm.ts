"use client";

import { sendGTMEvent } from "@next/third-parties/google";

export const GTM_ID = "GTM-PRP9HDK";

export const pageview = (url: string) => {
  sendGTMEvent({
    event: "page_view",
    page_path: url,
    page: url,
  });
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number | string;
}) => {
  sendGTMEvent({
    event: action,
    eventCategory: category,
    eventLabel: label,
    value: value,
  });
};
