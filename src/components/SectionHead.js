import React from 'react'
import PropTypes from 'prop-types'
import Buttons from '../components/Buttons'

// Component
const SectionHead = props => {

  if (props.heading || props.buttons) {
    return (
      <div className="section--head">
        <h2 className="display xs-text-center">{props.heading}</h2>
        <Buttons
          className="xs-flex xs-flex-justify-center"
          buttons={props.buttons ? props.buttons : []}
        />
      </div>
    )
  } else return null
}

export default SectionHead
