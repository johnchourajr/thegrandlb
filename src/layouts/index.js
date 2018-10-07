import React from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group';

import Head from '../components/core/Head'
import Header from '../components/core/Header'
import Footer from '../components/core/Footer'
import * as navData from '../data/navData'
import '../styles/all.scss'

const TemplateWrapper = ({ children, location }) => {
  return (
    <div>
      <Head location={location}/>
      <Header mainNav={navData.mainNav} inquireNav={navData.inquireNav}/>
      <div className="bodyWrap">
        {children()}
      </div>
      <Footer subNav={navData.subNav} />
    </div>
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
