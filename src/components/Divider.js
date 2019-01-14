import React from 'react'

const Divider = props => {
  const MOD = props.bottom ? "bottom" : props.top ? "top" : ""

  return (
    <div className={`divider-bar divider-bar--${MOD}`}></div>
  )
}

export default Divider
