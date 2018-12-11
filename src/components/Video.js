import React from 'react'
import VideoCover from 'react-video-cover'

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
