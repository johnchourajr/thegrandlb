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
    error,
    pageNumber,
    formNumber,
    isValid,
    mask,
  } = props

  const errorStyles = hasError ? "field-error" : null
  const isValidText = required && !isValid ? "Required" : ""

  return (
    <FormFieldset className={`${className} ${errorStyles}`}>
      <label id={`label-${id}`} className="form-label" htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        value={value}
        step={step}
        min={min}
        onChange={e => props.handleChange(e, pageNumber, formNumber, false)}
        onBlur={e => props.handleChange(e, pageNumber, formNumber, true)}
        type={type}
        className="text-input"
        placeholder={placeholder}
        required={required}
        title={label}
        aria-label={label}
        aria-labelledby={`label-${id}`}
        autoFocus={formNumber === 0 ? true : false}
      />
      { hasError ? <span className="form-feedback"><h6>{error}</h6></span> : <span className="form-feedback"><h6>{isValidText}</h6></span> }
    </FormFieldset>
  )
}

export default FormInput
