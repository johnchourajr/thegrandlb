import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/core/Layout'
import InquiryWrap from '../components/InquiryWrap'
import { goBack } from '../components/functions/util'


const InquirePage = ({ data, status }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <Layout status={status}>
      <InquiryWrap>
        <section className="section section--gradient">
          <div className="container">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <div className="section">
                  <h6>{frontmatter.title}</h6>
                  <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                    {frontmatter.heading}
                  </h2>
                  <Link to="/">Go Back</Link>
                  <HTMLContent className="content" content={html} />
                </div>
              </div>
            </div>
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
