import React from 'react'
import PropTypes from 'prop-types'
import Star from './svg/Star'
import Ratings from './Ratings'
import NumberItem from './NumberItem'
import PageSection from './PageSection'

// import { siteDetails } from '../data/siteDetails'

const yelpRating = {
  title: "Yelp",
  rating: 4.3,
  img: "/img/misc/yelp-logo.svg",
  link: "https://www.yelp.com/biz/the-grand-long-beach-long-beach",
}

const ratings = [
  {
    title: "The Knot",
    rating: 5,
    link: "https://www.theknot.com/marketplace/the-grand-long-beach-long-beach-ca-620906",
  },{
    title: "WeddingWire",
    rating: 4.4,
    link: "https://www.weddingwire.com/biz/the-grand-long-beach-long-beach/05b58faf6174714e.html",
  },
]

const RatingsSection = props => {

  return (
    <PageSection>
      <div className="ratings--wrap">
        <div className="ratings--upper">
          <div className="ratings--item">
            <img className="ratings--item--logo" src="/img/misc/yelp-logo.svg" />
            <Ratings
              rating={yelpRating.rating}
              color={'white'}
              strokeWidth={3}
            />
            <p>{yelpRating.rating} Stars on <a href={yelpRating.link} target="_blank" >{yelpRating.title}</a></p>
          </div>
        </div>
        <div className="ratings--lower clearfix">
          {ratings.map((item, i) => (
            <div key={i} className="ratings--item col xs-col-12 sm-col-6">
              <NumberItem number={item.rating} suffix={"/5"} isMin/>
              <Ratings
                rating={item.rating}
                color={'#8A2432'}
                strokeWidth={3}
                width={32}
                height={32}
              />
              <a target="_blank" href={item.link}>{item.title}</a>
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  )
}

export default RatingsSection