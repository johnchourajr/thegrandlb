import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'

// Svg
import Logo from '../svg/Logo'

// Components
import NavbarItem from './NavbarItem'
import NavbarAddressPhone from './NavbarAddressPhone'
import NavbarSocial from './NavbarSocial'

// Data
import * as navData from '../../data/navData'
import * as siteDetails from '../../data/siteDetails'

// Component
const Footer = ({ subNav }) => {
  return(
    <footer className="footer">
      <div className="wrapper footer--upper">
        <div className="footer--col col xs-col-12 md-col-6">
          {navData.footerNav.left.map(item => (
            <NavbarItem key={item.name} noHoverMenu {...item}/>
          ))}
        </div>
        <div className="footer--col col xs-col-12 md-col-6">
          {navData.footerNav.right.map(item => (
            <NavbarItem key={item.name} noHoverMenu {...item}/>
          ))}
          <NavbarSocial className="footer--social" />
        </div>
      </div>
      <div className="wrapper footer--upper">
        <div className="footer--col col xs-col-12">
          <NavbarAddressPhone className="footer--addressphone" />
        </div>
      </div>
      <div className="wrapper">
        <div className="xs-col-12 footer--lower">
          <div className="footer--left">
            <p className="footer--note">© Copyright {Date().split` `[3]}</p>
          </div>
          <div  className="footer--logo">
            <Logo to="/"/>
          </div>
          <div className="footer--right">
            <p className="footer--note">{siteDetails.companyName}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  subNav: PropTypes.object,
}

export default Footer
