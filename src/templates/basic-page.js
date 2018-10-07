import React from 'react'
import PropTypes from 'prop-types'

import Content, { HTMLContent } from '../components/Content'
import PageHeader from '../components/PageHeader'

export const BasicPageTemplate = ({
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

BasicPageTemplate.propTypes = {
  heading: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const BasicPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <BasicPageTemplate
      contentComponent={HTMLContent}
      heading={frontmatter.heading}
      title={frontmatter.title}
      content={html}
    />
  )
}

BasicPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
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
