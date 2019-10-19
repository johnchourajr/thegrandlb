import React from "react"
import FormFieldset from './FormFieldset'

const FormSelect = props => {
  const {
    label,
    id,
    type,
    options,
    placeholder,
    multiple,
    required,
    className,
    pageNumber,
    formNumber,
    isValid,
    hasError,
    error,
  } = props

  const errorStyles = hasError ? "field-error" : null
  const isValidText = required && !isValid ? "Required" : ""

  const optionsArray = options.map((item, i) => {
    return <option key={i} value={item}>{item}</option>
  })
  return(
    <FormFieldset className={`${className} ${errorStyles}`}>
      <label className="form-label" htmlFor={id}>{label}</label>
      <select
        id={id}
        name={id}
        type={type}
        value={props.value}
        onChange={e => props.handleChange(e, pageNumber, formNumber, false)}
        onBlur={e => props.handleChange(e, pageNumber, formNumber, true)}
        className={`xs-col-12 select`}
        placeholder={placeholder}
        required={required}
        multiple={multiple}
        title={label}
        aria-label={label}
        aria-labelledby={`label-${id}`}
        autoFocus={formNumber === 0 ? true : false}
      >
        <option value="" style={{display: 'none'}}>{placeholder}</option>
        {optionsArray}
      </select>
      { hasError ? <span className="form-feedback"><h6>{error}</h6></span> : <span className="form-feedback"><h6>{isValidText}</h6></span> }
    </FormFieldset>
  )
}

export default FormSelect
