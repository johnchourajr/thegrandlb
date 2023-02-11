import React from "react";
import PropTypes from "prop-types";
import { withPrefix } from "gatsby";
import ReactMarkdown from "react-markdown";

// Components
import Buttons from "./Buttons";
import Video from "./Video";
import VideoPlayAction from "./VideoPlayAction";
import Box from "./john-motion/motion-box";

// Component
const PageHero = (props) => {
  return (
    <div>
      <section className="page-hero page-image-full">
        {!props.video && props.img && (
          <div
            className="img"
            style={{ backgroundImage: `url(${withPrefix(props.img)})` }}
          ></div>
        )}
        {props.video && (
          <Video source={props.video.source} poster={props.video.poster} />
        )}
        <div className="wrapper">
          <Box className="page-hero--wrap">
            {/* <ReactMarkdown children={props.heading} /> */}
            <ReactMarkdown
              children={props.heading}
              components={{
                p: ({ node, ...props }) => (
                  <h1 className="h1 page-hero--headline display" {...props} />
                ),
              }}
            />
            <VideoPlayAction source={props.video.source} />
          </Box>
        </div>
      </section>
      <div className="page-hero-block">
        <div className="wrapper page-hero--buttons ">
          <Buttons
            className="xs-flex xs-flex-justify-space-between"
            buttons={props.buttons}
          />
        </div>
      </div>
    </div>
  );
};

PageHero.propTypes = {
  heading: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default PageHero;
