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
  }

  render() {
    const {
      flowPages
    } = this.state

    return (
      <React.Fragment>
        <StepList inquiryForms={flowPages}>
          {flowPages.map((page, i) => {
            return (
              <Step page={page}/>
            )
          })}
        </StepList>
        <div>
          <ul>
            {flowPages.map((page, i) => (
                <li>
                  {page.header}
                  <ul>
                    {page.forms.map((form, i) => (
                        <React.Fragment>
                          <li>{form.label}</li>
                          <li>{form.value}</li>
                        </React.Fragment>
                      ))
                    }
                  </ul>
                </li>
              )
            )}
          </ul>
        </div>
      </React.Fragment>
    )
  }
}

export default StepFlow;
