import React from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby-link'

// Component
const PageHero = props => {
  return(
    <section className="page-hero" >
      <div className="img" style={{backgroundImage: `url(${withPrefix(props.img)})`}}></div>
      <div className="wrapper">
        <div className="page-hero--wrap">
          <h1 className="page-hero--headline display">
            {props.heading}
          </h1>
        </div>
      </div>
    </section>
  )
}

PageHero.propTypes = {
  heading: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
}

export default PageHero
