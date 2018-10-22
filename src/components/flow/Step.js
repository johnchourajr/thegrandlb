import React from "react"
import Link, { navigateTo } from 'gatsby-link'

import { slugify } from '../functions/util'

const Fieldset = props => {
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

const FormInput = props => {
  const {
    label,
    id,
    type,
    options,
    placeholder,
    selected,
    required,
    className,
    hasError
  } = props

  return (
    <Fieldset className={className}>
      <label className="form-label">{label}</label>
      <input id={id} type={type} className="text-input" required={required}/>
      { hasError && <span className="form-feedback">Caps lock is on!</span>}
    </Fieldset>
  )
}

const FormSelect = props => {
  const {
    label,
    id,
    type,
    options,
    placeholder,
    selected,
    required,
    className,
    hasError
  } = props

  const optionsArray = options.map((item, i) => {
    return <option value={slugify(item)}>{item}</option>
  })
  return(
    <Fieldset className={className}>
      <label className="form-label">{label}</label>
      <select id={id} type={type} className={`xs-col-12 select`} required={required}>
        {optionsArray}
      </select>
    </Fieldset>
  )
}

const StepInput = props => {
  const {
    type
  } = props

  if (type === "select") {
    return(
      <FormSelect
        {...props}
      />
    )
  } else {
    return(
      <FormInput
        {...props}
      />
    )
  }
}

const Step = props => {
  const {
    isActive,
    displayPrevious,
    displayNext,
    displaySubmit,
    component,
    children,
    page,
  } = props

  if (isActive) {
    return (
      <React.Fragment>
        <form className="inquire-page--body xs-col-12">
          {page.forms.map((item, i) => {
            return (
              <StepInput
                key={i}
                {...item}
              />
            )
          })}
        </form>
        <div className="inquire-page--footer xs-col-12">
          <Previous
            isActive={displayPrevious}
            goToPreviousStep={() => props.goToPreviousStep()}
          />
          <Next
            isActive={displayNext}
            goToNextStep={() => props.goToNextStep()}
          />
          <Submit isActive={displaySubmit} />
        </div>
      </React.Fragment>
    )
  } else return null
}

const Next = props => {
  const { isActive } = props

  if (isActive) {
    return (
      <Link onClick={() => props.goToNextStep()}>
        Next
      </Link>
    )
  } else return null
}

const Previous = props => {
  const { isActive } = props

  if (isActive) {
    return (
      <Link onClick={() => props.goToPreviousStep()}>
        Previous
      </Link>
    )
  } else return <div/>
}

const Submit = props => {
  const { isActive } = props

  if (isActive) {
    return (
      <Link to={'/inquire/done'}>
        Submit
      </Link>
    )
  } else return null
}


export default Step
