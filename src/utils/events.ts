import { toast } from "react-hot-toast";
import { event } from "./gtm";
import { stringToUnderscore } from "./utils";

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
    action: stringToUnderscore(action || "click"),
    category: stringToUnderscore(category || "button"),
    label: stringToUnderscore(label || ""),
    value: value || "",
  });
};

export const eventInquireNext = (currentPage: number) => {
  event({
    action: "click",
    category: "inquire_form",
    label: `next_button`,
    value: `Forward to Step ${currentPage + 2}`,
  });
};

export const toastNextError = (currentPage: number) => {
  toast.error("Please fill in all the required fields");
  event({
    action: "click",
    category: "inquire_form_error",
    label: `next_button`,
    value: `Required fields invalid at step ${currentPage + 1}`,
  });
};

export const eventInquirePrev = (currentPage: number) => {
  event({
    action: "click",
    category: "inquire_form",
    label: `prev_button`,
    value: `Back to Step ${currentPage}`,
  });
};

export const eventInquireSubmit = (currentPage: number) => {
  event({
    action: "click",
    category: "inquire_form",
    label: `submit_button`,
    value: `Submit at Step ${currentPage + 1}`,
  });
};

export const toastEmailRrequired = (value?: string | number) => {
  toast("Email is required");
  event({
    action: "click",
    category: "inquire_form_error",
    label: `toast_email_required`,
    value: value,
  });
};

export const toastSubmit = (value?: string | number) => {
  toast.success("Submitting...");
  event({
    action: "click",
    category: "inquire_form",
    label: `toast_submit_loading`,
    value: value,
  });
};

export const toastSubmitSuccess = (value?: string | number) => {
  toast.success("Success! Confirmation email sent to you and our sales team", {
    duration: 10000,
  });
  event({
    action: "click",
    category: "inquire_form",
    label: `toast_submit_success`,
    value: value,
  });
};

export const toastSubmitError = (value?: string | number) => {
  toast.error("Something went wrong check inputs and try again");
  event({
    action: "click",
    category: "inquire_form_error",
    label: `toast_submit_error`,
    value: value,
  });
};
