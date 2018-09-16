import React from 'react'
import PropTypes from 'prop-types'

import Navbar from './Navbar'

const Header = ({ mainNav }) => (
  <Navbar mainNav={mainNav}/>
)

Header.propTypes = {
  mainNav: PropTypes.array,
}

export default Header
