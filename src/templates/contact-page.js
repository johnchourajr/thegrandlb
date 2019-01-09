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
import SvgIcon from '../components/svg/SvgIcon'

// Data
import { siteDetails } from '../data/siteDetails'
import { socialNav } from '../data/navDetails'

// Util Functions
import * as util from '../components/functions/util'

// Page
const ContactPage = ({ data, status }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <Layout status={status} >
      <PageHeader
        title={frontmatter.title}
        heading={frontmatter.heading}
      />
      <PageSection wrapperClassName="-xs-py1" />
      <PageSection wrapperClassName="xs-py5 contact--item contact--item--left">
        <p className="xs-col-12 md-col-10 md-offset-1 xs-text-3 xs-mt5 xs-text-center"><a href="tel:+15624260555">{"562.426.0555"}</a></p>
        <h1 className="display">Call</h1>
      </PageSection>
      <PageSection wrapperClassName="xs-py5 contact--item contact--item--right">
        <p className="xs-col-12 md-col-10 md-offset-1 xs-text-3 xs-mt5 xs-text-center"><a href="mailto:dan@thegrandlb.com">{"dan@thegrandlb.com"}</a></p>
        <h1 className="display">Email</h1>
      </PageSection>
      <PageSection wrapperClassName="xs-py5 xs-col-12 md-col-8 md-offset-2">
        {socialNav.map((item, i) => (
          <div key={i} className="contact--item col xs-col-12 md-col-6 xs-my6">
            <p className="xs-text-3 xs-text-center"><a href={item.path} target="_blank">{item.displayName}</a></p>
            <SvgIcon component={item.name}/>
          </div>
        ))}
      </PageSection>
      <PageCta
        accent={'grandPink'}
        heading={"Plan Your\nEvent Today"}
        buttons={[
          {
            text: "Plan Your Private Event",
            url: "/inquire/",
            event: {
              category: 'InquireAction',
              action: 'contactPageInquireAction',
            },
          }
        ]}
        img={"/img/moments/party.jpg"}
      />
    </Layout>
  )
}

export default ContactPage

export const aboutPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
      }
    }
  }
`
