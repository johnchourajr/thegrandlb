import React from 'react'
import PageTransition from 'gatsby-plugin-page-transitions'

export const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
}

const InquiryWrap = ({ children }) => (
  <PageTransition
    defaultStyle={{
      transition: 'top 500ms cubic-bezier(0.165, 0.84, 0.44, 1)',
      top: '100%',
      position: 'absolute',
      width: '100vw',
      opacty: 0,
      background: '#EDFAFF',
      zIndex: 7,
    }}
    transitionStyles={{
      entering: { top: '0%'},
      entered: { top: '0%'},
      exiting: { top: '100%'},
    }}
    transitionTime={500}
  >
    <div style={style}>
      {children}
    </div>
  </PageTransition>
)

export default InquiryWrap
