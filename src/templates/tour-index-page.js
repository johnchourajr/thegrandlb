import React from 'react'
import PropTypes from 'prop-types'
import Link, { withPrefix } from 'gatsby-link'

import Content, { HTMLContent } from '../components/Content'
import PageHeader from '../components/PageHeader'
import PageSection from '../components/PageSection'
import PageCta from '../components/PageCta'
import Buttons from '../components/Buttons'
import PageCarousel from '../components/PageCarousel'
import NumberArray from '../components/NumberArray'

import Map from '../components/svg/Map';

export const TourIndexTemplate = ({ frontmatter, posts }) => {
  return (
    <div>
      <PageHeader title={frontmatter.title} heading={frontmatter.heading} />
      <div className="page-image-full ">
        <div className="img" style={{backgroundImage: `url(${withPrefix(frontmatter.hero)})`}}></div>
      </div>
      <PageSection
        heading={frontmatter.map.heading}
      />
      <div className="map-svg--wrapper">
        <Map/>
      </div>
      <PageSection
        buttons={frontmatter.map.buttons}
      />
      <PageSection heading={'Yours By Design'}>
        <div className="clearfix gutters card-wrap">
          {posts.map(({ node: post }) => (
            <div key={post.id} className="col xs-col-6">
              <div className="card">
                <Link to={post.fields.slug}>
                  {post.frontmatter.heading}
                </Link>
              </div>
          </div>
          ))}
        </div>
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
    </div>
  )
}

const TourIndex = ({ data }) => {
  const { frontmatter, html } = data.pageData
  const { edges: posts } = data.postData

  return (
    <TourIndexTemplate
      frontmatter={frontmatter}
      posts={posts}
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
          }
        }
      }
    }
  }
`
