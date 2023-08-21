import TagManager from "react-gtm-module";
export const GTM_ID = "GTM-PRP9HDK";

export const pageview = (url: string) => {
  TagManager.dataLayer({
    dataLayer: {
      event: "pageview",
      page: url,
    },
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
  TagManager.dataLayer({
    dataLayer: {
      event: action,
      eventCategory: category,
      eventLabel: label,
      value: value,
    },
  });
  console.log("event fired", { action, category, label, value });
};
