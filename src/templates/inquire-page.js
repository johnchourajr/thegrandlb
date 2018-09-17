import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Content, { HTMLContent } from '../components/Content'

export const InquirePageTemplate = ({
  heading,
  title,
  content,
  contentComponent
}) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h6>{title}</h6>
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {heading}
              </h2>
              <Link to="/tests">Open Test</Link>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

InquirePageTemplate.propTypes = {
  heading: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const InquirePage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <InquirePageTemplate
      contentComponent={HTMLContent}
      heading={frontmatter.heading}
      title={frontmatter.title}
      content={html}
    />
  )
}

InquirePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
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
