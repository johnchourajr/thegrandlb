import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'

const Footer = ({ subNav }) => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-start">
        {subNav.map(item => (
          <Link key={item.name} className="navbar-item" to={item.path}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  </nav>
)

Footer.propTypes = {
  subNav: PropTypes.array,
}

export default Footer
