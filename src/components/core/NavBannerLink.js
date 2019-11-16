import React from 'react'

const NavBannerLink = props => {
  if (props.button) {
    return (
      <span className="nav--banner--link" onClick={props.onClick}>
        {props.button}
      </span>
    )
  } else return null
}

export default NavBannerLink
