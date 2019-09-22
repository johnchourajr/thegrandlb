import React from 'react'
import PropTypes from 'prop-types'
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax'

import Buttons from '../components/Buttons'
import PageSection from './PageSection'
import Link, { withPrefix } from 'gatsby-link'

// Component
const PageImage = props => {

  const styles = {
    backgroundImage: `url(${withPrefix(props.img)})`
  }

  return (
    <div className={`page-image page-image-full ${props.className}`}>
      <ParallaxProvider>
        <ParallaxBanner
          className={"img"}
          layers={[
            {
              amount: 0.2,
              children: (
                <div className="img" style={styles}/>
              ),
              slowerScrollRate: true,
            },
          ]}
        />
      </ParallaxProvider>
      {props.children}
    </div>
  )
}

export default PageImage
