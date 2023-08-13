export const GTM_ID = "GTM-PRP9HDK";

export const pageview = (url: string) => {
  (window as any).dataLayer.push({
    event: "pageview",
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
  (window as any).dataLayer.push({
    event: action,
    category: category,
    label: label,
    value: value,
  });
  // console.log("event fired", { action, category, label, value });
};

export const GTMInitializer = () => {
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).gtag = function () {
    (window as any).dataLayer.push(arguments);
  };
  (window as any).gtag("js", new Date());

  (window as any).gtag("config", GTM_ID);

  // console.log("GTMInitializer", GTM_ID);
};
