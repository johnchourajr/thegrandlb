import React from 'react'
import PropTypes from 'prop-types'
import Buttons from '../components/Buttons'
import PageSection from './PageSection'
import Link, { withPrefix } from 'gatsby-link'

// Component
const PageImage = props => {

  const styles = {
    backgroundImage: `url(${withPrefix(props.img)})`
  }

  return (
    <div className={`page-image page-image-full ${props.className}`}>
      <div className="img" style={styles}/>
      {props.children}
    </div>
  )
}

export default PageImage
