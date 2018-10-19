import React from 'react'

class Layout extends React.Component {
  constructor(props){
		super(props)
	}
  componentDidMount() {
    window.pageExitTime = 0
  }
  componentWillUnmount() {
    console.log(this.props.status)
  }
  render() {
    const {children, status} = this.props
    console.log(status)
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    )
  }
}

export default Layout
