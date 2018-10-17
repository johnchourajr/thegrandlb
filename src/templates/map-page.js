import React from 'react'
import PropTypes from 'prop-types'

import Content, { HTMLContent } from '../components/Content'
import PageHeader from '../components/PageHeader'

export const MapPageTemplate = ({
  heading,
  title,
  content,
  contentComponent
}) => {
  const PageContent = contentComponent || Content

  return (
    <div>
      
    </div>


  )
}

MapPageTemplate.propTypes = {
  heading: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const MapPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <MapPageTemplate
      contentComponent={HTMLContent}
      heading={frontmatter.heading}
      title={frontmatter.title}
      content={html}
    />
  )
}

MapPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default MapPage

export const MapPageQuery = graphql`
  query MapPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
      }
    }
  }
`
