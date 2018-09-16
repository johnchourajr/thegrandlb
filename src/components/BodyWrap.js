import React from 'react'
import PropTypes from 'prop-types'

const BodyWrap = ({ inner }) => (
  <div className="bodyWrap">
    {inner()}
  </div>
)

BodyWrap.propTypes = {
  inner: PropTypes.func,
}

export default BodyWrap
