import React from 'react'

import VideoCover from './thirdparty/VideoCover'
import { ParallaxBanner } from 'react-scroll-parallax'
import { isMobileBrowswer } from '../components/functions/util'
import Link, { withPrefix } from 'gatsby-link'

const VideoContent = props => {
  if (!props.isMobileBrowswer) {
    return (
      <VideoCover
        videoOptions={props.videoOptions}
        source={props.source}
        remeasureOnWindowResize
      />
    )
  } else {
    return (
      <div className="img" style={{backgroundImage: `url(${withPrefix(props.poster)})`}}/>
    )
  }


}

class Video extends React.Component {
  state = {
    isMobileBrowswer: false,
  }

  componentWillMount() {
    this.setState({isMobileBrowswer: isMobileBrowswer()})
  }

  render() {
    const videoOptions = {
      poster: this.props.poster,
      autoPlay: true,
      playsInline: true,
      preload: "auto",
      muted: true,
      loop: true,
    }

    return(
      <ParallaxBanner
        className={"video"}
        layers={[
          {
            amount: 0.2,
            children: (
              <VideoContent
                isMobileBrowswer={this.state.isMobileBrowswer}
                videoOptions={videoOptions}
                source={this.props.source}
                poster={this.props.poster}
              />
            ),
            slowerScrollRate: true,
          },
        ]}
      />
    )
  }
}

export default Video
