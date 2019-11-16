import React from 'react'
import PropTypes from 'prop-types'

import Navbar from './Navbar'

const Header = ({
  siteBanner,
  bannerDismissState,
  handleBannerDismiss,
  mainNav,
  inquireNav
}) => (

  <Navbar
    siteBanner={siteBanner}
    bannerDismissState={bannerDismissState}
    handleBannerDismiss={handleBannerDismiss}
    mainNav={mainNav}
    inquireNav={inquireNav}
  />
)

Header.propTypes = {
  mainNav: PropTypes.object,
}

export default Header
