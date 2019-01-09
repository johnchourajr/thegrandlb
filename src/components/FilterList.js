import React from 'react'
import PropTypes from 'prop-types'
import Link, { withPrefix } from 'gatsby-link'
import _ from 'lodash'

import { slugify } from '../components/functions/util'
import Layout from '../components/core/Layout'
import PageHeader from '../components/PageHeader'
import PageSection from '../components/PageSection'
import PageCta from '../components/PageCta'
import Buttons from '../components/Buttons'
import PageCarousel from '../components/PageCarousel'
import PageSegue from '../components/PageSegue'
import NumberArray from '../components/NumberArray'
import FormSelect from '../components/FormSelect'
import RoomCard from '../components/RoomCard'
import Video from '../components/Video'

import Map from '../components/svg/Map';


function containsAll(needles, haystack){
  for(var i = 0 , len = needles.length; i < len; i++){
     if($.inArray(needles[i], haystack) == -1) return false;
  }
  return true;
}

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
            roomFeatures,
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
