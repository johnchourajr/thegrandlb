import React from 'react'
import PropTypes from 'prop-types'
import Buttons from '../components/Buttons'

// Component
const SectionSubHead = props => {

  if (props.subHead || props.buttons) {
    return (
      <div className="section--head">
        <p className={`xs-text-center ${props.headingClassName}`}>{props.subHead}</p>
      </div>
    )
  } else return null
}

export default SectionSubHead
