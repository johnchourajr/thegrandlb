import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// Svg
import Logo from '../svg/Logo'

// Components
import NavbarWrap from './NavbarWrap'
import NavbarItem from './NavbarItem'
import NavbarMobileButton from './NavbarMobileButton'
import NavbarMobileMenu from './NavbarMobileMenu'
import NavBanner from './NavBanner'
import X from '../svg/X'

// Util Functions
import { mobileMenuToggle } from '../functions/util'

const bannerData = {
  show: true,
  dismissed: false,
  text: "Choose a Friday or Sunday to qualify for our special deal.",
  button: "Learn More",
  startDate: "09/10/2019",
  endDate: "10/15/2019",
  modalDetail: {
    title: "Featured Deal",
    description: "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Sed posuere consectetur est at lobortis. Curabitur blandit tempus porttitor.",
    buttonText: "Inquire About Friday or Sunday",
    buttonUrl: "/inquire/?deal=fridaysunday",
  }
}

// Component
const Navbar = ({ mainNav, inquireNav }) => {
  return (
    <NavbarWrap>
      <NavBanner
        {...bannerData}
      />
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
