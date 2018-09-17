import React from 'react'
import Link from 'gatsby-link'
import PageTransition from 'gatsby-plugin-page-transitions'

export const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
}

const Default = () => (
  <PageTransition
    defaultStyle={{
      transition: 'bottom 500ms cubic-bezier(0.165, 0.84, 0.44, 1)',
      bottom: '-100%',
      position: 'absolute',
      width: '100%',
      opacty: 0,
      background: 'gray',
    }}
    transitionStyles={{
      entering: { bottom: '0%'},
      entered: { bottom: '0%'},
      exiting: { bottom: '-100%'},
    }}
    transitionTime={500}
  >
    <div style={style}>
      <h1>Inquiry Page Test</h1>
      <Link to="/">Close</Link>
    </div>
  </PageTransition>
)

export default Default
