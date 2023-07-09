import {
  FieldTypeValues,
  FormPage,
  FormState,
  getFormData,
} from "@/data/form.types";
import {
  toastEmailRrequired,
  toastSubmitError,
  toastSubmitSuccess,
} from "@/utils/events";
import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GridSection } from "../GridSection";
import { InquireFormSection } from "./InquireFormSection";

export type HandleFormFunction = (
  fieldName: FieldTypeValues,
  value: any,
  page_key: any,
  validations: any
) => void;

//?event_name=John%27s%20Birthday&event_type=birthday_party&desired_date=2024-11-17&desired_time=9pm&head_count=100&desired_space=board-room&full_name=John%20Choura&email=hi%40john.design&phone=555-555-5555&additional_details=This%20is%20a%20test%20inquiry%20from%20the%20website

const InquireFormContainer = ({ ...extra }) => {
  const router = useRouter();
  const data = getFormData() as FormPage[];
  const [currentPage, setCurrentPage] = useState(0);
  const [formState, setFormState] = useState<FormState>({});

  const handleFormChange = (
    fieldName: FieldTypeValues,
    value: any,
    page_key: any,
    validations: any
  ): void => {
    const validateValueWithRegex = (value: string, regex: string) => {
      const regexPattern = new RegExp(regex);

      return regexPattern.test(value);
    };

    const validateValue = (value: string, validations: any) => {
      if (!validations) return true;

      const { rule, value: validation_value } = validations;

      switch (rule) {
        case "regex":
          return validateValueWithRegex(value, validation_value);
        case "min_value":
          return value >= validation_value;
        case "max_length":
          return value.length <= validation_value;
        default:
          return true;
      }
    };

    const isValid = validateValue(value, validations);

    const error = !isValid ? validations.error_message : "";

    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: {
        value: value,
        show_error: error,
        isValid,
        page_key,
        validations,
      },
    }));
  };

  const handleFormBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log("handleFormBlur", e);
  };

  const handleFormSubmit = async () => {
    if (!formState?.email) return toastEmailRrequired();

    try {
      const email = formState.email.value;

      await axios.post("/api/send-client-email", {
        email,
        formState,
      });

      toastSubmitSuccess();
      router.push("/thanks");
    } catch (error) {
      console.error(error);
      toastSubmitError();
    }

    /**
     * @todo: add SMS functionality
     */
    // const phone = formState.phone.value;
    // if (phone) {
    //   try {
    //     await axios.post("/api/send-sms", {
    //       phone: phone.replace(/\D/g, ""),
    //       formState,
    //     });
    //     toast.success("SMS sent successfully");
    //   } catch (error) {
    //     console.error(error);
    //     toast.success("SMS Failed");
    //   }
    // }
  };

  useEffect(() => {
    const urlParams = router.query;

    // update formState with url params
    Object.entries(urlParams).forEach(([key, value]) => {
      if (value) {
        handleFormChange(key as FieldTypeValues, value, 0, null);
      }
    });
  }, [router]);

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
            handleFormChange={handleFormChange}
            handleFormBlur={handleFormBlur}
            handleFormSubmit={handleFormSubmit}
            {...item}
          />
        );
      })}
    </GridSection>
  );
};

export default InquireFormContainer;
