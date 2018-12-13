import React from 'react'

import VideoCover from './thirdparty/VideoCover'

const Video = props => {

  const videoOptions = {
    src: props.source,
    poster: props.poster,
    autoPlay: true,
    muted: true,
    loop: true,
  }

  return(
    <div className="video">
      <VideoCover
        videoOptions={videoOptions}
        remeasureOnWindowResize
      />
    </div>
  )
}

export default Video
