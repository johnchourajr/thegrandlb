import React from 'react'
import PropTypes from 'prop-types'

import Content, { HTMLContent } from '../components/Content'
import PageHeader from '../components/PageHeader'
import PageSection from '../components/PageSection'
import PageCta from '../components/PageCta'
import Buttons from '../components/Buttons'
import PageCarousel from '../components/PageCarousel'

export const TourIndexTemplate = ({ frontmatter }) => {
  return (
    <div>
      <PageHeader title={frontmatter.title} heading={frontmatter.heading} />
      <img src={frontmatter.hero} />
      <PageSection
        heading={frontmatter.map.heading}
        buttons={frontmatter.map.buttons}
      />
      <PageSection heading={'Yours By Design'}>
        <div className="clearfix gutters">
          <div className="card col xs-col-6 fill-gray">...</div>
          <div className="card col xs-col-6 fill-gray">...</div>
          <div className="card col xs-col-6 fill-gray">...</div>
          <div className="card col xs-col-6 fill-gray">...</div>
          <div className="card col xs-col-6 fill-gray">...</div>
          <div className="card col xs-col-6 fill-gray">...</div>
        </div>
      </PageSection>
      <PageSection
        heading={frontmatter.numbers.heading}
      >
        <div className="clearfix gutters">
          {frontmatter.numbers.array.map((item, i) => {
            return (
              <div key={i} className="col xs-col-12 md-col-4">
                {item.prefix}
                {item.number}
                {item.suffix}
                {item.caption}
                {item.description}
              </div>
            )
          })}
        </div>
      </PageSection>
      <PageSection
        heading={frontmatter.carousel.heading}
      >
        <PageCarousel
          items={[...frontmatter.carousel.array]}
          settings={{
            showIndicators: true,
            infiniteLoop: true,
            emulateTouch: true,
          }}
        />
      </PageSection>
      <PageSection
        heading={frontmatter.cta.heading}
        buttons={frontmatter.cta.buttons}
      />
    </div>
  )
}

const TourIndex = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <TourIndexTemplate
      frontmatter={frontmatter}
    />
  )
}

TourIndex.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default TourIndex

export const basicPageQuery = graphql`
  query TourIndex($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
        hero
        map {
          heading
          buttons {
            text
            url
            isSecondary
          }
        }
        roomlist
        numbers {
          heading
          array {
            prefix
            number
            suffix
            caption
            description
          }
        }
        carousel {
          heading
          array {
            img
            caption
          }
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
