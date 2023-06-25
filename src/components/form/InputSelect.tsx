import { InputProps } from "@/data/form.types";
import clsx from "clsx";

const InputSelect = ({
  name,
  page_key,
  onBlur,
  placeholder,
  handleFormChange,
  validations,
  value,
  options, // Add options prop for select input
  className,
  ...rest
}: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    handleFormChange(name, newValue, page_key, validations);
  };
  const nameString = name.toString();

  return (
    <select
      name={nameString as string}
      onBlur={onBlur}
      onChange={handleChange}
      value={value}
      className={clsx(
        className,
        `!px-2 data-[value='']:text-[rgba(0,0,0,.35)]`
      )}
      data-value={value}
      {...rest}
    >
      <option value="">{placeholder}</option>
      {options.map(({ title, value }: any, key) => (
        <option key={key} value={value}>
          {title}
        </option>
      ))}
    </select>
  );
};

export default InputSelect;
