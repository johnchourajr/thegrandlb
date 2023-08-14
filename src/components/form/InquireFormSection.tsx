import { FormPage } from "@/data/form.types";
import {
  eventInquireNext,
  eventInquirePrev,
  eventInquireSubmit,
  toastNextError,
} from "@/utils/events";
import { formatDate, formatTitle } from "@/utils/utils";
import clsx from "clsx";
import { m } from "framer-motion";
import AppearWrap from "../AppearWrap";
import Button from "../Button";
import Headline from "../Headline";
import Text from "../Paragraph";
import StringText from "../StringText";
import FormItem from "./FormItem";
import { HandleFormFunction } from "./InquireFormContainer";

const getPageInputValues = (formState: any, pageInputKeys: string[]) => {
  const pageInputValues: any = {};

  pageInputKeys.forEach((key) => {
    pageInputValues[key] = formState[key]?.isValid;
  });

  return pageInputValues;
};
const checkIfAllPageValuesAreValid = (pageInputValues: any) => {
  const pageInputValuesArray = Object.values(pageInputValues);

  const allPageValuesAreValid = pageInputValuesArray.every(
    (value) => value === true
  );

  return allPageValuesAreValid;
};

const InquireLastPage = ({ formState }: any) => {
  return (
    <div className="flex flex-col gap-10 pb-10">
      <div className="flex flex-col gap-4">
        <StringText size={"small"} uppercase bold>
          Your Information
        </StringText>
        <div className="flex flex-row flex-wrap gap-5">
          <Text>{formState["full_name"]?.value || ""}</Text>
          <Text className="opacity-20">/</Text>
          <Text>{formState["email"]?.value || ""}</Text>
          <Text className="opacity-20">/</Text>
          <Text>{formState["phone"]?.value || ""}</Text>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <StringText size={"small"} uppercase bold>
          Your Message
        </StringText>
        <Headline size={"lg"} disableMotion>
          You’re inquiring about having a{" "}
          <span className="underline decoration-[2px] underline-offset-4">
            {formatTitle(formState["event_type"]?.value) || ""}
          </span>{" "}
          in{" "}
          <span className="underline decoration-[2px] underline-offset-4">
            {formatTitle(formState["desired_space"]?.value) || ""}
          </span>{" "}
          on{" "}
          <span className="underline decoration-[2px] underline-offset-4">
            {formatDate(formState["desired_date"]?.value) || ""}
          </span>{" "}
          at{" "}
          <span className="underline decoration-[2px] underline-offset-4">
            {formatTitle(formState["desired_time"]?.value) || ""}
          </span>{" "}
          for{" "}
          <span className="underline decoration-[2px] underline-offset-4">
            {formState["head_count"]?.value || ""}
          </span>{" "}
          guests.
        </Headline>
      </div>
    </div>
  );
};

export interface InquireFormSectionProps extends FormPage {
  step: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  lastPage: number;
  formState: any;
  handleFormChange: HandleFormFunction; // Update the type
  handleFormBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleFormSubmit: any;
}

export const InquireFormSection = ({
  title,
  description,
  page_key,
  questions,
  step,
  currentPage,
  setCurrentPage,
  lastPage,
  formState,
  handleFormChange,
  handleFormBlur,
  handleFormSubmit,
}: InquireFormSectionProps) => {
  const pageInputKeys = questions.map((question: any) => question.question_key);
  const pageInputValues = getPageInputValues(formState, pageInputKeys);
  const allPageValuesAreValid = checkIfAllPageValuesAreValid(pageInputValues);

  const handleNextButtonClick = () => {
    if (allPageValuesAreValid) {
      setCurrentPage(step + 1);
      eventInquireNext(step);
    } else {
      console.log("toast error");

      toastNextError(step);
    }
  };

  const handleBackButtonClick = () => {
    setCurrentPage(step - 1);
    eventInquirePrev(step);
  };

  const handleFormSubmitClick = () => {
    handleFormSubmit();
    eventInquireSubmit(step);
  };

  return (
    <m.div
      className={clsx(
        "relative col-span-full mx-5 flex h-fit flex-col items-start justify-center py-5 md:mx-9 md:py-9 xl:mx-12 xl:py-12",
        "after:content[''] after:absolute after:bottom-0 after:h-[3px] after:w-full after:bg-white"
      )}
    >
      <div className="w-full">
        <StringText size={"default"}>
          <StringText as="span" size={"small"} bold>
            {step + 1}
          </StringText>{" "}
          <AppearWrap
            as="span"
            currentPage={currentPage}
            step={step}
            reverseCondition
          >
            {title}
          </AppearWrap>
        </StringText>
      </div>
      <AppearWrap
        className="gap-space relative flex w-full flex-col lg:flex-row"
        currentPage={currentPage}
        step={step}
      >
        <div className="flex grow flex-col justify-between gap-8 pt-4 lg:w-1/4">
          <div className="flex flex-col gap-2">
            <Headline size={"sm"} disableMotion>
              {title}
            </Headline>
            <Text className={"max-w-[18em]"}>{description}</Text>
          </div>
          <div
            className={clsx(
              "--bottom-0 fixed left-0 z-50 flex w-full items-center justify-center gap-6 p-2",
              "lg:--relative lg:--bottom-[unset] lg:sticky  lg:bottom-4 lg:left-[unset] lg:items-start lg:justify-start lg:p-0",
              "via-50% bg-gradient-to-b from-[transparent] to-bg"
            )}
          >
            {step !== 0 && (
              <Button
                as="button"
                className="self-start"
                type={"naked"}
                target="_self"
                buttonType="button"
                onClick={() => handleBackButtonClick()}
                eventNone={true}
                text={"Prev"}
                tabIndex={1}
              />
            )}
            {step !== lastPage && (
              <Button
                as="button"
                className="self-start"
                type={"black"}
                target="_self"
                buttonType="button"
                onClick={() => handleNextButtonClick()}
                eventNone={true}
                text={"Next"}
                tabIndex={1}
              />
            )}
            {step === lastPage && (
              <Button
                as="button"
                className="self-start"
                type={"black"}
                target="_self"
                onClick={handleFormSubmit}
                eventNone={true}
                text={"Submit"}
                tabIndex={1}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-4 lg:w-1/2" tabIndex={-1}>
          {step === lastPage && <InquireLastPage formState={formState} />}
          {questions.map((item, index) => {
            return (
              <FormItem
                key={index}
                value={formState[item.question_key]?.value || ""}
                isValid={formState[item.question_key]?.isValid || false}
                showError={formState[item.question_key]?.show_error || false}
                page_key={page_key}
                handleFormChange={handleFormChange}
                handleFormBlur={handleFormBlur}
                {...item}
              />
            );
          })}
        </div>
        <div className="2xl:w-1/4 " aria-hidden></div>
      </AppearWrap>
    </m.div>
  );
};