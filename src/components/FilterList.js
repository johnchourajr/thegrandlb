import React from "react";
import RoomCard from "../components/RoomCard";
import ScrollAnimate from "../components/ScrollAnimate";

function FilterList(props) {
  const [data] = React.useState(props.data);

  return (
    <div className="clearfix gutters card-wrap">
      {data.map(({ node: post }) => {
        let {
          eventType,
          eventTypeInfo,
          guestCount,
        } = post.frontmatter.roomMeta;

        const targetAll = props.targetFilter === "all";

        const targetCondition = eventType.includes(props.targetFilter);
        const condition = targetAll ? true : targetCondition;

        if (condition) {
          return (
            <ScrollAnimate
              key={post.id}
              className="col xs-col-12 md-col-6 xxl-col-4"
            >
              <RoomCard
                hero={post.frontmatter.hero}
                heading={post.frontmatter.heading}
                slug={post.fields.slug}
                guestCount={guestCount}
                targetFilter={props.targetFilter}
                eventTypeInfo={eventTypeInfo}
              />
            </ScrollAnimate>
          );
        } else return null;
      })}
    </div>
  );
}

export default FilterList;
