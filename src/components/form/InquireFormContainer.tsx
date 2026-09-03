"use client";

import {
  FieldTypeValues,
  FormPage,
  FormState,
  getFormData,
} from "@/data/form.types";
import {
  toastEmailRrequired,
  toastSubmit,
  toastSubmitError,
  toastSubmitSuccess,
} from "@/utils/events";
import { trackEvent } from "@/utils/analytics";
import {
  isValidEmail,
  validateValueWithRule,
} from "@/utils/inquire-validation";
import { formatPhoneForDatabase } from "@/utils/phone-formatter";
import { formatDate, formatTitle } from "@/utils/utils";
import axios from "axios";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GridSection } from "../GridSection";
import { InquireFormSection } from "./InquireFormSection";

export type HandleFormFunction = (
  fieldName: FieldTypeValues,
  value: any,
  page_key: any,
  validations: any
) => void;

//?event_name=John%27s%20Birthday&event_type=birthday_party&desired_date=2024-11-17&desired_time=9pm&head_count=100&desired_space=board-room&full_name=John%20Choura&email=hi%40john.design&phone=555-555-5555&additional_details=This%20is%20a%20test%20inquiry%20from%20the%20website

//?event_name=TEST%20John%27s%20Birthday&event_type=birthday_party&desired_date=2024-11-17&desired_time=9pm&head_count=100&desired_space=board-room&full_name=TEST%20John%20Choura&email=hi%40john.design&phone=555-555-5555&additional_details=This%20is%20a%20test%20inquiry%20from%20the%20website

//?event_name=TEST%20John%27s%20Birthday&event_type=birthday_party&desired_date=2024-11-17&desired_time=9pm&head_count=100&desired_space=board-room&full_name=TEST%20John%20Choura&email=hi%40john.design&phone=555-555-5555

export function InquireFormContainer() {
  const router = useRouter();
  const params = useSearchParams();
  const data = getFormData() as FormPage[];
  const [submitLoading, setSubmitLoading] = useState(false);
  const isSubmittingRef = useRef(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [formState, setFormState] = useState<FormState>({});
  const hasStartedRef = useRef(false);

  // console.log({ formState, data });

  // Writes a value into form state. Shared by real user input and by the
  // prefill effect below — prefill must not read as the visitor starting.
  const setFieldValue = (
    fieldName: FieldTypeValues,
    value: any,
    page_key: any,
    validations: any
  ): void => {
    const isValid = validateValueWithRule(value, validations);

    // console.log("isValid", isValid);

    const error = !isValid ? validations.error_message : "";

    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: {
        value: value || "",
        show_error: error,
        isValid,
        page_key,
        validations,
      },
    }));
  };

  const handleFormChange: HandleFormFunction = (
    fieldName,
    value,
    page_key,
    validations
  ) => {
    // First real interaction with the form. Everything between reaching
    // /inquire and submitting used to be dark — 811 high-intent visitors left
    // in 90 days with no trace of how far they got. This is the near end of
    // that gap; conversion.inquiry_step and _blocked cover the middle.
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      trackEvent("conversion.inquiry_start", {
        step: currentPage,
        field: String(fieldName),
      });
    }
    setFieldValue(fieldName, value, page_key, validations);
  };

  const handleFormBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // console.log("handleFormBlur", e);
  };

  const handleFormSubmit = async () => {
    const emailValue = String(formState?.email?.value || "").trim();
    if (!emailValue) {
      trackEvent("conversion.inquiry_blocked", {
        step: currentPage,
        fields: "email",
        field_count: 1,
      });
      return toastEmailRrequired();
    }
    if (!isValidEmail(emailValue)) {
      trackEvent("conversion.inquiry_blocked", {
        step: currentPage,
        fields: "email",
        field_count: 1,
      });
      return toastSubmitError();
    }
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setSubmitLoading(true);

    try {
      toastSubmit();
      trackEvent("conversion.inquiry_submit", {
        event_type: String(formState?.event_type?.value || ""),
      });

      const {
        additional_details,
        desired_date,
        desired_space,
        desired_time,
        email,
        event_name,
        event_type,
        full_name,
        head_count,
        phone,
      } = formState;

      const data = {
        additional_details: additional_details?.value || "",
        desired_date: formatDate(String(desired_date.value)),
        desired_space: formatTitle(String(desired_space.value)),
        desired_time: desired_time.value,
        email: email.value,
        event_name: event_name.value,
        event_type: formatTitle(String(event_type.value)),
        full_name: full_name.value,
        head_count: parseInt(String(head_count.value)),
        phone: formatPhoneForDatabase(String(phone.value)),
      };

      // console.log({ formState, data });

      await axios.post("/api/add-to-database", data);

      await axios.post("/api/send-client-email", {
        email: email.value,
        formState,
      });

      trackEvent("conversion.inquiry_success", {
        event_type: String(formState?.event_type?.value || ""),
      });
      toastSubmitSuccess();
      router.push("/thanks");
    } catch (error) {
      console.error(error);
      isSubmittingRef.current = false;
      setSubmitLoading(false);
      trackEvent("conversion.inquiry_error");
      toastSubmitError();
    }
  };

  useEffect(() => {
    // update formState with url params
    params.forEach((value, key) => {
      if (value) {
        setFieldValue(key as FieldTypeValues, value, 0, null);
      }
    });
  }, [params]);

  return (
    <GridSection
      id="inquire-form"
      topSpacer={"None"}
      bottomSpacer={"None"}
      className={clsx(
        "relative h-[100%] min-h-[100%] auto-rows-[min-content] !gap-0 overflow-y-scroll rounded-tl-md rounded-tr-md bg-bg !px-0 pb-12 lg:pb-0"
      )}
    >
      {data.map((item: FormPage, index: number) => {
        return (
          <InquireFormSection
            key={index}
            step={index}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            lastPage={data.length - 1}
            formState={formState}
            setFormState={setFormState}
            handleFormChange={handleFormChange}
            handleFormBlur={handleFormBlur}
            handleFormSubmit={handleFormSubmit}
            submitLoading={submitLoading}
            {...item}
          />
        );
      })}
    </GridSection>
  );
}
