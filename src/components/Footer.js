import React from 'react'
import Link from 'gatsby-link'

const Footer = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-start">
        <Link className="navbar-item" to="/contact">
          Contact
        </Link>
        <Link className="navbar-item" to="/inquire">
          Inquire
        </Link>
      </div>
    </div>
  </nav>
)

export default Footer
