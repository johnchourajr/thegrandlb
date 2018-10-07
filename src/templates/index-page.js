import React from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby-link'

import Content, { HTMLContent } from '../components/Content'
import PageHero from '../components/PageHero'

export const IndexPageTemplate = ({
  heading,
  title,
  content,
  contentComponent
}) => {
  const PageContent = contentComponent || Content

  return (
    <div>
      <PageHero
        title={title} 
        heading={heading}
        img="/img/placeholder--front-img.jpg"
      />
      <section className="section">
        <div className="wrapper">
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
    </div>
  )
}

IndexPageTemplate.propTypes = {
  heading: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const IndexPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <IndexPageTemplate
      contentComponent={HTMLContent}
      heading={frontmatter.heading}
      title={frontmatter.title}
      content={html}
    />
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const basicPageQuery = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
      }
    }
  }
`
