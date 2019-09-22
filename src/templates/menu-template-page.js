import React from 'react'
import ReactGA from 'react-ga'
import Scrollchor from 'react-scrollchor'

import { graphql, withPrefix } from 'gatsby'

import Layout from '../components/core/Layout'
import PageHeader from '../components/PageHeader'
import PageSection from '../components/PageSection'
import PageSegue from '../components/PageSegue'
import MenuTable from '../components/MenuTable'

import { outputMenuData, slugify } from '../components/functions/util'

function printAction(menu) {
  window.print()

  ReactGA.event({
    category: 'MenuPrint',
    action: menu,
  });
}

const MenuTemplatePage = ({ data, status }) => {
  const { frontmatter } = data.markdownRemark
  const menuData = outputMenuData(frontmatter.data)
  const path = '/img/icons/menu/printer.svg'
  const totalMenuDataLength = menuData.items.length

  return (
    <Layout status={status}>
      <PageHeader title={frontmatter.title} heading={frontmatter.heading}>
        <img src="/img/menus/header-pattern.png" alt="" className="print only-print" alt="Logo"/>
      </PageHeader>

      <PageSection
        subHead={frontmatter.subhead}
        subHeadClassName={"xs-px4 xs-pb4 no-print"}
      >
        <div className="xs-mb5">
          <p className="text-gray-lightest xs-text-center">Add 22% production fee and applicable sales tax to all menus</p>
        </div>
        <div className="print-button no-print">
          <button onClick={() => printAction(frontmatter.heading)} className="button button--small button--secondary button--third">
            <p>Print This Menu  <img style={{width: 20, height: 24}} src={`${withPrefix(path)}`} alt="print icon"/></p>
          </button>
        </div>
      </PageSection>
      {totalMenuDataLength > 1 ? <PageSection>
        <div id={"menutop"} className="button-group no-print">
          {menuData.items.map((item, i) => (
            <React.Fragment key={i}>
              <Scrollchor
                to={`#${slugify(item.title)}`}
                animate={{offset: -150, duration: 600}}
                className={`button button--secondary button-group__item`}
              >
                {item.title}
              </Scrollchor>
            </React.Fragment>
          ))}
        </div>
      </PageSection> : null}
      <section className="section">
        <div className="wrapper">
          <MenuTable data={menuData}/>
        </div>
      </section>
      <PageSection
        heading={"Tell Us About\nYour Event"}
        headingClassName={"xs-mb3"}
        buttons={[{text: "Plan Your Private Event", url: "/inquire/"}]}
      />
      <PageSegue
        currentPage={'menus'}
      />
    </Layout>
  )
}

export default MenuTemplatePage

export const menuTemplatePageQuery = graphql`
  query MenuTemplatePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        heading
        subhead
        data
      }
    }
  }
`
