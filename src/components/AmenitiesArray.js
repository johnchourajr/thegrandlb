import React from "react";

import PageSection from "./PageSection";
import ScrollAnimate from "./ScrollAnimate";

const AmenitiesArray = (props) => {
  return (
    <PageSection
      heading={props.heading}
      subHead={props.subHead}
      subHeadTag="h2"
      caption={props.caption}
    >
      <div className="clearfix icon-item--wrap">
        {props.array.map((item, i) => {
          return (
            <ScrollAnimate
              key={i}
              className="col xs-col-6 sm-col-6 md-col-4 icon-item"
            >
              <div className="icon-item--icon">
                <img src={`/img/icons/${item.img}`} alt={item.text} />
              </div>
              <div className="icon-item--text">
                <h3 className="h3 xs-text-center">{item.text}</h3>
              </div>
            </ScrollAnimate>
          );
        })}
      </div>
    </PageSection>
  );
};

export default AmenitiesArray;
