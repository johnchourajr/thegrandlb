import React from "react"

const FormFieldset = props => {
  const {
    className,
    children
  } = props

  return (
    <fieldset className={`${className} fieldset`}>
      {children}
    </fieldset>
  )
}

export default FormFieldset
