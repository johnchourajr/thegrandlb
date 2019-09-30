import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/core/Layout'
import PageHeader from '../components/PageHeader'
import PageSection from '../components/PageSection'
import PageCarousel from '../components/PageCarousel'
import NumberArray from '../components/NumberArray'
import FilterList from '../components/FilterList'


const EventsTemplatePage = ({ data, status, location, pageContext }) => {
  const { frontmatter } = data.pageData
  const { edges: posts } = data.postData

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
            prefix
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
