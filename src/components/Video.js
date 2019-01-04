import React from 'react'

import VideoCover from './thirdparty/VideoCover'
import { isMobileBrowswer } from '../components/functions/util'
import Link, { withPrefix } from 'gatsby-link'

class Video extends React.Component {
  state = {
    isMobileBrowswer: false,
  }

  componentWillMount() {
    // console.log("we did it", isMobileBrowswer());
    this.setState({isMobileBrowswer: isMobileBrowswer()})
    // console.log(this.state.isMobileBrowswer);
  }

  render() {
    const videoOptions = {
      poster: this.props.poster,
      autoPlay: true,
      muted: true,
      loop: true,
    }

    console.log(this.props.poster);

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
