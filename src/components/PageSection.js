import React from 'react'
import PropTypes from 'prop-types'
import SectionHead from './SectionHead'

// Component
const PageSection = props => {

  const sectionClassName = props.sectionClassName ? props.sectionClassName : ''
  const wrapperClassName = props.wrapperClassName ? props.wrapperClassName : ''
  const headingClassName = props.headingClassName ? props.headingClassName : ''


  return (
    <section className={`section ${sectionClassName}`}>
      <div className={`wrapper ${wrapperClassName}`}>
        <SectionHead
          heading={props.heading}
          headingClassName={headingClassName} 
          buttons={props.buttons}
        />
        {props.children}
      </div>
    </section>
  )
}

export default PageSection
