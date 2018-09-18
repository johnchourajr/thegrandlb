import React from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group';

import Head from '../components/core/Head'
import Header from '../components/core/Header'
import BodyWrap from '../components/core/BodyWrap'
import Footer from '../components/core/Footer'
import { typographyInject } from '../components/core/Typography'
import { mainNav, subNav, inquireNav } from '../components/data/navData'

import './all.scss'
typographyInject

const TemplateWrapper = ({ children, location }) => {
  return (
    <div>
      <Head location={location}/>
        <Header mainNav={mainNav} inquireNav={inquireNav}/>
        <BodyWrap location={location}>
          {children}
        </BodyWrap>
        <Footer subNav={subNav} />
    </div>
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
