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
    doneUrl,
  } = props

  const activeStyles = !isActive ? {display: 'none'} : {display: 'inherit'}

  // if (isActive) {
    return (
      <div style={activeStyles}>
        <input type="hidden" name="utf8" value="✓"/>
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
        <div className="inquire-page--footer xs-col-12">
          <Previous
            isActive={displayPrevious}
            goToPreviousStep={() => props.goToPreviousStep()}
          />
          <Next
            isActive={displayNext}
            goToNextStep={() => {
              props.goToNextStep()
              props.setQueryValues
            }}
            disabled={!page.isValid}
          />
          <Submit
            isActive={displaySubmit}
            submitAction={() => props.submitAction()}
            disabled={!page.isValid}
            doneUrl={doneUrl}
          />
        </div>
      </div>
    )
  // } else return null
}

const Next = props => {
  const { isActive } = props

  if (isActive) {
    return (
      <div
        className="button"
        onClick={() => props.goToNextStep()}
        type="Next"
        disabled={props.disabled}
      >
        Next
      </div>
    )
  } else return null
}

const Previous = props => {
  const { isActive } = props

  if (isActive) {
    return (
      <div
        className="button button--secondary"
        onClick={() => props.goToPreviousStep()}
        type="Previous"
      >
        Previous
      </div>
    )
  } else return null
}

const Submit = props => {
  const { isActive, doneUrl } = props

  if (isActive) {
    return (
      <button
        type="submit"
        className={`button ${props.disabled ? "button--disabled" : null}`}
        onClick={() => {
          props.submitAction(props.disabled)
          // navigateTo(`/inquire/done${doneUrl}`)
        }}
        disabled={props.disabled}
      >
        Submit
      </button>
    )
  } else return null
}


export default Step
