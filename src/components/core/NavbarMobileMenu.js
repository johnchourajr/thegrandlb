import React, { Component } from "react"
import Link from 'gatsby-link'

// Components
import SvgIcon from '../svg/SvgIcon'
import NavbarMobileButton from './NavbarMobileButton'
import NavbarAddressPhone from './NavbarAddressPhone'
import NavbarSocial from './NavbarSocial'

//Data
import { menuNav, socialNav } from '../../data/navDetails'
import { siteDetails } from '../../data/siteDetails'

// Util Functions
import { mobileNavNav } from '../functions/util'

// Component
const NavbarMobileMenu = props => (
  <div id="nav--mobile-menu--overlay" className="nav--mobile-menu--overlay ">
    <div className="links--section links--main">
      {menuNav.map((item, i) => {
        return (
          <div key={i}>
            <Link className="bold xs-block" onClick={() => mobileNavNav()} to={item.path}>{item.name}</Link>
          </div>
        )
      })}
    </div>
    <NavbarSocial className="links--section links--social" />
    <NavbarAddressPhone className="links--section links--footer" />
  </div>
)


export default NavbarMobileMenu
