import React from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'

import Head from '../components/core/Head'
import Header from '../components/core/Header'
import Footer from '../components/core/Footer'
import * as navDetails from '../data/navDetails'

import "react-responsive-carousel/lib/styles/carousel.min.css";

const TemplateWrapper = ({ children, history, location, props }) => {
  return (
    <ParallaxProvider>
      <Head location={location}/>
      <Header mainNav={navDetails.mainNav} inquireNav={navDetails.inquireNav}/>
      <div className="bodyWrap">
        {children}
      </div>
      <Footer subNav={navDetails.subNav} />
    </ParallaxProvider>
  )
}

export default TemplateWrapper
