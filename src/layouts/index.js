import React from 'react'
import PropTypes from 'prop-types'

import Head from '../components/Head'
import Header from '../components/Header'
import BodyWrap from '../components/BodyWrap'
import Footer from '../components/Footer'
import './all.scss'

const mainNav = [
  {
    name: "Tour",
    path:  "/tour",
  },{
    name: "Events",
    path:  "/events",
  },{
    name: "Menus",
    path:  "/menus",
  },{
    name: "About",
    path:  "/about",
  },
]

const subNav = [
  {
    name: "Contact",
    path:  "/contact",
  },{
    name: "Inquire",
    path:  "/inquire",
  },
]

const TemplateWrapper = ({ children }) => (
  <div>
    <Head />
    <Header mainNav={mainNav}/>
    <BodyWrap inner={children} />
    <Footer subNav={subNav} />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
