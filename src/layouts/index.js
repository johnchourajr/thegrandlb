import React from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group';

import Head from '../components/core/Head'
import Header from '../components/core/Header'
import Footer from '../components/core/Footer'
import * as navDetails from '../data/navDetails'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../styles/all.scss'

const TemplateWrapper = ({ children, location, props }) => {
  return (
    <React.Fragment>
      <Head location={location}/>
      <Header mainNav={navDetails.mainNav} inquireNav={navDetails.inquireNav}/>
      <div className="bodyWrap" data-status="">
        {children()}
      </div>
      <Footer subNav={navDetails.subNav} />
    </React.Fragment>
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
