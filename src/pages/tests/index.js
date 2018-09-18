import React from 'react'
import Link from 'gatsby-link'
import PageTransition from 'gatsby-plugin-page-transitions'

import InquiryWrap from '../../components/InquiryWrap'

const PageOne = () => (
  <h2>Hello world on page one!</h2>
)

const PageTwo = () => (
  <h2>We have a second page.</h2>
)

const PageThree = () => (
  <h2>Page three is working.</h2>
)

const Default = () => (
  <InquiryWrap>
    <h1>Inquiry Page Test</h1>
    <Link to="/inquire">Close</Link>
  </InquiryWrap>
)

export default Default
