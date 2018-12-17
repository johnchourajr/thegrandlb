import React from 'react'
import PropTypes from 'prop-types'
import Link, { withPrefix } from 'gatsby-link'

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
import AmenetiesArray from '../components/AmenetiesArray'
import RoomSwitch from '../components/RoomSwitch'
import FilterList from '../components/FilterList'
import Video from '../components/Video'


const EventsTemplatePage = ({ data, status, location, pathContext }) => {
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
        caption={frontmatter.carousel && frontmatter.carousel.description}
      />
      {frontmatter.carousel && <PageSection><PageCarousel
        items={[...frontmatter.carousel.array]}
        settings={{
          showIndicators: true,
          infiniteLoop: true,
          emulateTouch: true,
        }}
      /></PageSection>}
      <PageSection>
        {frontmatter.statement.map((item, i) => {
          return (
            <p key={i} className="page-statement large xs-text-center">{item}</p>
          )
        })}
        <NumberArray
          array={frontmatter.numbers.array}
        />
      </PageSection>

      <PageSection
        heading={frontmatter.filterlist.heading}
        caption={frontmatter.filterlist.description}
      >
        <FilterList
          data={posts}
          targetFilter={frontmatter.filterlist.filtertype}
        />
      </PageSection>
      <PageSection
        topDivider
        heading={frontmatter.cta.heading}
        headingClassName={"xs-mb3"}
        buttons={frontmatter.cta.buttons}
      />
    </Layout>
  )
}

export default EventsTemplatePage

export const basicPageQuery = graphql`
  query EventsTemplatePage($id: String!) {
    pageData: markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        heading
        carousel {
          description
          array {
            img
            caption
          }
        }
        statement
        numbers {
          array {
            number
            suffix
            description
            isMin
          }
        }
        filterlist {
          heading
          description
          filtertype
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
