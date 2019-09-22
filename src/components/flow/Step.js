import React from "react"

import FormInput from '../FormInput'
import FormSelect from '../FormSelect'


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
    currentStep,
    isActive,
    displayPrevious,
    displayNext,
    displaySubmit,
    page,
    pageNumber,
    doneUrl,
  } = props

  const activeStyles = !isActive ? {display: 'none'} : {display: 'inherit'}

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
            props.setQueryValues()
          }}
          disabled={!page.isValid}
        />
        <Submit
          isActive={displaySubmit}
          currentStep={currentStep}
          submitAction={() => props.submitAction()}
          disabled={!page.isValid}
          doneUrl={doneUrl}
        />
      </div>
    </div>
  )
}

const Next = props => {
  const { isActive } = props

  console.log(props);

  if (isActive) {
    return (
      <div
        className={`button ${props.disabled && "button--disabled"}`}
        onClick={() => !props.disabled && props.goToNextStep()}
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
  const { isActive, doneUrl, currentStep } = props

  if (isActive && currentStep === 2) {
    return (
      <button
        type="submit"
        className={`button ${props.disabled ? "button--disabled" : null}`}
        onMouseOver={() => props.submitAction(props.disabled)}
        onClick={() => {
          props.submitAction(props.disabled)
        }}
        disabled={props.disabled}
      >
        Submit
      </button>
    )
  } else return null
}


export default Step
