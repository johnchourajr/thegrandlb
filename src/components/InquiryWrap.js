import React from 'react'
import { navigateTo } from 'gatsby'
import ReactGA from 'react-ga'
import _ from 'lodash'

export const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'stretch',
  minHeight: '800px',
  height: '100vh',
  top: '0',
  width: '100vw',
  opacity: 1,
  zIndex: 9,
}

const InquiryCloseButton = props => (
  <button
    id="inquiry-page--close-button"
    onClick={props.onClick}
    className="inquiry-page--close-button"
  >
    <span></span>
  </button>
)

function handleBack(history) {
  if (_.isUndefined(history)) {
    navigateTo("/")
    ReactGA.event({
      category: 'InquiryFlow',
      action: `Exit Inquiry Flow`
    });
  } else {
    history.goBack()
    ReactGA.event({
      category: 'InquiryFlow',
      action: `Exit Inquiry Flow`
    });
  }
}

const InquiryWrap = ({ history, children }) => {
  return (
    <div style={style}>
      <InquiryCloseButton onClick={() => handleBack(history)}/>
      {children}
    </div>
  )
}

export default InquiryWrap
