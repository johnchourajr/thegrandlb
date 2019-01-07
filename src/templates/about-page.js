import React from 'react'
import PropTypes from 'prop-types'
import Link, { withPrefix } from 'gatsby-link'

// Components
import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/core/Layout'
import PageHero from '../components/PageHero'
import PageHeader from '../components/PageHeader'
import PageSection from '../components/PageSection'
import PageCta from '../components/PageCta'
import Buttons from '../components/Buttons'
import PageCarousel from '../components/PageCarousel'
import MapSection from '../components/MapSection'
import NumberArray from '../components/NumberArray'
import RatingsSection from '../components/RatingsSection'

// Data
import siteDetails from '../data/siteDetails'

// Util Functions
import * as util from '../components/functions/util'

// Page
const AboutPage = ({ data, status }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <Layout status={status} >
      <PageHeader
        title={frontmatter.title}
        heading={frontmatter.heading}
      />
      <PageSection>
        <div className="col xs-col-12 md-offset-1 md-col-10 ">
          <img src={'/img/about/team-cheers.jpg'} />
        </div>
      </PageSection>
      <PageSection
        wrapperClassName="about--founding"
        caption={"Built on a 40+ year legacy.\n\nWe are a family-oriented team creating once in a lifetime experiences for our guests.\n\nOur 65+ talented, energetic, and professional team members produce over 1,000 unique events every year."}
      >
        <h1>Since 1969</h1>
      </PageSection>
      <PageSection wrapperClassName={"about--highlights about--highlights--reverse"}>
        <div className="about--highlights--text col xs-col-12 md-col-5"><h3 className="display">{"Bar None\nEvent Pros"}</h3></div>
        <div className="col xs-col-12 md-col-7 ">
          <img src={'/img/about/team-sales.jpg'} />
        </div>
      </PageSection>
      <PageSection wrapperClassName={"about--highlights"}>
        <div className="about--highlights--text col xs-col-12 md-col-5"><h3 className="display">{"Top Notch\nKitchen Staff"}</h3></div>
        <div className="col xs-col-12 md-col-7 ">
          <img src={'/img/about/team-jesus.jpg'} />
        </div>
      </PageSection>
      <PageSection
        heading={"We're\nValidated"}
        topDivider
      >
        <RatingsSection />
      </PageSection>
      <PageSection
        heading={frontmatter.people.heading}
        topDivider
      >
        <div className="section gutters people--wrap clearfix">
          {frontmatter.people.array.map((item, i) => {
            return (
              <div key={i} className="col people--item xs-col-6 md-col-4">
                <div className="people--item--img">
                  <img className="front" src={item.imgFront}/>
                  {item.imgBack && <img className="back" src={item.imgBack}/>}
                </div>
                <div key={i} className="hash-item">
                  <h2 className="">{item.name}</h2>
                  <h6 className="xs-mt1 xs-text-6">{item.title}</h6>
                </div>
              </div>
            )
          })}
        </div>
      </PageSection>
      <PageCta
        heading={frontmatter.ctaLower.heading}
        buttons={frontmatter.ctaLower.buttons}
        img={frontmatter.ctaLower.img}
      />
    </Layout>
  )
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
        people {
          heading
          array {
            name
            title
            imgFront
            imgBack
            quote
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
      }
    }
  }
`
