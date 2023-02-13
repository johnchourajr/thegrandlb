import React from "react";
import { navigate } from "gatsby";

const CloseButton = (props) => (
  <button
    id="inquiry-page--close-button"
    onClick={props.onClick}
    className="inquiry-page--close-button"
  >
    <span></span>
  </button>
);

function handleBack(history) {
  if (typeof history === "undefined") {
    navigate("/");
  } else {
    history.goBack();
  }
}

const InteractiveMapWrap = ({ history, children }) => {
  return (
    <div className="interactive-map">
      <CloseButton onClick={() => handleBack(history)} />
      {children}
    </div>
  );
};

export default InteractiveMapWrap;
