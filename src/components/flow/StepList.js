import React from "react";
import ReactGA from "react-ga";

import { AnimatePresence, motion } from "framer-motion";

import StepBanner from "./StepBanner";

const StepIndex = (props) => {
  const children = React.Children.map(props.children, (child, i) => {
    const pageNumber = i + 1;
    const isActive = i === props.currentStep;
    const activeStyles = isActive ? {} : { opacity: 0.2 };

    return <span style={activeStyles}>{pageNumber}</span>;
  });
  return <div className="inquire-page--index">{children}</div>;
};

const StepHeader = (props) => {
  const headerText = props.flowPages[props.currentStep].header;

  const nameValue = props.flowPages[0].forms[0].value;
  const nameValid = props.flowPages[0].forms[0].isValid;
  const eventType = props.flowPages[1].forms[1].value;

  // use eventTypes to switch through text for each event type
  const eventText = (eventType) => {
    switch (eventType) {
      case "Wedding Ceremony & Reception":
        return "Let's make your special day unforgettable!";
      case "Wedding Reception":
        return "We'll create the perfect setting for your reception!";
      case "Wedding Ceremony":
        return "Your beautiful ceremony awaits!";
      case "Business":
        return "Let's help you make your event a success!";
      case "Conference/Workshop":
        return "We'll set the stage for learning and collaboration!";
      case "Luncheon":
        return "Ready for a delightful meal together?";
      case "Dinner":
        return "We'll ensure a memorable dining experience!";
      case "School Event":
        return "Let's celebrate your school's achievements!";
      case "Anniversary":
        return "Here's to making more cherished memories!";
      case "Sweet 16/Quince":
        return "A special day for a milestone celebration!";
      case "Birthday Party":
        return "Let's plan an amazing birthday party!";
      case "Holiday Party":
        return "Celebrate the season in style!";
      case "Party":
        return "We're excited to help plan your party!";
      case "Fundraiser":
        return "We'll support your cause every step of the way!";
      case "Memorial":
        return "Our condolences, together we'll honor their memory.";
      case "Other":
        return "Tell us your vision, and we'll make it a reality!";
      default:
        return false;
    }
  };

  return (
    <div className="inquire-page--header">
      <StepIndex
        currentStep={props.currentStep}
        children={props.children}
        goToStep={props.goToStep}
      />
      <h1 className="h3 display xs-text-center">{headerText}</h1>
      <AnimatePresence>
        {nameValid && (
          <motion.div
            animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
          >
            <p style={{ textAlign: "center" }}>Hello, {nameValue}!</p>
          </motion.div>
        )}
        {props.currentStep >= 1 && eventText(eventType) && (
          <motion.div
            animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
          >
            <p style={{ textAlign: "center" }}>{eventText(eventType)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

class StepList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      totalSteps: this.props.children.length - 1,
    };
  }

  goToStep = (step) => {
    this.setState({ currentStep: step });
  };

  goToPreviousStep = (e) => {
    const step = this.state.currentStep - 1;

    this.setState({ currentStep: step });
    ReactGA.event({
      category: "InquiryFlow",
      action: `Back To Step ${step + 1}`,
    });
  };

  goToNextStep = (e) => {
    const step = this.state.currentStep + 1;

    this.setState({ currentStep: step });
    ReactGA.event({
      category: "InquiryFlow",
      action: `Proceed To Step ${step + 1}`,
    });
  };

  submitAction = (disabled) => {
    if (disabled) {
    } else {
      sessionStorage.setItem("flowPages", JSON.stringify(this.props.flowPages));
      ReactGA.event({
        category: "InquiryFlow",
        action: "Inquiry Submitted",
      });
      // ReactGA.set({ userName: this.props.flowPages[2].forms[0].value });
    }
  };

  renderSteps() {
    // console.log({currentStep: this.state.currentStep, totalSteps: this.state.totalSteps});

    const children = React.Children.map(this.props.children, (child, index) => {
      const { currentStep, totalSteps } = this.state;

      return React.cloneElement(child, {
        currentStep: currentStep,
        isActive: index === currentStep,
        displayPrevious: currentStep > 0,
        displayNext: currentStep < totalSteps,
        displaySubmit: currentStep === totalSteps,
        goToPreviousStep: (e) => this.goToPreviousStep(e),
        goToNextStep: (e) => this.goToNextStep(e),
        submitAction: () => this.submitAction(),
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
