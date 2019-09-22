import React from 'react'
import { Link, withPrefix } from 'gatsby'

// Component
const RoomCard = props => {
  return(
    <div
      className="card page-card"
      style={{backgroundImage: `url(${withPrefix(props.hero)})`}}
    >
      <Link className="card--inner" to={props.slug}>
        <div className="card--inner--upper">
          <h1>{props.heading}</h1>
        </div>
        <div className="card--inner--lower">
          <div className="xs-pr4">
            {props.guestCount && <span><h2>{props.guestCount}</h2> <h5>Max Guest Count</h5></span>}

            {props.eventTypeInfo && props.eventTypeInfo.map((item) => {
              if (item.type === props.targetFilter) {
                return (
                  <p key={item} className="xs-pt2">{item.description}</p>
                )
              } else return null
            })}
          </div>

          <div>
            <h5 className="underline">View</h5>
          </div>

        </div>
      </Link>
    </div>
  )
}

export default RoomCard
