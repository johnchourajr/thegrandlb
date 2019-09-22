import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/core/Layout'
import InquiryWrap from '../components/InquiryWrap'
import InquiryDone from '../components/InquiryDone'


const InquireDonePage = ({ data, status }) => {
  return (
    <Layout status={status}>
      <InquiryWrap>
        <InquiryDone/>
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
