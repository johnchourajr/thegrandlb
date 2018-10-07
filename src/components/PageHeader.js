import React from 'react'
import PropTypes from 'prop-types'

// Component
const PageHeader = props => {
  return(
    <section className="page-header">
      <div className="wrapper">
        <div className="page-header--wrap">
          <h6 className="page-header--eyebrow">{props.title}</h6>
          <h2 className="page-header--headline display">
            {props.heading}
          </h2>
        </div>
      </div>
    </section>
  )
}

PageHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default PageHeader
