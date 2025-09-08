"use client";

import { InputProps } from "@/data/form.types";
import { formatPhoneNumber } from "@/utils/phone-formatter";
import clsx from "clsx";
import { useState } from "react";

const InputPhone = ({
  name,
  page_key,
  onBlur,
  placeholder,
  handleFormChange, // Destructure handleFormChange
  validations,
  value,
  options,
  className,
  ...rest
}: InputProps) => {
  const nameString = name.toString();

  const [formattedValue, setFormattedValue] = useState(
    formatPhoneNumber(String(value))
  );

  const formatPhoneNumberOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    const formattedValue = formatPhoneNumber(newValue);
    setFormattedValue(formattedValue);
    handleFormChange(name, newValue, page_key, validations);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const formattedValue = formatPhoneNumber(newValue);
    setFormattedValue(formattedValue);
    handleFormChange(name, newValue, page_key, validations);
    onBlur;
  };

  return (
    <input
      name={nameString}
      onBlur={handleBlur}
      onChange={formatPhoneNumberOnChange}
      placeholder={placeholder}
      className={clsx(className, `placeholder:text-[rgba(0,0,0,.35)]`)}
      value={formattedValue} // Pass value prop
      {...rest}
    />
  );
};

export default InputPhone;
