/* eslint-disable */

import React from "react";
import ReactGA from "react-ga";

import StepList from "./StepList";
import Step from "./Step";

import { v4 as uuidv4 } from "uuid";

// TEST STRING
// /inquire?glb-event-type=Wedding&glb-event-name=The%20Wedding&glb-rooms=The%20Grand%20Ballroom&glb-guest-count=100&glb-contact-name=John&glb-contact-method=Phone%20and%20Email&glb-contact-email=jchoura@me.com&glb-contact-phone=5555555555

// TEST STRING 2 (ON A SUNDAY)
// /inquire?glb-contact-email=test%40test.test&glb-contact-method=Phone&glb-contact-name=This+is+just+a+test&glb-contact-phone=5555555555&glb-date=2019-09-22&glb-event-name=Test&glb-event-type=Wedding+Reception&glb-guest-count=100&glb-rooms=The+Grand+Ballroom&glb-time=8am

// ".con" TEST STRING
// /inquire?glb-contact-email=test%40test.con&glb-contact-method=Phone&glb-contact-name=This+is+just+a+test&glb-contact-phone=5555555555&glb-date=2019-09-22&glb-event-name=Test&glb-event-type=Wedding+Reception&glb-guest-count=100&glb-rooms=The+Grand+Ballroom&glb-time=8am

import * as util from "../functions/util";

class StepFlow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flowPages: this.props.flowPages,
      doneUrl: "",
      activePageNumber: "0",
      uuid: uuidv4(),
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.setQueryValues = this.setQueryValues.bind(this);
  }

  componentDidMount() {
    this.setQueryValues();

    ReactGA.event({
      category: "InquiryFlow",
      action: `Started at Step 1`,
    });
  }

  querySetFormValue(variable, page, field) {
    const queryVariable = util.getQueryVariable(variable);

    if (queryVariable) {
      let variable = util.replaceAll(queryVariable, "+", " ");
      let newState = Object.assign({}, this.state);
      newState.flowPages[page].forms[field].value = variable;
      this.setState(newState, () => this.validateField(page, field, variable));
    }
  }

  setQueryValues() {
    this.querySetFormValue("glb-event-type", 0, 0);
    this.querySetFormValue("glb-event-name", 0, 1);
    this.querySetFormValue("glb-date", 1, 0);
    this.querySetFormValue("glb-time", 1, 1);
    this.querySetFormValue("glb-rooms", 1, 2);
    this.querySetFormValue("glb-guest-count", 1, 3);
    this.querySetFormValue("glb-contact-name", 2, 0);
    this.querySetFormValue("glb-contact-method", 2, 1);
    this.querySetFormValue("glb-contact-email", 2, 2);
    this.querySetFormValue("glb-contact-phone", 2, 3);
  }

  validatePage(page, field, value) {
    const thisPage = this.state.flowPages[page];
    let isValid = false;

    if (thisPage.forms.length === 1) {
      const fieldOne = thisPage.forms[0].isValid;
      isValid = fieldOne ? true : false;
    } else if (thisPage.forms.length === 2) {
      const fieldOne = thisPage.forms[0].isValid;
      const fieldTwo = thisPage.forms[1].isValid;
      isValid = fieldOne && fieldTwo ? true : false;
    } else if (thisPage.forms.length === 3) {
      const fieldOne = thisPage.forms[0].isValid;
      const fieldTwo = thisPage.forms[1].isValid;
      const fieldThree = thisPage.forms[2].isValid;
      isValid = fieldOne && fieldTwo && fieldThree ? true : false;
    } else if (thisPage.forms.length === 4) {
      const fieldOne = thisPage.forms[0].isValid;
      const fieldTwo = thisPage.forms[1].isValid;
      const fieldThree = thisPage.forms[2].isValid;
      const fieldFour = thisPage.forms[3].isValid;
      isValid = fieldOne && fieldTwo && fieldThree && fieldFour ? true : false;
    } else if (thisPage.forms.length === 5) {
      const fieldOne = thisPage.forms[0].isValid;
      const fieldTwo = thisPage.forms[1].isValid;
      const fieldThree = thisPage.forms[2].isValid;
      const fieldFour = thisPage.forms[3].isValid;
      const fieldFive = thisPage.forms[4].isValid;
      isValid =
        fieldOne && fieldTwo && fieldThree && fieldFour && fieldFive
          ? true
          : false;
    } else if (thisPage.forms.length === 6) {
      const fieldOne = thisPage.forms[0].isValid;
      const fieldTwo = thisPage.forms[1].isValid;
      const fieldThree = thisPage.forms[2].isValid;
      const fieldFour = thisPage.forms[3].isValid;
      const fieldFive = thisPage.forms[4].isValid;
      const fieldSix = thisPage.forms[5].isValid;
      isValid =
        fieldOne && fieldTwo && fieldThree && fieldFour && fieldFive && fieldSix
          ? true
          : false;
    }

    let newState = Object.assign({}, this.state);
    newState.flowPages[page].isValid = isValid;

    this.setState(newState);
  }

  validateField(page, field, value, blur) {
    const thisField = this.state.flowPages[page].forms[field];
    const validate = thisField.validate;
    const fieldType = thisField.type;
    let isValid = false;

    if (validate) {
      const regexp = new RegExp(validate);
      isValid = value.match(regexp) ? true : false;
    } else {
      isValid = thisField.value ? true : false;
    }

    // Weird edge-case where someone enters ".con"
    if (fieldType === "email" && thisField.value.includes(".con")) {
      console.log("Email includes a typo of '.con'");
      isValid = false;
    }

    let newState = Object.assign({}, this.state);
    newState.flowPages[page].forms[field].isValid = isValid;

    let hasError = newState.flowPages[page].forms[field].hasError;

    if (isValid) {
      newState.flowPages[page].forms[field].hasError = false;
    } else {
      if (blur) {
        newState.flowPages[page].forms[field].hasError = true;
      } else {
        newState.flowPages[page].forms[field].hasError = false;
      }
    }

    this.setState(newState, () => this.validatePage(page, field, value));
  }

  handleFormChange(event, page, field, blur) {
    let value = event.target.value;
    let newState = Object.assign({}, this.state);
    newState.flowPages[page].forms[field].value = value;

    this.setState(newState, () => {
      this.validateField(page, field, value, blur);
      this.buildUrlQuery(page, field, value);
    });
  }

  buildUrlQuery(page, field, value) {
    const { flowPages } = this.state;
    const string = flowPages.map((el, i) => {
      return el.forms.map((el, i) => {
        return `${el.id}=${el.value}&`;
      });
    });
    const str = `?${string[0]}${string[1]}${string[2]}`;
    const commaRemove = ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const doneUrl = str.replace(new RegExp(commaRemove, "gi"), "");

    this.setState({ doneUrl: doneUrl });
  }

  render() {
    const { flowPages, doneUrl, activePageNumber } = this.state;

    return (
      <React.Fragment>
        <StepList
          flowPages={flowPages}
          siteBanner={this.props.siteBanner}
          bannerDismissState={this.props.bannerDismissState}
          handleBannerDismiss={this.props.handleBannerDismiss}
        >
          {flowPages.map((page, i) => {
            return (
              <Step
                key={i}
                pageNumber={i}
                page={page}
                handleChange={this.handleFormChange}
                setQueryValues={this.setQueryValues}
                doneUrl={doneUrl}
                activePageNumber={activePageNumber}
              />
            );
          })}
        </StepList>
      </React.Fragment>
    );
  }
}

export default StepFlow;
