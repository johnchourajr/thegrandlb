import React from 'react'
import PropTypes from 'prop-types'

import Content, { HTMLContent } from '../components/Content'
import PageHeader from '../components/PageHeader'

export const TourTemplatePageTemplate = ({
  heading,
  title,
  content,
  contentComponent
}) => {
  const PageContent = contentComponent || Content

  return (
    <div>
      <PageHeader title={title} heading={heading} />
      <section className="section">
        <div className="wrapper">
          <PageContent className="content" content={content} />
        </div>
      </section>
    </div>


  )
}

TourTemplatePageTemplate.propTypes = {
  heading: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const TourTemplatePage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <TourTemplatePageTemplate
      contentComponent={HTMLContent}
      heading={frontmatter.heading}
      title={frontmatter.title}
      content={html}
    />
  )
}

TourTemplatePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
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
