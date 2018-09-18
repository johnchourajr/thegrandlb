import React from 'react'
import PropTypes from 'prop-types'
import PageTransition from 'gatsby-plugin-page-transitions'
import { Transition } from 'react-transition-group';

class Animate extends React.Component {


}

const BodyWrap = ({ children }) => (
  <div className="bodyWrap">
    {children()}
  </div>
)

BodyWrap.propTypes = {
  inner: PropTypes.func,
}

export default BodyWrap
