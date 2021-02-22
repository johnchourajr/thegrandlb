import React from 'react';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';

import Img from 'gatsby-image';

// Component
const PageImage = (props) => {
  return (
    <div className={`page-image page-image-full ${props.className}`}>
      <ParallaxProvider>
        <ParallaxBanner
          className={'img'}
          layers={[
            {
              amount: 0.1,
              children: (
                <Img className="img" fluid={props.img.childImageSharp.fluid} />
              ),
              slowerScrollRate: true
            }
          ]}
        />
      </ParallaxProvider>
      {props.children}
    </div>
  );
};

export default PageImage;
