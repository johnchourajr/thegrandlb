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
    this.measureNav()
  }

  measureNav() {
    const height = document.getElementById('nav').clientHeight
    this.setState({ navBarHeight: height });
    console.log(height);
  }

  render() {

    return (
      <nav id="nav" className="nav" onScroll={this.onScroll}>
        <Helmet htmlAttributes={{ }} />
        {this.props.children}
      </nav>
    );
  }
}

const NavbarItemMenu = ( props ) => {
  return (
    <div className="nav--item--menu">
      ...
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
    const subpageMenu = hasSubpage ? <NavbarItemMenu subpages={hasSubpage} /> : null
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
          <Link to="/">
            <Logo/>
          </Link>
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
    </NavbarWrap>

  )
}

Navbar.propTypes = {
  mainNav: PropTypes.object,
}

export default Navbar
