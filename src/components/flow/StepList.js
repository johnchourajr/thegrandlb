import React from "react"
import Link, {navigateTo} from 'gatsby-link'


const StepIndex = props => {
  const children = React.Children.map(props.children, (child, i) => {
    const pageNumber = i + 1
    const isActive = i === props.currentStep
    const activeStyles = isActive ? {} : {opacity: .2}

    return(
      <span style={activeStyles}>{pageNumber}</span>
    )
  })
  return (
    <div className="inquire-page--index">
      {children}
    </div>
  )
}


const StepHeader = props => {
  const headerText = props.flowPages[props.currentStep].header

  return (
    <div className="inquire-page--header">
      <StepIndex
        currentStep={props.currentStep}
        children={props.children}
        goToStep={props.goToStep}
      />
      <h1>{headerText}</h1>
    </div>
  )
}

class StepList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentStep: 0,
      totalSteps: this.props.children.length - 1,
    }
  }

  goToStep = (step) => {
    this.setState({ currentStep: step })
  }

  goToPreviousStep = () => {
    this.setState({ currentStep: this.state.currentStep - 1 })
  }

  goToNextStep = () => {
    this.setState({ currentStep: this.state.currentStep + 1 })
  }

  submitAction = (disabled) => {
    if (disabled) {
      console.log('disabled');
    } else {
      sessionStorage.setItem('flowPages', JSON.stringify(this.props.flowPages))
      // const data = JSON.parse(sessionStorage.getItem('flowPages'))
    }
  }

  renderSteps() {
    const children = React.Children.map(this.props.children, (child, index) => {
      const { currentStep, totalSteps } = this.state

      return React.cloneElement(child, {
        isActive: index === currentStep,
        displayPrevious: currentStep > 0,
        displayNext: currentStep < totalSteps,
        displaySubmit: currentStep === totalSteps,
        goToPreviousStep: () => this.goToPreviousStep(),
        goToNextStep: () => this.goToNextStep(),
        submitAction: () => this.submitAction(),
      })
    })

    return children
  }

  render() {
    return (
      <div className="inquire-page clearfix xs-col-12 md-col-10 md-offset-1 lg-col-8 lg-offset-2">
        <StepHeader
          children={this.props.children}
          currentStep={this.state.currentStep}
          goToStep={this.goToStep}
          flowPages={this.props.flowPages}
        />
        {this.renderSteps()}
      </div>
    )
  }
}

export default StepList
