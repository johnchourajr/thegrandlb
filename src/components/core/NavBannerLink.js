import React from 'react'
import PropTypes from 'prop-types'

const NavBannerLink = props => {
  if (props.button) {
    return (
      <button onClick={props.onClick}>
        {props.button}
      </button>
    )
  } else return null
}

export default NavBannerLink
