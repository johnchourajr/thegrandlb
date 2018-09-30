import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'

import { allNav } from '../../data/NavData'


const Footer = ({ subNav }) => {
  return(
    <footer className="container">
      <div className="wrapper">
        <div className="gutters xs-flex ">
          {allNav.map((item, i) => {
            const subpages = item.subpages
            let subPageArray = null
            if (subpages) {
              subPageArray = subpages.map((item, i) => (
                <Link key={i} className="xs-block" to={item.path}>{item.name}</Link>
              ))
            }
            return (
              <div key={i} className="col xs-flex xs-flex-column">
                <Link className="bold xs-block" to={item.path}>{item.name}</Link>
                <div>
                  {subPageArray}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  subNav: PropTypes.object,
}

export default Footer
