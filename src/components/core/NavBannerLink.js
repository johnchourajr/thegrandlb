import React from "react";

const NavBannerLink = props => {
  if (props.button) {
    return (
      <button
        tabIndex="0"
        className="nav--banner--link"
        onClick={props.onClick}
      >
        {props.button}
      </button>
    );
  } else return null;
};

export default NavBannerLink;
