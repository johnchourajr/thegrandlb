import React from 'react'
import PropTypes from 'prop-types'

// Component
const PageHeader = props => {
  return(
    <React.Fragment>
      <section className="page-header">
        <div className="wrapper">
          <div className="page-header--wrap">
            {
              props.title &&
              <h6 className="page-header--eyebrow">{props.title}</h6>
            }
            {
              props.heading &&
              <h2 className="page-header--headline display">{props.heading}</h2>
            }
          </div>
        </div>
        {props.children}
      </section>
      {
        props.caption &&
        <div className="page-header--lower">
          <p className="page-header--caption">{props.caption}</p>
        </div>
      }
    </React.Fragment>

  )
}

PageHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default PageHeader
