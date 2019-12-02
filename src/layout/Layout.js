import React, { useEffect, useState } from 'react'

import Head from '../components/core/Head'
import Header from '../components/core/Header'
import Footer from '../components/core/Footer'
import * as navDetails from '../data/navDetails'
import * as siteBannerMain from '../data/siteBanner'

import "react-responsive-carousel/lib/styles/carousel.min.css";

const TemplateWrapper = ({ children, history, location, props }) => {

  const [bannerDismissState, handleBannerState] = useState(false)

  const handleBannerDismiss = (bool) => {
    if (bool === true) {
      handleBannerState(true)
      if (typeof window != "undefined") {
        sessionStorage.setItem('bannerDismissState', 'dismissed');
      }
    }
  }

  useEffect(() => {
    if (typeof window != "undefined") {
      if (sessionStorage.getItem('bannerDismissState') === 'dismissed') {
        handleBannerState(true)
        sessionStorage.setItem('bannerDismissState', 'dismissed');
      }
    }
  }, [bannerDismissState])

  console.groupCollapsed("Site credits ✌️")
  console.log("Branding, Art Direction, Web Design, and Web Development by John Choura http://john.design/")
  console.groupEnd()

  const kids = React.Children.map(children, child => {
    return React.cloneElement(child, {
      siteBanner: siteBannerMain.siteBanner,
      bannerDismissState: bannerDismissState,
      handleBannerDismiss: handleBannerDismiss,
    });
  });

  return (
    <React.Fragment>
      <Head location={location}/>
      <Header
        siteBanner={siteBannerMain.siteBanner}
        bannerDismissState={bannerDismissState}
        handleBannerDismiss={handleBannerDismiss}
        mainNav={navDetails.mainNav}
        inquireNav={navDetails.inquireNav}
      />
      <div className="bodyWrap" data-banner-dismissed={bannerDismissState}>
        {kids}
      </div>
      <Footer subNav={navDetails.subNav} />
    </React.Fragment>
  )
}

export default TemplateWrapper
