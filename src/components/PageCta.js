import React from 'react'
import PropTypes from 'prop-types'
import Buttons from '../components/Buttons'
import PageSection from './PageSection'

// Component
const PageCta = props => {

  return (
    <PageSection>
      <h2 className="display xs-text-center">{props.heading}</h2>
      <Buttons
        className="xs-flex xs-flex-justify-center"
        buttons={props.buttons}
      />
      <img src={props.img} />
    </PageSection>
  )
}

export default PageCta
