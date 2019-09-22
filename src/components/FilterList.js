import React from 'react'
import _ from 'lodash'

import RoomCard from '../components/RoomCard'

class FilterList extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    this.setState({
      data: this.props.data,
    })
  }

  render() {
    const {
      data,
    } = this.state

    return(
      <div className="clearfix gutters card-wrap">

        {data.map(({ node: post }) => {
          let {
            eventType,
            eventTypeInfo,
            guestCount
          } = post.frontmatter.roomMeta

          const targetAll = this.props.targetFilter === "all"
          const targetCondition = _.includes(eventType, this.props.targetFilter)
          const condition = targetAll ? true : targetCondition

          if (condition) {
            return (
              <div key={post.id} className="col xs-col-12 md-col-6 xxl-col-4" >
                <RoomCard
                  hero={post.frontmatter.hero}
                  heading={post.frontmatter.heading}
                  slug={post.fields.slug}
                  guestCount={guestCount}
                  targetFilter={this.props.targetFilter}
                  eventTypeInfo={eventTypeInfo}
                />
              </div>
            )
          } else return null
        })}
      </div>
    )
  }
}

export default FilterList
