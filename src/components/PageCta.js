import React from 'react'
import PropTypes from 'prop-types'
import Buttons from '../components/Buttons'
import PageSection from './PageSection'
import PageImage from './PageImage'
import Link, { withPrefix } from 'gatsby-link'

// Component
const PageCta = props => {

  return (
    <PageImage
      img={props.img}
      className={`page-cta page-cta--${props.accent}`}
    >
      <div className="page-cta--inner">
        <h2 className="display xs-text-center xs-mb5">{props.heading}</h2>
        <Buttons
          className="xs-flex xs-flex-justify-center"
          buttons={props.buttons}
        />
      </div>
    </PageImage>
  )
}

export default PageCta
