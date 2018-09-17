import React from 'react'
import PropTypes from 'prop-types'

const BodyWrap = ({ children }) => (
  <div className="bodyWrap">
    {children()}
  </div>
)

BodyWrap.propTypes = {
  inner: PropTypes.func,
}

export default BodyWrap
