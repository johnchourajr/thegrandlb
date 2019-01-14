import React from "react"
import Link, { navigateTo } from 'gatsby-link'

import { slugify } from './functions/util'

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
