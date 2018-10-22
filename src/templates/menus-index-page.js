import React from 'react'
import PropTypes from 'prop-types'
import Link, { withPrefix } from 'gatsby-link'

import { slugify } from '../components/functions/util'
import Layout from '../components/core/Layout'
import PageHeader from '../components/PageHeader'
import PageSection from '../components/PageSection'
import PageCta from '../components/PageCta'
import Buttons from '../components/Buttons'
import PageCarousel from '../components/PageCarousel'
import PageSegue from '../components/PageSegue'


const MenusIndex = ({ data, status, location }) => {
  const { frontmatter, html } = data.markdownRemark
  const { pathname } = location
  const currentPage = slugify(pathname)
  console.log(currentPage);

  return (
    <Layout status={status}>
      <PageHeader
        title={frontmatter.title}
        heading={frontmatter.heading}
        caption={frontmatter.description}
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
      <PageSection bottomDivider>
        <div className="clearfix gutters menu-list">
          {frontmatter.menus.array.map((item, i) => {
            return (
              <div key={i} className="menu-list--item col xs-col-8 xs-offset-2 md-col-3 md-offset-2 lg-col-3 lg-offset-2">
                <Link to={item.path} className="menu-list--item--inner">
                  <div className="hash-item">
                    <h2 className="-display">{item.name}</h2>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
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


export default MenusIndex

export const basicPageQuery = graphql`
  query MenusIndex($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
        description
        carousel {
          array {
            img
            caption
          }
        }
        menus {
          array {
            name
            path
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
  }
`
