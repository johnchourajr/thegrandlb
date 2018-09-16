import React from 'react'
import PropTypes from 'prop-types'

import Head from '../components/Head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './all.sass'

const TemplateWrapper = ({ children }) => (
  <div>
    <Head />
    <Header />
    <div>{children()}</div>
    <Footer />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
