import React from 'react'
import PropTypes from 'prop-types'
import Link, { withPrefix } from 'gatsby-link'

// Component
const Buttons = props => {
  if (props.buttons) {
    return (
      <div className={props.className}>
        {props.buttons.map(( item, i ) => {
          const secondary = item.isSecondary ? "button--secondary" : ""
          return(
            <Link
              key={i}
              className={`button ${secondary}`}
              to={item.url}
            >{item.text}</Link>
          )
        })}
      </div>
    )
  } else return null
}

Buttons.propTypes = {
  wrapClass: PropTypes.string,
  buttons: PropTypes.array.isRequired,
}

export default Buttons
