import React from 'react'
import PropTypes from 'prop-types'
import Buttons from '../components/Buttons'

// Component
const SectionHead = props => {
  return (
    <div className="section--head">
      {
        props.heading &&
        <h2 className={`clearfix display xs-text-center ${props.headingClassName}`}>{props.heading}</h2>
      }
      {
        props.subHead &&
        <p className={`clearfix xs-text-center section--head--caption ${props.subHeadClassName}`}>{props.subHead}</p>
      }
      {
        props.buttons &&
        <Buttons
          className="clearfix xs-flex xs-flex-justify-center"
          buttons={props.buttons ? props.buttons : []}
        />
      }
    </div>
  )
}

export default SectionHead
