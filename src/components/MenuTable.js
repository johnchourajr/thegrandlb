import React from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import ReactMarkdown from 'react-markdown'
import _ from 'lodash'

import Content, { HTMLContent } from './Content'
import Layout from './core/Layout'
import PageHeader from './PageHeader'
import PageSection from './PageSection'
import PageSegue from './PageSegue'
import Link, { withPrefix } from 'gatsby-link'

import { slugify, outputMenuData } from './functions/util'

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



const MenuSection = props => {
  const { section } = props

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

export class MenuTable extends React.Component {

  render() {
    const { data } = this.props

    return (
      <React.Fragment>
        {data.items.map((item, i) => {
          return (
            <div key={i} id={item.title && slugify(item.title)} className="menu--wrap sm-col-8 sm-offset-2">
              <div className="menu--header ">

                <h3 className="display "><a href={`#${slugify(item.title)}`}>{item.title}</a></h3>
                <ReactMarkdown source={item.description}/>
              </div>
              <div className="xs-my5 divider-bar divider-bar--top"/>
              <MenuSection section={item.items}/>
            </div>
          )
        })}
      </React.Fragment>
    )
  }
}

export default MenuTable
