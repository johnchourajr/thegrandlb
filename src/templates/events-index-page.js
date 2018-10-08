import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import Content, { HTMLContent } from '../components/Content'
import PageHeader from '../components/PageHeader'
import PageSection from '../components/PageSection'
import PageCta from '../components/PageCta'
import Buttons from '../components/Buttons'
import PageCarousel from '../components/PageCarousel'

export const EventsIndexTemplate = ({ frontmatter }) => {
  return (
    <div>
      <PageHeader
        title={frontmatter.title}
        heading={frontmatter.heading}
        caption={frontmatter.description}
      />
      <PageSection>
        {frontmatter.featureTiles.map((item, i) => {
          return (
            <div className="col xs-col-12">
              <Link to={item.url}>
                <h3 className="display">{item.heading}</h3>
                <p>{item.caption}</p>
                <img src={item.img}/>
              </Link>
            </div>
          )
        })}
      </PageSection>
      <PageSection>
        {frontmatter.statement.map((item, i) => {
          return (
            <p>{item}</p>
          )
        })}
      </PageSection>
      <PageSection>
        <div className="gutters xs-inline-block">
          {frontmatter.exampleEvents.array.map((item, i) => {
            return (
              <div className="col xs-col-4">
                <h3>{item}</h3>
              </div>
            )
          })}
        </div>
      </PageSection>
      <PageSection
        heading={frontmatter.cta.heading}
        buttons={frontmatter.cta.buttons}
      />
    </div>
  )
}

const EventsIndex = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <EventsIndexTemplate
      frontmatter={frontmatter}
    />
  )
}

EventsIndex.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default EventsIndex

export const basicPageQuery = graphql`
  query EventsIndex($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
        description
        featureTiles {
          heading
          caption
          url
          img
        }
        statement
        exampleEvents {
          array
        }
        cta {
          heading
          buttons {
            text
            url
          }
        }
      }
    }
  }
`
