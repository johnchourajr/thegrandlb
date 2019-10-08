import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/core/Layout'
import InquiryWrap from '../components/InquiryWrap'
import StepFlow from '../components/flow/StepFlow'

import inquiryForms from '../data/inquiryForms'

const InquirePage = ({ data, status, location, history }) => {

  return (
    <Layout status={status}>
      <InquiryWrap history={history}>
        <section className="section">
          <div className="wrapper">
            <StepFlow flowPages={inquiryForms}/>
          </div>
        </section>
      </InquiryWrap>
    </Layout>
  )
}

export default InquirePage

export const basicPageQuery = graphql`
  query InquirePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
      }
    }
  }
`