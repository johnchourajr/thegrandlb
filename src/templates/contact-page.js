import React from 'react'
import { graphql, Link } from 'gatsby'

// Components
import Layout from '../components/core/Layout'
import PageHeader from '../components/PageHeader'
import PageSection from '../components/PageSection'
import PageCta from '../components/PageCta'
import SvgIcon from '../components/svg/SvgIcon'

// Data
import { siteDetails } from '../data/siteDetails'
import { socialNav } from '../data/navDetails'

// Util Functions
import * as util from '../components/functions/util'

// Page
const ContactPage = ({ data, status }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout status={status} >
      <PageHeader
        title={frontmatter.title}
        heading={frontmatter.heading}
      />
      <PageSection wrapperClassName="-xs-py1" />
      <PageSection wrapperClassName="xs-py5 contact--item contact--item--left">
        <p className="xs-col-12 md-col-10 md-offset-1 xs-text-3 xs-mt5 xs-text-center"><a href={`tel:${siteDetails.phone}`}>{util.formatPhoneNumber(siteDetails.phone)}</a></p>
        <h1 className="display">Call</h1>
      </PageSection>
      <PageSection wrapperClassName="xs-py5 contact--item contact--item--right">
        <p className="xs-col-12 md-col-10 md-offset-1 xs-text-3 xs-mt5 xs-text-center"><a href={`mailto:${siteDetails.email}?subject=Saying Hello`}>{siteDetails.email}</a></p>
        <h1 className="display">Email</h1>
      </PageSection>
      <PageSection wrapperClassName="xs-py5 contact--item contact--item--left">
        <p className="xs-col-12 md-col-10 md-offset-1 xs-text-3 xs-mt5 xs-text-center"><Link to="/inquire">{"Submit Inquiry"}</Link></p>
        <h1 className="display">Inquire</h1>
      </PageSection>
      <PageSection wrapperClassName="xs-py5 xs-col-12 md-col-8 md-offset-2">
        {socialNav.map((item, i) => (
          <div key={i} className="contact--item col xs-col-12 md-col-6 xs-my6">
            <p className="xs-text-3 xs-text-center"><a href={item.path} target="_blank" rel="noopener noreferrer">{item.displayName}</a></p>
            <SvgIcon component={item.name}/>
          </div>
        ))}
      </PageSection>
      <PageSection
        subHead={"Check out our list of [Preferred Vendors](/about/vendors)."}
      />
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
