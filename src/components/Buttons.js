import React from 'react'
import PropTypes from 'prop-types'
import Link, { withPrefix, navigateTo } from 'gatsby-link'
import ReactGA from 'react-ga'

function buttonClick(url, event) {
  if (event) {
    ReactGA.event({
      category: event.category,
      action: event.action,
    });
  }
  navigateTo(url)
}

// Component
const Buttons = props => {
  if (props.buttons) {
    return (
      <div className={props.className}>
        {props.buttons.map(( item, i ) => {
          const secondary = item.isSecondary ? "button--secondary" : ""
          return(
            <a
              key={i}
              className={`button ${secondary}`}
              onClick={() => buttonClick(item.url, item.event)}
            >{item.text}</a>
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
