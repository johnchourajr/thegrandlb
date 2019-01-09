import React from 'react'

class Layout extends React.Component {
  constructor(props){
		super(props)
	}
  render() {
    const {children, status, location} = this.props
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    )
  }
}

export default Layout
