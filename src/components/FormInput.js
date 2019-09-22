import React from "react"

import FormFieldset from './FormFieldset'

const FormInput = props => {
  const {
    label,
    id,
    type,
    value,
    step,
    min,
    placeholder,
    required,
    className,
    hasError,
    pageNumber,
    formNumber,
  } = props

  return (
    <FormFieldset className={className}>
      <label className="form-label" htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        value={value}
        step={step}
        min={min}
        onChange={e => props.handleChange(e, pageNumber, formNumber)}
        type={type}
        className="text-input"
        placeholder={placeholder}
        required={required}
        title={label}
        aria-label={label}
        autoFocus={formNumber === 0 ? true : false}
      />
      { hasError && <span className="form-feedback">Caps lock is on!</span>}
    </FormFieldset>
  )
}

export default FormInput
