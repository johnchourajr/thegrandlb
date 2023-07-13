import { toast } from "react-hot-toast";
import { event } from "./gtm";
import { stringToCamelCase } from "./utils";

export const handleEvent = ({
  action,
  category,
  label,
  value,
}: {
  action?: string;
  category?: string;
  label?: string;
  value?: string;
}) => {
  event({
    action: stringToCamelCase(action || "click"),
    category: stringToCamelCase(category || "button"),
    label: stringToCamelCase(label || ""),
    value: value || "",
  });
};

export const eventInquireNext = (currentPage: number) => {
  event({
    action: "inquiryForm",
    category: "button",
    label: `nextButton`,
    value: `Forward to Step ${currentPage + 2}`,
  });
};

export const toastNextError = (currentPage: number) => {
  toast.error("Please fill in all the required fields");
  event({
    action: "inquiryForm",
    category: "error",
    label: `nextButton`,
    value: `Required fields invalid at step ${currentPage + 1}`,
  });
};

export const eventInquirePrev = (currentPage: number) => {
  event({
    action: "inquiryForm",
    category: "button",
    label: `prevButton`,
    value: `Back to Step ${currentPage}`,
  });
};

export const eventInquireSubmit = (currentPage: number) => {
  event({
    action: "inquiryForm",
    category: "button",
    label: `submitButton`,
    value: `Submit at Step ${currentPage + 1}`,
  });
};

export const toastEmailRrequired = (value?: string | number) => {
  toast("Email is required");
  event({
    action: "inquiryMessage",
    category: "error",
    label: `toastEmailRrequired`,
    value: value,
  });
};

export const toastSubmitSuccess = (value?: string | number) => {
  toast.success("Email sent successfully");
  event({
    action: "inquiryMessage",
    category: "success",
    label: `toastSubmitSuccess`,
    value: value,
  });
};

export const toastSubmitError = (value?: string | number) => {
  toast.error("Something went wrong check inputs and try again");
  event({
    action: "inquiryMessage",
    category: "error",
    label: `toastSubmitError`,
    value: value,
  });
};
