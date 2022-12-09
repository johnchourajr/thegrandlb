import React from 'react';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';

import { GatsbyImage } from 'gatsby-plugin-image';

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
                <GatsbyImage
                  className="img"
                  image={props.img.childImageSharp.gatsbyImageData}
                  alt=""
                />
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
