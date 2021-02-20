import React, { useState } from 'react';

import VideoCover from './thirdparty/VideoCover';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
import { isMobileBrowser } from '../components/functions/util';
import { withPrefix } from 'gatsby';

const VideoContent = (props) => {
  if (!props.isMobileBrowser) {
    return (
      <VideoCover
        videoOptions={props.videoOptions}
        source={props.source}
        remeasureOnWindowResize
        muted
      />
    );
  } else {
    return (
      <div
        className="img"
        style={{ backgroundImage: `url(${withPrefix(props.poster)})` }}
      />
    );
  }
};

const Video = (props) => {
  const [mobileBrowser] = useState(isMobileBrowser());

  const videoOptions = {
    poster: props.poster,
    autoPlay: true,
    playsInline: true,
    preload: 'auto',
    muted: true,
    loop: true
  };

  return (
    <ParallaxProvider>
      <ParallaxBanner
        className={'video'}
        layers={[
          {
            amount: 0.2,
            children: (
              <VideoContent
                isMobileBrowswer={mobileBrowser}
                videoOptions={videoOptions}
                source={props.source}
                poster={props.poster}
              />
            ),
            slowerScrollRate: true
          }
        ]}
      />
    </ParallaxProvider>
  );
};

export default Video;
