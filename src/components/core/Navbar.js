import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Logo from '../svg/Logo'
import Caret from '../svg/Caret'
import { slugify } from '../functions/util'

import logo from '../../img/logo.svg'

class NavbarWrap extends React.Component {
  state = {
    navBarHeight: 0,
  };

  componentDidMount() {


    document.addEventListener('scroll', () => {
      const darkContainer = document.getElementById('dark')
      const elHeight = darkContainer.clientHeight - 60
      const scrollPos = window.pageYOffset
      const trigger = scrollPos >= elHeight

      if (trigger) {
        document.body.classList.remove(`nav--dark`);
        document.body.classList.add(`nav--light`);
      } else {
        document.body.classList.remove(`nav--light`);
        document.body.classList.add(`nav--dark`);
      }

      console.log(trigger)
    });
  }

  render() {

    return (
      <nav id="nav" className="nav">
        <Helmet htmlAttributes={{ }} />
        {this.props.children}
      </nav>
    );
  }
}

const NavbarItemMenu = ( props ) => {
  return (
    <div
      className="nav--item--menu"
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
    >
      {props.subpages.map((item, i) => (
        <div key={i}>
          <Link
            to={item.path}
            className="nav--item--menu--item"
          >{item.name}</Link>
        </div>
      ))}
    </div>
  )
}

class NavbarItem extends React.Component {

  state = {
    navActive: false,
  }

  onMouseOver(e, hasSubpage) {
    if (hasSubpage) {
      this.setState({ navActive: true })
      document.body.classList.add(`nav--hover-active`);
    }
  }

  onMouseOut(e, hasSubpage) {
    if (hasSubpage) {
      this.setState({ navActive: false })
      document.body.classList.remove(`nav--hover-active`);
    }
  }

  render() {
    const pageSlug = this.props.path ? `${slugify(this.props.path)}-nav` : null
    const hasSubpage = this.props.subpages
    const subpageCaret = hasSubpage ? <Caret/> : null
    const subpageMenu = hasSubpage ? <NavbarItemMenu subpages={hasSubpage} onMouseOver={e => this.onMouseOver(e, hasSubpage)} onMouseOut={e => this.onMouseOut(e, hasSubpage)} /> : null
    const isActive = this.state.navActive ? 'nav--item-active' : ''

    return(
      <div className={`nav--item ${isActive}`}>
        <Link
          id={pageSlug}
          to={this.props.path}
          onMouseOver={e => this.onMouseOver(e, hasSubpage)}
          onMouseOut={e => this.onMouseOut(e, hasSubpage)}
        >{this.props.name}</Link>
        {subpageCaret}
        {subpageMenu}
      </div>
    )
  }
}

const Navbar = ({ mainNav, inquireNav }) => {

  return (
    <NavbarWrap>
      <div className="wrapper">
        <div className="nav--left">
          {mainNav.left.map(item => (
            <NavbarItem key={item.name} {...item}/>
          ))}
        </div>
        <div className="nav--logo">
          <Logo to="/"/>
          <div className="nav--mobile-menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="nav--right">
          {mainNav.right.map(item => (
            <NavbarItem key={item.name} {...item}/>
          ))}
        </div>
      </div>
      <div className="nav--overlay">
      </div>
    </NavbarWrap>

  )
}

Navbar.propTypes = {
  mainNav: PropTypes.object,
}

export default Navbar
