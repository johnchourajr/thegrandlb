"use client";

import { InputProps } from "@/data/form.types";
import clsx from "clsx";

const InputTextArea = ({
  name,
  page_key,
  onBlur,
  placeholder,
  handleFormChange,
  validations,
  value,
  className,
  ...rest
}: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    handleFormChange(name, newValue, page_key, validations);
  };

  const nameString = name.toString();

  return (
    <textarea
      name={nameString}
      onBlur={onBlur}
      onChange={handleChange}
      placeholder={placeholder}
      className={clsx(className, `placeholder:text-[rgba(0,0,0,.35)] `)}
      value={value}
      maxLength={500}
      rows={5}
      {...rest}
    />
  );
};

export default InputTextArea;
