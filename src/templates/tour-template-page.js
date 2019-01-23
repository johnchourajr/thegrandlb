import React from 'react'
import PropTypes from 'prop-types'
import Link, { withPrefix } from 'gatsby-link'

import Star from '../components/svg/Star'
import { slugify } from '../components/functions/util'
import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/core/Layout'
import PageHeader from '../components/PageHeader'
import PageSection from '../components/PageSection'
import PageCta from '../components/PageCta'
import Buttons from '../components/Buttons'
import PageCarousel from '../components/PageCarousel'
import PageSegue from '../components/PageSegue'
import NumberArray from '../components/NumberArray'
import AmenitiesArray from '../components/AmenitiesArray'
import RoomSwitch from '../components/RoomSwitch'
import RoomCard from '../components/RoomCard'
import Video from '../components/Video'

const TourTemplatePage = ({ data, status, location, pathContext }) => {
  const { frontmatter, html } = data.pageData
  const { edges: posts } = data.postData
  const { pathname } = location
  const { next, prev } = pathContext
  const currentPage = slugify(pathname)
  const pageName = currentPage.replace("tour","")

  return (
    <Layout status={status}>
      <PageHeader
        title={'Welcome To'}
        heading={frontmatter.heading}
      />
      <div className="page-image-full page-image-full--clean">
        <Video
        source={[
          { src: `/video/rooms/${pageName}.compressed.mp4`, type: 'video/mp4'},
          { src: `/video/rooms/${pageName}.compressed.ogv`, type: 'video/ogv'},
          { src: `/video/rooms/${pageName}.compressed.webm`, type: 'video/webm'},
        ]}
          poster={`/video/rooms/${pageName}-poster.jpg`}
        />
      </div>
      <NumberArray
        subHead={frontmatter.numbers.subhead}
        array={frontmatter.numbers.array}
        isMin
      />
      <AmenitiesArray
        subHead={frontmatter.amenities.description}
        array={frontmatter.amenities.array}
      />
      <PageSection
        subHead={frontmatter.upgrades.description}
      >
        <div className="xs-flex xs-flex-wrap xs-flex-justify-center xs-pt4">
          {frontmatter.upgrades && frontmatter.upgrades.array.map((item, i) => (
            <div key={i} className={"col xs-pt3 xs-col-12 sm-col-6 md-col-3 xs-flex xs-flex-column xs-flex-align-center"}>
              <p className="xs-text-center text-gray-lightest">{item.text}</p>
            </div>
          ))}
        </div>

      </PageSection>
      {frontmatter.roomswitch && <RoomSwitch
        array={frontmatter.roomswitch.array}
      />}
      <PageSection>
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
        subHead={"Some ideas of the kind of events that work best in this room"}
        bottomDivider
      >
        <div className="clearfix gutters page-list xs-pt6">
          {frontmatter.events.map((item, i) => {
            return (
              <div key={i} className="hash-item page-list--item col xs-col-6 md-col-4">
                <h2 className="-display">{item.text}</h2>
              </div>
            )
          })}
        </div>
      </PageSection>
      <PageSection
        heading={frontmatter.cta.heading}
        headingClassName={"xs-mb3"}
        buttons={frontmatter.cta.buttons}
      />
      <PageSection
        topDivider
        subHead={frontmatter.ctaAllRoom.subhead}
        subHeadClassName={"xs-mb4"}
        buttons={frontmatter.ctaAllRoom.buttons}
      />
    </Layout>
  )
}

export default TourTemplatePage

export const basicPageQuery = graphql`
  query TourTemplatePage($id: String!) {
    pageData: markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        heading
        hero
        metaDescription
        numbers {
          subhead
          array {
            number
            caption
          }
        }
        amenities {
          description
          array {
            img
            text
          }
        }
        upgrades {
          description
          array {
            text
          }
        }
        roomswitch {
          array {
            img
            caption
          }
        }
        carousel {
          heading
          array {
            img
            caption
          }
        }
        events {
          text
          img
        }
        cta {
          heading
          buttons {
            text
            url
          }
        }
        ctaAllRoom {
          subhead
          buttons {
            text
            url
            isSecondary
          }
        }
      }
    }
    postData: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___heading] }
      filter: { frontmatter: { templateKey: { eq: "tour-template-page" } }}
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            heading
          }
        }
      }
    }
  }
`
