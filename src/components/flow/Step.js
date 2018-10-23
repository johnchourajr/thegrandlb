import React from "react"
import Link, { navigateTo } from 'gatsby-link'

import FormInput from '../FormInput'
import FormSelect from '../FormSelect'
import { slugify } from '../functions/util'


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
    pageNumber,
  } = props

  if (isActive) {
    return (
      <React.Fragment>
        <form className="inquire-page--body xs-col-12">
          {page.forms.map((item, i) => {
            return (
              <StepInput
                key={i}
                pageNumber={pageNumber}
                formNumber={i}
                handleChange={props.handleChange}
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
            disabled={!page.isValid}
          />
          <Submit
            isActive={displaySubmit}
            submitAction={() => props.submitAction()}
            disabled={!page.isValid}
          />
        </div>
      </React.Fragment>
    )
  } else return null
}

const Next = props => {
  const { isActive } = props

  if (isActive) {
    return (
      <button
        className="button"
        onClick={() => props.goToNextStep()}
        type="Next"
        disabled={props.disabled}
      >
        Next
      </button>
    )
  } else return null
}

const Previous = props => {
  const { isActive } = props

  if (isActive) {
    return (
      <button
        className="button button--secondary"
        onClick={() => props.goToPreviousStep()}
        type="Previous"
      >
        Previous
      </button>
    )
  } else return null
}

const Submit = props => {
  const { isActive } = props

  if (isActive) {
    return (
      <button
        className={`button ${props.disabled ? "button--disabled" : null}`}
        onClick={() => props.submitAction(props.disabled)}
        disabled={props.disabled}
      >
        Submit
      </button>
    )
  } else return null
}


export default Step
