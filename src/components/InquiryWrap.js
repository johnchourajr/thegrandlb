import React from 'react'
import PageTransition from 'gatsby-plugin-page-transitions'

export const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  top: '0',
  position: 'absolute',
  width: '100vw',
  opacity: 1,
  background: '#EDFAFF',
  zIndex: 9,
}

const InquiryWrap = ({ children }) => (

    <div style={style}>
      {children}
    </div>

)

export default InquiryWrap
