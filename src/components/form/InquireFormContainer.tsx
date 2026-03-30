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

//?event_name=Sample%20Event&event_type=party&desired_date=2024-11-17&desired_time=9pm&head_count=100&desired_space=board-room&full_name=Sample%20Person&email=sample.person%40example.com&phone=555-555-5555&additional_details=This%20is%20a%20sample%20inquiry%20for%20local%20testing

export function InquireFormContainer() {
  const router = useRouter();
  const params = useSearchParams();
  const data = getFormData() as FormPage[];
  const [submitLoading, setSubmitLoading] = useState(false);
  const isSubmittingRef = useRef(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [formState, setFormState] = useState<FormState>({});

  // console.log({ formState, data });

  const handleFormChange = (
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

  const handleFormBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // console.log("handleFormBlur", e);
  };

  const handleFormSubmit = async () => {
    const emailValue = String(formState?.email?.value || "").trim();
    if (!emailValue) return toastEmailRrequired();
    if (!isValidEmail(emailValue)) return toastSubmitError();
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setSubmitLoading(true);

    try {
      toastSubmit();

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

      toastSubmitSuccess();
      router.push("/thanks");
    } catch (error) {
      console.error(error);
      isSubmittingRef.current = false;
      setSubmitLoading(false);
      toastSubmitError();
    }
  };

  useEffect(() => {
    // update formState with url params
    params.forEach((value, key) => {
      if (value) {
        handleFormChange(key as FieldTypeValues, value, 0, null);
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
