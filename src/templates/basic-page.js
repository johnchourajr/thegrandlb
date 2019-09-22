import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/core/Layout'
import PageHeader from '../components/PageHeader'



const BasicPage = ({ data, status }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <Layout status={status}>
      <PageHeader title={frontmatter.title} heading={frontmatter.heading} />
      <section className="basic-page section">
        <div className="wrapper clearfix">
          <div className="xs-col-12 md-offset-2 md-col-8">
            <HTMLContent className="content" content={html} />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default BasicPage

export const basicPageQuery = graphql`
  query BasicPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
      }
    }
  }
`
