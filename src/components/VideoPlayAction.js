import React, { useState } from "react";
import ReactPlayer from "react-player";

// Components
import VideoModal from "./VideoModal";
import PlayButton from "./svg/PlayButton";

const VideoPlayAction = (props) => {
  const [modalVisible, handleModal] = useState(false);

  const style = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const source = props.source.map((item, i) => {
    return { src: item.src, type: item.type };
  });

  return (
    <React.Fragment>
      <div className={"btn--play--wrapper"}>
        <PlayButton
          className={"btn--play"}
          onClick={(e) => handleModal(true)}
        />
        <p className="h6">Play Video</p>
      </div>
      <VideoModal modalVisible={modalVisible} handleModal={handleModal}>
        <ReactPlayer
          id={"videoFull"}
          className={props.className}
          style={style}
          width="100%"
          height="100%"
          loop
          playing
          controls
          url={[...source]}
        />
      </VideoModal>
    </React.Fragment>
  );
};

export default VideoPlayAction;
