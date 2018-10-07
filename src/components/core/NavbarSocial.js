import React, { Fragment } from "react"
import Link from 'gatsby-link'

// Components
import SvgIcon from '../svg/SvgIcon'

// Data
import { menuNav, socialNav } from '../../data/navData'

// Component
const NavbarSocial = props => {
  return (
    <div className={props.className}>
      {socialNav.map((item, i) => (
        <a key={i} href={item.path} target="_blank">
          <SvgIcon component={item.name}/>
        </a>
      ))}
    </div>
  )
}

export default NavbarSocial
