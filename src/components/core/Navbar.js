import React from "react"
import PropTypes from 'prop-types'

// Svg
import Logo from '../svg/Logo'

// Components
import NavbarWrap from './NavbarWrap'
import NavbarItem from './NavbarItem'
import NavbarMobileButton from './NavbarMobileButton'
import NavbarMobileMenu from './NavbarMobileMenu'

// Util Functions
import { mobileMenuToggle } from '../functions/util'

// Component
const Navbar = ({ mainNav, inquireNav }) => {
  return (
    <NavbarWrap>
      <div className="wrapper">
        <div className="nav--left">
          {mainNav.left.map(item => (
            <NavbarItem key={item.name} {...item}/>
          ))}
        </div>
        <div className="nav--logo">
          <Logo to="/"/>
          <NavbarMobileButton onClick={() => mobileMenuToggle()}/>
        </div>
        <div className="nav--right">
          {mainNav.right.map(item => (
            <NavbarItem key={item.name} {...item}/>
          ))}
        </div>
      </div>
      <div className="nav--overlay"/>
      <NavbarMobileMenu/>
    </NavbarWrap>
  )
}

Navbar.propTypes = {
  mainNav: PropTypes.object,
}

export default Navbar
