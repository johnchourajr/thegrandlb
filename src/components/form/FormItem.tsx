"use client";

import { Question } from "@/data/form.types";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Text from "../Paragraph";
import StringText from "../StringText";
import InputBasic from "./InputBasic";
import InputDateSelect from "./InputDateSelect";
import InputPhone from "./InputPhone";
import InputSelect from "./InputSelect";
import InputTextArea from "./InputTextArea";
import { HandleFormFunction } from "./InquireFormContainer";

interface FormItemProps extends Question {
  page_key?: string;
  component?: any;
  value: string | number;
  isValid?: boolean;
  showError?: string | boolean;
  onBlur?: () => void;
  onChange?: () => void;
  handleFormChange: HandleFormFunction;
  handleFormBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const FormItem = ({
  title,
  placeholder,
  question_key,
  question_type,
  error_message,
  data_type,
  value,
  onBlur,
  component: Input = InputBasic,
  isValid,
  showError,
  handleFormChange,
  handleFormBlur,
  page_key,
  required,
  ...rest
}: FormItemProps) => {
  const [hasBlurred, setHasBlurred] = useState<boolean>(true);

  useEffect(() => {}, []);

  const inputId = `field-${String(question_key)}`;
  const errorId = `${inputId}-error`;

  const componentMap = {
    dropdown: InputSelect,
    number: InputBasic,
    text: InputBasic,
    text_area: InputTextArea,
    date_picker: InputDateSelect,
    phone: InputPhone,
  };

  Input = componentMap[question_type] || InputBasic;

  const handleBlur = () => {
    setHasBlurred(true);
    handleFormBlur;
  };

  const hasError = !isValid && hasBlurred && showError;

  return (
    <motion.div
      className={clsx(
        "relative flex h-16 flex-col rounded-[.33rem] bg-white lg:h-16",
        question_type === "text_area" && "!h-48",
      )}
      data-valid={hasError}
    >
      <label
        htmlFor={inputId}
        className="pointer-events-none relative z-10 translate-x-[-.075em] px-3 py-1"
      >
        <StringText as="span" size={"small"} bold uppercase>
          {title}
          {required && (
            <span className="text-red" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </StringText>
      </label>
      <AnimatePresence>
        {hasError && (
          <motion.div
            id={errorId}
            role="alert"
            className="absolute right-0 top-0 z-10 flex w-1/2 flex-row justify-end gap-1 px-3 py-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Text size="small" className={"text-red"}>
              {showError}
            </Text>
          </motion.div>
        )}
        {isValid && (
          <motion.div
            className="absolute right-0 top-0 z-10 flex w-1/2 flex-row justify-end gap-1 px-3 py-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Text size="small" className={"text-black"} aria-hidden="true">
              ✓
            </Text>
          </motion.div>
        )}
      </AnimatePresence>

      <Input
        id={inputId}
        name={question_key}
        placeholder={placeholder}
        onBlur={handleBlur}
        handleFormChange={handleFormChange}
        value={value}
        type={data_type}
        page_key={page_key}
        aria-required={required ? true : undefined}
        aria-invalid={hasError ? true : undefined}
        aria-describedby={hasError ? errorId : undefined}
        className={clsx(
          "!absolute !inset-0 z-0 box-border min-h-full min-w-full rounded-[.33rem] px-3 pb-2 pt-7",
          hasError && "border border-red",
        )}
        {...rest}
      />
    </motion.div>
  );
};

export default FormItem;
