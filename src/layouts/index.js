import React from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group';

import Head from '../components/core/Head'
import Header from '../components/core/Header'
import Footer from '../components/core/Footer'
import { mainNav, subNav, inquireNav } from '../data/NavData'
import '../styles/all.scss'

const TemplateWrapper = ({ children, location }) => {
  return (
    <div>
      <Head location={location}/>
      <Header mainNav={mainNav} inquireNav={inquireNav}/>
      <div className="bodyWrap">
        {children()}
      </div>
      <Footer subNav={subNav} />
    </div>
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
