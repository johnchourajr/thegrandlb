import React from 'react'

import VideoCover from './thirdparty/VideoCover'

const Video = props => {

  const videoOptions = {
    poster: props.poster,
    autoPlay: true,
    muted: true,
    loop: true,
  }

  return(
    <div className="video">
      <VideoCover
        videoOptions={videoOptions}
        source={props.source}
        remeasureOnWindowResize
      />
    </div>
  )
}

export default Video
