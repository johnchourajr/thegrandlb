import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'

const Footer = ({ subNav }) => (
  <footer className="container">
    {/*<nav className="navbar is-transparent">
      <div className="container">
        <div className="navbar-start">
          {subNav.map(item => (
            <Link key={item.name} className="navbar-item" to={item.path}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>*/}
    <div className="container">
      <div className="columns">
        <div className="column">
          <Link className="navbar-item" to={'/'}>Home</Link>
        </div>
        <div className="column">
          <Link className="navbar-item" to={'/tour'}><b>Tour</b></Link>
          <Link className="navbar-item" to={'/tour'}>Overview</Link>
          <Link className="navbar-item" to={'/tour/grand-ballroom'}>The Grand Ballroom</Link>
          <Link className="navbar-item" to={'/tour/catalina-room'}>The Catalina Room</Link>
          <Link className="navbar-item" to={'/tour/monarch-room'}>The Monarch Room</Link>
          <Link className="navbar-item" to={'/tour/garden-room'}>The Garden Room</Link>
          <Link className="navbar-item" to={'/tour/pacific-room'}>The Pacific Room</Link>
          <Link className="navbar-item" to={'/tour/board-room'}>The Board Room</Link>
          <Link className="navbar-item" to={'/tour/palm-courtyard'}>The Palm Courtyard</Link>
        </div>
        <div className="column">
          <Link className="navbar-item" to={'/events'}><b>Events</b></Link>
          <Link className="navbar-item" to={'/events'}>Overview</Link>
          <Link className="navbar-item" to={'/events/milestones'}>For Milestones</Link>
          <Link className="navbar-item" to={'/events/business'}>For Business</Link>
          <Link className="navbar-item" to={'/events/weddings'}>For Weddings</Link>
        </div>
        <div className="column">
          <Link className="navbar-item" to={'/menus'}><b>Menus</b></Link>
          <Link className="navbar-item" to={'/menus'}>Overview</Link>
          <Link className="navbar-item" to={'/menus/classic'}>Classic Menus</Link>
          <Link className="navbar-item" to={'/menus/milestones'}>Milestones Menus</Link>
          <Link className="navbar-item" to={'/menus/business'}>Corporate Menus</Link>
          <Link className="navbar-item" to={'/menus/weddings'}>Weddings Menus</Link>
        </div>
        <div className="column">
          <Link className="navbar-item" to={'/about'}>About</Link>
          <br />
          <Link className="navbar-item" to={'/contact'}>Contact</Link>
          <br />
          <Link className="navbar-item" to={'/inquire'}>Inquire</Link>
        </div>
      </div>
    </div>
  </footer>

)

Footer.propTypes = {
  subNav: PropTypes.array,
}

export default Footer
