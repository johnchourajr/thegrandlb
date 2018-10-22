import React from 'react'
import PropTypes from 'prop-types'
import SectionHead from './SectionHead'
import Divider from './Divider'

// Component
const PageSection = props => {

  const sectionClassName = props.sectionClassName ? props.sectionClassName : ''
  const wrapperClassName = props.wrapperClassName ? props.wrapperClassName : ''
  const headingClassName = props.headingClassName ? props.headingClassName : ''

  return (
    <React.Fragment>
      {props.topDivider && <Divider top />}
      <section className={`section ${sectionClassName}`}>
        <div className={`wrapper clearfix ${wrapperClassName}`}>
          <SectionHead
            heading={props.heading}
            headingClassName={headingClassName}
            buttons={props.buttons}
          />
          {props.children}
        </div>
      </section>
      {props.bottomDivider && <Divider bottom />}
    </React.Fragment>
  )
}

export default PageSection
