import React from 'react'
import PropTypes from 'prop-types'

import StepList from './StepList'
import Step from './Step'

import inquiryForms from '../../data/inquiryForms'

class StepFlow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      flowPages: this.props.flowPages
    }

    this.handleFormChange = this.handleFormChange.bind(this);
  }

  validatePage(page, field, value) {
    const thisPage = this.state.flowPages[page]
    let isValid = false

    if (thisPage.forms.length === 1) {
      const fieldOne = thisPage.forms[0].isValid
      isValid = fieldOne ? true : false
    } else if (thisPage.forms.length === 2) {
      const fieldOne = thisPage.forms[0].isValid
      const fieldTwo = thisPage.forms[1].isValid
      isValid = fieldOne && fieldTwo ? true : false
    } else if (thisPage.forms.length === 3) {
      const fieldOne = thisPage.forms[0].isValid
      const fieldTwo = thisPage.forms[1].isValid
      const fieldThree = thisPage.forms[2].isValid
      isValid = fieldOne && fieldTwo && fieldThree ? true : false
    } else if (thisPage.forms.length === 4) {
      const fieldOne = thisPage.forms[0].isValid
      const fieldTwo = thisPage.forms[1].isValid
      const fieldThree = thisPage.forms[2].isValid
      const fieldFour = thisPage.forms[3].isValid
      isValid = fieldOne && fieldTwo && fieldThree && fieldFour ? true : false
    }

    let newState = Object.assign({}, this.state)
    newState.flowPages[page].isValid = isValid

    this.setState(newState)
    // console.log(`Page: ${isValid}`)
  }

  validateField(page, field, value) {
    const thisField = this.state.flowPages[page].forms[field]
    const validate = thisField.validate
    let isValid = false

    if (validate){
      const regexp = new RegExp(validate);
      isValid = value.match(regexp) ? true : false
    } else {
      isValid = thisField.value ? true : false
    }

    let newState = Object.assign({}, this.state)
    newState.flowPages[page].forms[field].isValid = isValid

    this.setState(newState,
    () => this.validatePage(page, field, value))
    // console.log(`Field: ${isValid}`)
  }

  handleFormChange(event, page, field) {
    let value = event.target.value
    let newState = Object.assign({}, this.state)
    newState.flowPages[page].forms[field].value = value

    this.setState(newState,
    () => this.validateField(page, field, value))
  }

  render() {
    const {
      flowPages
    } = this.state

    return (
      <React.Fragment>
        <StepList flowPages={flowPages}>
          {flowPages.map((page, i) => {
            return (
              <Step key={i} pageNumber={i} page={page} handleChange={this.handleFormChange}/>
            )
          })}
        </StepList>
      </React.Fragment>
    )
  }
}

export default StepFlow;
