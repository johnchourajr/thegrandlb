import React from 'react'
import PropTypes from 'prop-types'

import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/core/Layout'
import PageHeader from '../components/PageHeader'


const TourTemplatePage = ({ data, status }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <Layout status={status}>
      <PageHeader title={frontmatter.title} heading={frontmatter.heading} />
      <section className="section">
        <div className="wrapper">
          <HTMLContent className="content" content={html} />
        </div>
      </section>
    </Layout>
  )
}

export default TourTemplatePage

export const TourTemplatePageQuery = graphql`
  query TourTemplatePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
      }
    }
  }
`