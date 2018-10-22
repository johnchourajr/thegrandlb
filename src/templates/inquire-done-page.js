import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/core/Layout'
import InquiryWrap from '../components/InquiryWrap'
import { goBack } from '../components/functions/util'


const InquireDonePage = ({ data, status }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <Layout status={status}>
      <InquiryWrap>
        <section className="section">
          <div className="wrapper">
            Done
          </div>
        </section>
      </InquiryWrap>
    </Layout>
  )
}

export default InquireDonePage

export const basicPageQuery = graphql`
  query InquireDonePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
      }
    }
  }
`
