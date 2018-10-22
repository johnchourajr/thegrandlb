import React from 'react'

class Layout extends React.Component {
  constructor(props){
		super(props)
	}
  componentDidMount() {
    window.pageExitTime = 0
    console.log(this.props.status)
  }
  componentWillUnmount() {
    console.log(this.props.status)
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
