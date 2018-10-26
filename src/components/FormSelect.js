import React from "react"
import Link, { navigateTo } from 'gatsby-link'

import FormFieldset from './FormFieldset'
import { slugify } from './functions/util'

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
    hasError,
    pageNumber,
    formNumber,
  } = props

  const optionsArray = options.map((item, i) => {
    return <option key={i} value={item}>{item}</option>
  })
  return(
    <FormFieldset className={className}>
      <label className="form-label" htmlFor={id}>{label}</label>
      <select
        id={id}
        name={id}
        type={type}
        value={props.value}
        onChange={e => props.handleChange(e, pageNumber, formNumber)}
        className={`xs-col-12 select`}
        placeholder={placeholder}
        required={required}
        multiple={multiple}
        title={label}
        aria-label={label}
        autoFocus={formNumber === 0 ? true : false}
      >
        <option value="" style={{display: 'none'}}>{placeholder}</option>
        {optionsArray}
      </select>
    </FormFieldset>
  )
}

export default FormSelect
