import React from 'react'
import PropTypes from 'prop-types'
import SectionHead from './SectionHead'
import Divider from './Divider'

// Component
const PageSection = props => {

  return (
    <React.Fragment>
      {props.topDivider && <Divider top />}
      <section className={`section ${props.sectionClassName}`}>
        <div className={`wrapper clearfix ${props.wrapperClassName} no-print`}>
          <SectionHead
            heading={props.heading}
            headingClassName={props.headingClassName}
            subHead={props.subHead}
            subHeadClassName={props.subHeadClassName}
            caption={props.caption}
            captionClassName={props.captionClassName}
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
