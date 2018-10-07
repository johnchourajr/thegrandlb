import React from 'react'

class NavbarWrap extends React.Component {

  componentDidMount() {
    document.addEventListener('scroll', () => {
      this.navChangeSize()
    })
  }

  navChangeSize() {
    const scrollPos = window.pageYOffset
    const trigger = scrollPos >= 150

    if (trigger) {
      document.body.classList.add(`nav--min`);
    } else {
      document.body.classList.remove(`nav--min`);
    }
  }

  render() {

    return (
      <nav id="nav" className="nav">
        {this.props.children}
      </nav>
    );
  }
}

export default NavbarWrap
