import React from 'react'
import Link, {navigateTo} from 'gatsby-link'
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
  } else {
    history.goBack()
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
