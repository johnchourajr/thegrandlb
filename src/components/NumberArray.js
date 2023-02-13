import React from "react";

import PageSection from "./PageSection";
import NumberItem from "./NumberItem";
import NumberItemSelect from "./NumberItemSelect";

const NumberArray = (props) => {
  return (
    <PageSection
      heading={props.heading}
      headingTag={props.headingTag || "h2"}
      subHead={props.subHead}
      subHeadTag={props.subHeadTag}
    >
      <div className="number-wrap clearfix">
        {props.array.map((item, i) => {
          if (!item.options) {
            return (
              <NumberItem
                key={i}
                delay={50 * i}
                className="col xs-col-6 sm-col-6 md-col-4"
                prefix={item.prefix}
                number={item.number}
                suffix={item.suffix}
                caption={item.caption}
                description={item.description}
                isMin={item.isMin}
              />
            );
          } else {
            return (
              <NumberItemSelect
                key={i}
                delay={50 * i}
                className="col xs-col-6 sm-col-6 md-col-4"
                item={item}
              />
            );
          }
        })}
      </div>
    </PageSection>
  );
};

export default NumberArray;
