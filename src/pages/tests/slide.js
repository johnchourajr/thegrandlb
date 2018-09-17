import React from 'react'
import Link from 'gatsby-link'
import PageTransition from 'gatsby-plugin-page-transitions'
import { style } from './index'

const Slide = () => (
  <PageTransition
    defaultStyle={{
      transition: 'bottom 500ms cubic-bezier(0.165, 0.84, 0.44, 1)',
      bottom: '-100%',
      position: 'absolute',
      width: '100%',
      opacty: 0,
      background: 'black',
    }}
    transitionStyles={{
      entering: { bottom: '0%'},
      entered: { bottom: '0%'},
      exiting: { bottom: '-100%'},
    }}
    transitionTime={500}
  >
    <div style={style}>
      <h1>Slide Left Transition</h1>
      <Link to="/tests">To Default Fade Transition</Link>
      <Link to="/inquire">Close</Link>
    </div>
  </PageTransition>
)

export default Slide
