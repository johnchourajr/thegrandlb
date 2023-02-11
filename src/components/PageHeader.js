import React from "react";
import PropTypes from "prop-types";

// Component
const PageHeader = (props) => {
  return (
    <React.Fragment>
      <section className="page-header">
        <div className="wrapper">
          <div className="page-header--wrap">
            {props.title && (
              <span className="h6 page-header--eyebrow">{props.title}</span>
            )}
            {props.heading && (
              <h1 className="h2 page-header--headline display">
                {props.heading}
              </h1>
            )}
          </div>
        </div>
        {props.children}
      </section>
      {props.caption && (
        <div className="page-header--lower">
          <p className="page-header--caption">{props.caption}</p>
        </div>
      )}
    </React.Fragment>
  );
};

PageHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PageHeader;
