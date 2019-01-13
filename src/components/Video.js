import React from 'react'

import VideoCover from './thirdparty/VideoCover'
import { isMobileBrowswer } from '../components/functions/util'
import Link, { withPrefix } from 'gatsby-link'

class Video extends React.Component {
  state = {
    isMobileBrowswer: false,
  }

  componentWillMount() {
    this.setState({isMobileBrowswer: isMobileBrowswer()})
  }

  // componentDidMount() {
  //   window.onload = () => {
  //     const vid = document.getElementById("video")
  //     const vidDuration = vid.duration
  //     const vidDurIncriments = vidDuration / 10
  //     console.log(vid);
  //
  //     this.setState({
  //       vidDuration: vidDuration,
  //     })
  //   }
  // }

  render() {
    const videoOptions = {
      poster: this.props.poster,
      autoPlay: true,
      muted: true,
      loop: true,
    }

    return(
      <div className="video">
        {!this.state.isMobileBrowswer
          ? <VideoCover
              videoOptions={videoOptions}
              source={this.props.source}
              remeasureOnWindowResize
            />
          : <div className="img" style={{backgroundImage: `url(${withPrefix(this.props.poster)})`}}/>
        }
      </div>
    )
  }
}

export default Video
