import React from 'react'
import PropTypes from 'prop-types'
import Link, { withPrefix } from 'gatsby-link'

// Components
import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/core/Layout'
import PageHero from '../components/PageHero'
import PageSection from '../components/PageSection'
import PageCta from '../components/PageCta'
import Buttons from '../components/Buttons'
import PageCarousel from '../components/PageCarousel'
import MapSection from '../components/MapSection'
import NumberArray from '../components/NumberArray'
import RatingsSection from '../components/RatingsSection'

// Data
import { siteDetails } from '../data/siteDetails'

// Util Functions
import * as util from '../components/functions/util'

// Page
const IndexPage = ({ data, status }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <Layout status={status} >
      <PageHero
        title={frontmatter.title}
        heading={frontmatter.heading}
        video={{
          source: [
            { src: '/video/home.compressed.mp4', type: 'video/mp4'},
            { src: '/video/home.compressed.ogv', type: 'video/ogv'},
            { src: '/video/home.compressed.webm', type: 'video/webm'},
          ],
          poster: "/video/home-poster.jpg",
        }}
        img="/img/placeholder--front-img.jpg"
        buttons={[
          {
            text: "Get a Quote",
            url: "/inquire/",
            event: {
              category: 'InquireAction',
              action: 'homeInquireAction'
            },
          },{
            text: "Take a Tour",
            url: "/tour/",
            event: {
              category: 'TourAction',
              action: 'homeTourAction'
            },
            isSecondary: true,
          }
        ]}
      />
      <PageSection
        heading={frontmatter.subhead}
      />
      <PageSection
        wrapperClassName="page-feature--wrapper"
      >
        {frontmatter.topFeatures.map((item, i) => {
          return (
            <div key={i} className="page-feature page-feature--lower-bar col xs-col-12 md-col-4">
              <Link to={item.url}>
                <h1 className="xs-text-center">{item.text}</h1>
              </Link>
            </div>
          )
        })}
      </PageSection>
      <PageCta
        accent={'grandPink'}
        heading={frontmatter.ctaUpper.heading}
        buttons={frontmatter.ctaUpper.buttons}
        img={frontmatter.ctaUpper.img}
      />
      <MapSection
        heading={frontmatter.map.heading}
        mapLink={util.addressLink(siteDetails.address1, siteDetails.address2)}
        address1={siteDetails.address1}
        address2={siteDetails.address2}
        features={frontmatter.map.features}
      />
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
      <NumberArray
        heading={frontmatter.numbers.heading}
        array={frontmatter.numbers.array}
      />
      <RatingsSection />
      <PageCta
        heading={frontmatter.ctaLower.heading}
        buttons={frontmatter.ctaLower.buttons}
        img={frontmatter.ctaLower.img}
      />
      <PageSection
        heading={frontmatter.menuFeature.heading}
        headingClassName={"xs-mb3"}
        buttons={frontmatter.menuFeature.buttons}
      >
        <div className="menu-feature--wrap gutters clearfix">
          <div className={`col xs-offset-1 xs-col-10 md-ml0 md-col-7 xs-my2 menu-feature--1`}>
            <img src={frontmatter.menuFeature.imgs[0]}/>
          </div>
          <div className={`col xs-offset-1 xs-col-10 md-ml0 md-col-5 xs-my2 menu-feature--2`}>
            <img src={frontmatter.menuFeature.imgs[1]}/>
          </div>
          <div className={`col xs-offset-1 xs-col-10 md-offset-1 md-col-6 lg-offset-3 lg-col-4 xs-my2 menu-feature--3`}>
            <img src={frontmatter.menuFeature.imgs[2]}/>
          </div>
        </div>
      </PageSection>
    </Layout>
  )
}

export default IndexPage

export const basicPageQuery = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
        headingButtons {
          text
          url
          isSecondary
        }
        subhead
        topFeatures {
          text
          url
        }
        ctaUpper {
          img
          accent
          heading
          buttons {
            text
            url
            event {
              category
              action
            }
          }
        }
        map {
          heading
          features
        }
        carousel {
          array {
            img
            caption
          }
        }
        numbers {
          heading
          array {
            prefix
            number
            suffix
            caption
          }
        }
        ctaLower {
          img
          accent
          heading
          buttons {
            text
            url
            event {
              category
              action
            }
          }
        }
        menuFeature {
          heading
          buttons {
            text
            url
            isSecondary
          }
          imgs
        }
      }
    }
  }
`
