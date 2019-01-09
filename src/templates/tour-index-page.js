import React from 'react'
import PropTypes from 'prop-types'
import Link, { withPrefix } from 'gatsby-link'
import _ from 'lodash'

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
import FormSelect from '../components/FormSelect'
import FilterList from '../components/FilterList'
import Video from '../components/Video'

import Map from '../components/svg/Map';


const TourIndex = ({ data, status, location }) => {
  const { frontmatter, html } = data.pageData
  const { edges: posts } = data.postData
  const { pathname } = location
  const currentPage = slugify(pathname)

  return (
    <Layout status={status}>
      <PageHeader title={frontmatter.title} heading={frontmatter.heading} />
      <div className="page-image-full page-image-full--clean">
        <Video
          source={[
            { src: '/video/tour.compressed.mp4', type: 'video/mp4'},
            { src: '/video/tour.compressed.ogv', type: 'video/ogv'},
            { src: '/video/tour.compressed.webm', type: 'video/webm'},
          ]}
          poster={"/video/tour-poster.jpg"}
        />
      </div>
      <PageSection
        heading={frontmatter.map.heading}
      />
      <div className="map-svg--wrapper map-svg">
        <Map/>
      </div>
      <PageSection
        buttons={frontmatter.map.buttons}
      />
      <PageSection heading={'Yours By Design'}>
        <FilterList
          data={posts}
          targetFilter={"all"}
        />
      </PageSection>
      <NumberArray
        heading={frontmatter.numbers.heading}
        array={frontmatter.numbers.array}
      />
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
        headingClassName={"xs-mb3"}
        buttons={frontmatter.cta.buttons}
      />
      <PageSegue
        currentPage={currentPage}
      />
  </Layout>
  )
}


export default TourIndex

export const basicPageQuery = graphql`
  query TourIndex($id: String!) {
    pageData: markdownRemark(id: { eq: $id }) {
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
    postData: allMarkdownRemark(
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
            title
            hero
            path
            roomMeta {
              eventType
              eventTypeInfo {
                type
                description
              }
              roomFeatures
              guestCount
            }
          }
        }
      }
    }
  }
`
