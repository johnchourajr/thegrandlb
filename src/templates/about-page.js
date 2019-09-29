import React from 'react'
import { graphql } from 'gatsby'

// Components
import Layout from '../components/core/Layout'
import PageHeader from '../components/PageHeader'
import PageSection from '../components/PageSection'
import PageCta from '../components/PageCta'
import RatingsSection from '../components/RatingsSection'
import ReviewsSection from '../components/ReviewsSection'

// Page
const AboutPage = ({ data, status }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout status={status} >
      <PageHeader
        title={frontmatter.title}
        heading={frontmatter.heading}
      />
      <PageSection>
        <div className="col xs-col-12 md-offset-1 md-col-10 ">
          <img src={'/img/about/team-cheers.jpg'} alt="Our Team"/>
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
          <img src={'/img/about/team-sales.jpg'} alt="Sales Team"/>
        </div>
      </PageSection>
      <PageSection wrapperClassName={"about--highlights"}>
        <div className="about--highlights--text col xs-col-12 md-col-5"><h3 className="display">{"Top Notch\nKitchen Staff"}</h3></div>
        <div className="col xs-col-12 md-col-7 ">
          <img src={'/img/about/team-jesus.jpg'} alt="Kitchen Staff"/>
        </div>
      </PageSection>
      <PageSection
        heading={"We\'re\nValidated"}
        sectionClassName="section--flush-bottom"
        topDivider
      >
        <RatingsSection />
      </PageSection>
      <PageSection sectionClassName="section--flush-top">
        <ReviewsSection />
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
                  <img className="front" src={item.imgFront} alt={item.name}/>
                  {item.imgBack && <img className="back" src={item.imgBack} alt={item.name}/>}
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
