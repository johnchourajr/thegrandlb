import React from "react"

// Components
import SvgIcon from '../svg/SvgIcon'

// Data
import { socialNav } from '../../data/navDetails'

// Component
const NavbarSocial = props => {
  return (
    <div className={props.className}>
      {socialNav.map((item, i) => (
        <a key={i} href={item.path} target="_blank" rel="noopener noreferrer">
          <SvgIcon component={item.name}/>
        </a>
      ))}
    </div>
  )
}

export default NavbarSocial
