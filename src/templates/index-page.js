import React from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby-link'

// Components
import Content, { HTMLContent } from '../components/Content'
import PageHero from '../components/PageHero'
import PageSection from '../components/PageSection'
import PageCta from '../components/PageCta'
import Buttons from '../components/Buttons'
import PageCarousel from '../components/PageCarousel'

// Data
import siteDetails from '../data/siteDetails'

// Page
export const IndexPageTemplate = ({
  frontmatter
}) => {

  return (
    <div>
      <PageHero
        title={frontmatter.title}
        heading={frontmatter.heading}
        img="/img/placeholder--front-img.jpg"
        buttons={[
          {
            text: "Get a Quote",
            url: "/inquire/",
          },{
            text: "Take a Tour",
            url: "/tour/",
            isSecondary: true,
          }
        ]}
      />
      <PageSection
        heading={frontmatter.subhead}
      />
      <PageSection>
        {frontmatter.topFeatures.map((item, i) => {
          return (
            <div key={i} className="page-feature page-feature--lower-bar col xs-col-12 md-col-4">
              <h1 className="xs-text-center">{item.text}</h1>
            </div>
          )
        })}
      </PageSection>
      <PageCta
        heading={frontmatter.ctaUpper.heading}
        buttons={frontmatter.ctaUpper.buttons}
        img={frontmatter.ctaUpper.img}
      />
      <PageSection
        heading={frontmatter.map.heading}
      >
        <img src={frontmatter.map.img} />
        <h6>Find Us</h6>
        <p>{siteDetails.address1}</p>
        <p>{siteDetails.address2}</p>
      </PageSection>
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
      <PageSection>
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
      </PageSection>
      <PageCta
        heading={frontmatter.ctaLower.heading}
        buttons={frontmatter.ctaLower.buttons}
        img={frontmatter.ctaLower.img}
      />
      <PageSection
        heading={frontmatter.menuFeature.heading} buttons={frontmatter.menuFeature.buttons}
      >
        {frontmatter.menuFeature.imgs.map ((item, i) => {
          return(
            <div key={i} className={`col xs-col-12 menu-feature--${i}`}>
              <img src={item}/>
            </div>
          )
        })}
      </PageSection>
    </div>
  )
}

const IndexPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark
  return (
    <IndexPageTemplate
      frontmatter={frontmatter}
    />
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
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
          }
        }
        map {
          heading
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
