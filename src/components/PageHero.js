import React from 'react'
import PropTypes from 'prop-types'
import Link, { withPrefix } from 'gatsby-link'
import Buttons from './Buttons'

// Component
const PageHero = props => {
  return(
    <div>
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
      <div className="wrapper page-hero--buttons">
        <Buttons
          className="xs-flex xs-flex-justify-space-between"
          buttons={props.buttons}
        />
      </div>
    </div>
  )
}

PageHero.propTypes = {
  heading: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
}

export default PageHero
