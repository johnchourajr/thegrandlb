import { FormPage } from "@/data/form.types";
import clsx from "clsx";
import { m } from "framer-motion";
import { toast } from "react-hot-toast";
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
    } else {
      toast.error("Please fill in all the required fields");
    }
  };

  return (
    <m.div
      className={clsx(
        "relative col-span-full mx-5 flex h-fit flex-col items-start justify-center py-5 md:mx-9 md:py-9 xl:mx-12 xl:py-12",
        "after:content[''] after:absolute after:bottom-0 after:h-[3px] after:w-full after:bg-white"
      )}
    >
      <div className="--bg-[red] w-full">
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
        className="gap-space --overflow-y-hidden --overflow-x-visible relative flex w-full"
        currentPage={currentPage}
        step={step}
      >
        <div className="flex w-1/4 grow flex-col justify-between gap-8 pt-4">
          <div className="flex flex-col gap-2">
            <Headline size={"sm"} disableMotion>
              {title}
            </Headline>
            <Text className={"max-w-[18em]"}>{description}</Text>
          </div>
          <div className="flex gap-6">
            {step !== 0 && (
              <Button
                as="button"
                className="self-start"
                type={"naked"}
                target="_self"
                buttonType="button"
                onClick={() => setCurrentPage(step - 1)}
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
                text={"Submit"}
                tabIndex={1}
              />
            )}
          </div>
        </div>
        <div
          className="--bg-[yellow] flex w-1/2 flex-col gap-2 pt-4"
          tabIndex={-1}
        >
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
