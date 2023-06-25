import { InputProps } from "@/data/form.types";
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

  const formatPhoneNumber = (phoneNumberString: string) => {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return (
        match[1] +
        (match[1] && match[2] ? "-" : "") +
        match[2] +
        (match[2] && match[3] ? "-" : "") +
        match[3]
      );
    }
    return phoneNumberString;
  };

  const [formattedValue, setFormattedValue] = useState(
    formatPhoneNumber(value)
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
