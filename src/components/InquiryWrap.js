import React from 'react'
import Link, {navigate} from 'gatsby-link'

export const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'stretch',
  minHeight: '800px',
  height: '100vh',
  top: '0',
  width: '100vw',
  opacity: 1,
  background: '#EDFAFF',
  zIndex: 9,
}

const InquiryCloseButton = props => (
  <Link
    id="inquiry-page--close-button"
    to={props.to}
    className="inquiry-page--close-button"
  >
    <span></span>
  </Link>
)

const InquiryWrap = ({ history, children }) => {
  return (
    <div style={style}>
      <InquiryCloseButton to={'/'}/>
      {children}
    </div>
  )
}

export default InquiryWrap
