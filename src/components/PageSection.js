import React from 'react'
import SectionHead from './SectionHead'
import Divider from './Divider'
import ScrollAnimate from './ScrollAnimate'

// Component
const PageSection = props => {

  return (
    <ScrollAnimate disabled={props.disabledAnimation}>
      {props.topDivider && <Divider top />}
      <section className={`section ${props.sectionClassName}`}>
        <div className={`wrapper clearfix ${props.wrapperClassName} no-print`}>
          <SectionHead
            heading={props.heading}
            headingClassName={props.headingClassName}
            headingTag={props.headingTag}
            subHead={props.subHead}
            subHeadClassName={props.subHeadClassName}
            subHeadTag={props.subHeadTag}
            caption={props.caption}
            captionClassName={props.captionClassName}
            buttons={props.buttons}
          />
          {props.children}
        </div>
      </section>
      {props.bottomDivider && <Divider bottom />}
    </ScrollAnimate>
  )
}

export default PageSection
