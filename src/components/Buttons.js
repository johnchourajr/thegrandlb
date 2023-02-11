/* eslint-disable */

import React from "react";
import PropTypes from "prop-types";
import { Link, navigate } from "gatsby";
import ReactGA from "react-ga";

function buttonClick(url, event, modal) {
  if (event) {
    ReactGA.event({
      category: event.category,
      action: event.action,
    });
  }

  if (modal) {
    modal(false);
  }

  // navigate(url)
}

// Component
const Buttons = (props) => {
  if (props.buttons) {
    return (
      <div className={props.className}>
        {props.buttons.map((item, i) => {
          const secondary = item.isSecondary ? "button--secondary" : "";
          return (
            <Link
              key={i}
              className={`button ${secondary}`}
              onClick={() => {
                buttonClick(item.url, item.event, item.modal);
              }}
              to={item.url}
            >
              {item.text}
            </Link>
          );
        })}
      </div>
    );
  } else return null;
};

Buttons.propTypes = {
  wrapClass: PropTypes.string,
  buttons: PropTypes.array.isRequired,
};

export default Buttons;
