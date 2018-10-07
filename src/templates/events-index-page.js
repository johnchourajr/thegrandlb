import React from 'react'
import PropTypes from 'prop-types'

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
        caption={"The Grand is a destination for weddings, meetings, and events of all occasions."}
      />
      <PageSection>
        <div className="col xs-col-12">
          <h3 className="display">Party Like Nobody's Watching</h3>
          <p>More About Parties for Life’s Milestones</p>
        </div>
        <div className="col xs-col-12">
          <h3 className="display">Meetings In Grand Style</h3>
          <p>Learn about Business Meetings</p>
        </div>
        <div className="col xs-col-12">
          <h3 className="display">Get Hitched With Us</h3>
          <p>Learn about Weddings</p>
        </div>
      </PageSection>
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
      }
    }
  }
`
