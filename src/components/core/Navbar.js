import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'

import logo from '../../img/logo.svg'

const Navbar = ({ mainNav, inquireNav }) => {

  return (
    <nav className="navbar is-transparent">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <strong>The Grand</strong>
          </Link>
        </div>
        <div className="navbar-start">
          {mainNav.map(item => (
            <Link
              key={item.name}
              className="navbar-item"
              to={item.path}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="navbar-end">
          <Link className="navbar-item" to="/Inquire">
            Inquire
          </Link>
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  mainNav: PropTypes.array,
}

export default Navbar
