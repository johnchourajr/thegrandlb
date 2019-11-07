import React, { useRef, useEffect, useState } from 'react'

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
      console.log("Banner Just Dismissed");
      handleBannerState(true)
      sessionStorage.setItem('bannerDismissState', 'dismissed');
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('bannerDismissState') === 'dismissed') {
      console.log("Banner Already Dismissed");
      handleBannerState(true)
      sessionStorage.setItem('bannerDismissState', 'dismissed');
    }
  }, [bannerDismissState])

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
