import { Question } from "@/data/form.types";
import clsx from "clsx";
import { m } from "framer-motion";
import { useState } from "react";
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
  value: any;
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
  ...rest
}: FormItemProps) => {
  const [hasBlurred, setHasBlurred] = useState<boolean>(false);

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
    <m.div
      className={clsx(
        "relative flex h-16 flex-col",
        question_type === "text_area" && "h-48"
      )}
      data-valid={hasError}
    >
      <label className="relative z-10 translate-x-[-.075em] px-3 py-1">
        <StringText as="span" size={"small"} bold uppercase>
          {title}
        </StringText>
      </label>
      <div className="absolute right-0 top-0 z-10 flex w-1/2 flex-row justify-end gap-1 px-3 py-1">
        {hasError && (
          <Text size="small" className={"text-[red]"}>
            {showError}
          </Text>
        )}
      </div>
      <Input
        name={question_key}
        placeholder={placeholder}
        onBlur={handleBlur}
        handleFormChange={handleFormChange}
        value={value}
        type={data_type}
        page_key={page_key}
        className={clsx(
          "absolute z-0 min-h-full min-w-full rounded-[.33rem] px-3 pt-7 pb-2",
          hasError && "border border-[red]"
        )}
        {...rest}
      />
    </m.div>
  );
};

export default FormItem;
