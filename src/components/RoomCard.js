import React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

// Component
const RoomCard = (props) => {
  return (
    <div className="card page-card">
      <GatsbyImage
        image={props.hero.childImageSharp.gatsbyImageData}
        alt={props.heading}
      />
      <Link className="card--inner" to={props.slug}>
        <div className="card--inner--upper">
          <h3 className="h1">{props.heading}</h3>
        </div>
        <div className="card--inner--lower">
          <div className="xs-pr4">
            {props.guestCount && (
              <p>
                <span className="h2">{props.guestCount}</span>{" "}
                <span className="h5">Max Guest Count</span>
              </p>
            )}

            {props.eventTypeInfo &&
              props.eventTypeInfo.map((item) => {
                if (item.type === props.targetFilter) {
                  return (
                    <p key={item} className="xs-pt2">
                      {item.description}
                    </p>
                  );
                } else return null;
              })}
          </div>

          <div>
            <p className="h5 underline">View</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RoomCard;
