import React from 'react'
import { navigate } from 'gatsby'
import _ from 'lodash'

const CloseButton = props => (
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
    navigate("/")
  } else {
    history.goBack()
  }
}

const InteractiveMapWrap = ({ history, children }) => {
  return (
    <div className="interactive-map">
      <CloseButton onClick={() => handleBack(history)}/>
      {children}
    </div>
  )
}

export default InteractiveMapWrap
