import React from "react";
import ReactGA from "react-ga";

import StepBanner from "./StepBanner";

const StepIndex = props => {
  const children = React.Children.map(props.children, (child, i) => {
    const pageNumber = i + 1;
    const isActive = i === props.currentStep;
    const activeStyles = isActive ? {} : { opacity: 0.2 };

    return <span style={activeStyles}>{pageNumber}</span>;
  });
  return <div className="inquire-page--index">{children}</div>;
};

const StepHeader = props => {
  const headerText = props.flowPages[props.currentStep].header;

  return (
    <div className="inquire-page--header">
      <StepIndex
        currentStep={props.currentStep}
        children={props.children}
        goToStep={props.goToStep}
      />
      <h3 className="display xs-text-center">{headerText}</h3>
    </div>
  );
};

class StepList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      totalSteps: this.props.children.length - 1
    };
  }

  goToStep = step => {
    this.setState({ currentStep: step });
  };

  goToPreviousStep = e => {
    const step = this.state.currentStep - 1;

    this.setState({ currentStep: step });
    ReactGA.event({
      category: "InquiryFlow",
      action: `Back To Step ${step + 1}`
    });
  };

  goToNextStep = e => {
    const step = this.state.currentStep + 1;

    this.setState({ currentStep: step });
    ReactGA.event({
      category: "InquiryFlow",
      action: `Proceed To Step ${step + 1}`
    });
  };

  submitAction = disabled => {
    if (disabled) {
    } else {
      sessionStorage.setItem("flowPages", JSON.stringify(this.props.flowPages));
      ReactGA.event({
        category: "InquiryFlow",
        action: "Inquiry Submitted"
      });
      // ReactGA.set({ userName: this.props.flowPages[2].forms[0].value });
    }
  };

  renderSteps() {
    const children = React.Children.map(this.props.children, (child, index) => {
      const { currentStep, totalSteps } = this.state;

      return React.cloneElement(child, {
        currentStep: currentStep,
        isActive: index === currentStep,
        displayPrevious: currentStep > 0,
        displayNext: currentStep < totalSteps,
        displaySubmit: currentStep === totalSteps,
        goToPreviousStep: e => this.goToPreviousStep(e),
        goToNextStep: e => this.goToNextStep(e),
        submitAction: () => this.submitAction()
      });
    });

    return children;
  }

  render() {
    return (
      <div className="inquire-page clearfix xs-col-12 md-col-10 md-offset-1 lg-col-8 lg-offset-2">
        <StepHeader
          children={this.props.children}
          currentStep={this.state.currentStep}
          goToStep={this.goToStep}
          flowPages={this.props.flowPages}
          siteBanner={this.props.siteBanner}
          bannerDismissState={this.props.bannerDismissState}
          handleBannerDismiss={this.props.handleBannerDismiss}
        />
        <form
          className="inquire-page--body xs-col-12"
          acceptCharset="UTF-8"
          action="https://formkeep.com/f/16c7029a33cf"
          method="POST"
        >
          <StepBanner
            flowPages={this.props.flowPages}
            siteBanner={this.props.siteBanner}
            bannerDismissState={this.props.bannerDismissState}
            handleBannerDismiss={this.props.handleBannerDismiss}
          />
          {this.renderSteps()}
        </form>
      </div>
    );
  }
}

export default StepList;
