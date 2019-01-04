import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/core/Layout'
import PageHeader from '../components/PageHeader'
import PageSection from '../components/PageSection'
import PageSegue from '../components/PageSegue'
import Link, { withPrefix } from 'gatsby-link'

import { slugify, outputMenuData } from '../components/functions/util'

const Td = props => {
  return (
    <div className={`table--division ${props.className}`}><ReactMarkdown source={props.children}/></div>
  )
}

const Tr = props => {
  return (
    <div className={`table--row ${props.className}`}>{props.children}</div>
  )
}

const Table = props => {
  return (
    <div className={`table--group  ${props.className}`}>{props.children}</div>
  )
}

const MenuTable = props => {
  const { data } = props
  // console.log("MenuTable", data);

  return (
    <React.Fragment>
      {data.items.map((item, i) => (
        <div key={i} id={item.title && slugify(item.title)} className="menu--wrap sm-col-8 sm-offset-2">
          <div className="menu--header ">

            <h3 className="display "><a href={`#${slugify(item.title)}`}>{item.title}</a></h3>
            <ReactMarkdown source={item.description}/>
          </div>
          <div className="xs-my5 divider-bar divider-bar--top"/>
          <MenuSection section={item.items}/>
        </div>
      ))}
    </React.Fragment>
  )
}

const MenuSection = props => {
  const { section } = props
  // console.log("MenuSection", props.section);

  return (
    <React.Fragment>
      {section && section.map((section, i) => (
        <div key={i} id={section.title && slugify(section.title)} className="menu--section">
          {section.title && <div className="menu--section--header">
            {section.title && <h2><a href={`#${slugify(section.title)}`}><ReactMarkdown source={section.title}/></a></h2>}
            {section.description && <ReactMarkdown className="menu--section--description" source={section.description}/>}
            {section.price && <ReactMarkdown className="menu--section--price" source={section.price}/>}
          </div>}
          <Table className="menu--table">
            <MenuItem item={section.items}/>
          </Table>
          <Tr>
            {section.annotation && <div className="menu--footer">
              {section.annotation.map((annoItem, i) => (
                <ReactMarkdown key={i} source={annoItem}/>
              ))}
            </div>}
          </Tr>
        </div>
      ))}
    </React.Fragment>
  )
}

const MenuItem = props => {
  const { item } = props
  // console.log("MenuItem", props.item);

  return (
    <React.Fragment>
      {item && item.map((listItem, i) => (
        <Tr key={i} className="menu--table--item">
          <div className="table--division menu--table--item--main">
            <h4><ReactMarkdown className="table--division menu--table--item--title" source={listItem.title}/></h4>
            <ReactMarkdown className="menu--table--item--description" source={listItem.description}/>
            {listItem.list && <ul>
              {listItem.list.map((item, i) => (
                <li key={i}><ReactMarkdown source={item}/></li>
              ))}
            </ul>}
            <MenuSubList item={listItem.items}/>
          </div>
          <div className="table--division menu--table--item--price">
            <ReactMarkdown source={listItem.price}/>
          </div>
        </Tr>
      ))}
    </React.Fragment>
  )
}

const MenuSubList = props => {
  const { item } = props

  return (
    <React.Fragment>
      {item && item.map((subItem, i) => (
        <div key={i} className="menu--table--item--sublist">
          <h5><ReactMarkdown className="table--division menu--table--item--title" source={subItem.title}/></h5>
          {subItem.list && <ul>
            {subItem.list.map((item, i) => (
              <li key={i}><ReactMarkdown source={item}/></li>
            ))}
          </ul>}
        </div>
      ))}
    </React.Fragment>
  )
}

const MenuTemplatePage = ({ data, status }) => {
  const { frontmatter, html } = data.markdownRemark
  const menuData = outputMenuData(frontmatter.data)
  const path = '/img/icons/menu/printer.svg'

  return (
    <Layout status={status}>
      <PageHeader title={frontmatter.title} heading={frontmatter.heading} />

      <PageSection
        subHead={frontmatter.subhead}
        subHeadClassName={"xs-px4 xs-pb4 no-print"}
      >
      <div className="print-button no-print">
        <button onClick={() => window.print()} className="button button--small button--secondary button--third">
          <p>Print This Menu  <img style={{width: 20, height: 24}} src={`${withPrefix(path)}`}/></p>
        </button>
      </div>
      </PageSection>
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
