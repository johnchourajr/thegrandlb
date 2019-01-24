import React from 'react'
import PropTypes from 'prop-types'
import Buttons from '../components/Buttons'
import ReactMarkdown from 'react-markdown'

// Component
const SectionHead = props => {
  return (
    <div className="section--head">
      {
        props.heading &&
        <h2 className={`clearfix display xs-text-center ${props.headingClassName}`}><ReactMarkdown source={props.heading}/></h2>
      }
      {
        props.subHead &&
        <p className={`clearfix xs-text-center section--head--caption ${props.subHeadClassName}`}><ReactMarkdown source={props.subHead}/></p>
      }
      {
        props.caption &&
        <div className={`clearfix ${props.captionClassName}`}>
          <p className="page-header--caption"><ReactMarkdown source={props.caption}/></p>
        </div>
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
