import { InputProps } from "@/data/form.types";
import clsx from "clsx";

const InputDateSelect = ({
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    handleFormChange(name, newValue, page_key, validations);

    // console.log(validations);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur();
    const newValue = e.target.value;
    handleFormChange(name, newValue, page_key, validations);
  };

  const nameString = name.toString();

  return (
    <input
      name={nameString}
      onBlur={handleBlur}
      onChange={handleChange}
      placeholder={placeholder}
      className={clsx(
        className,
        `!px-[.65rem] placeholder:text-[rgba(0,0,0,.35)]`
      )}
      value={value} // Pass value prop
      {...rest}
    />
  );
};

export default InputDateSelect;
