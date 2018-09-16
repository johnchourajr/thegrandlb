import React from 'react'
import Link from 'gatsby-link'

import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'

const Navbar = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <strong>The Grand</strong>
        </Link>
      </div>
      <div className="navbar-start">
        <Link className="navbar-item" to="/tour">
          Tour
        </Link>
        <Link className="navbar-item" to="/events">
          Events
        </Link>
        <Link className="navbar-item" to="/menus">
          Menus
        </Link>
        <Link className="navbar-item" to="/about">
          About
        </Link>
      </div>
    </div>
  </nav>
)

export default Navbar
