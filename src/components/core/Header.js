import React from 'react'
import PropTypes from 'prop-types'

import Navbar from './Navbar'

const Header = ({ mainNav, inquireNav }) => (
  <Navbar mainNav={mainNav} inquireNav={inquireNav}/>
)

Header.propTypes = {
  mainNav: PropTypes.array,
}

export default Header
