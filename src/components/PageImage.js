import React from 'react'
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax'

import { withPrefix } from 'gatsby'

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
