import React from 'react'
import PropTypes from 'prop-types'
import Content, { HTMLContent } from '../components/Content'

export const BasicPageTemplate = ({
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
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
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
