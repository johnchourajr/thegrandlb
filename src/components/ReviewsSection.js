import React from 'react'
import Ratings from './Ratings'
import NumberItem from './NumberItem'
import PageSection from './PageSection'

import { reviewsArray } from '../data/contentReviews.json'

const ReviewsCarousel = props => {
  if (typeof window != "undefined") {

    const Flickity = require('react-flickity-component');

    const toSlide = (item, i) => {
      return (
        <div
          key={`slide-${i}`}
          className={`carousel-slide carousel-slide--${i}`}
        >
          <div className="review-upper">
            {item.blurb && <h1>{item.blurb}</h1>}
          </div>
          <div className="review-lower">
            {item.rating && <Ratings
              rating={item.rating}
              color={'#F3E9EB'}
              strokeWidth={3}
              width={26}
              height={26}
            />}
            <div className="review-lower--right">
              <div>
                {item.rating && <p>{item.rating} Stars on {item.reviewLink ? <a href={item.reviewLink} target="_blank" rel="noopener noreferrer">{item.reviewSite}</a> : item.reviewSite}</p>}
                <p>from {item.userlink ? <a href={item.userlink} target="_blank" rel="noopener noreferrer">{item.username}</a> : item.username }</p>
              </div>
              {item.userphoto && <img className="review-lower--avatar" src={item.userphoto} style={{width: 45, height: 45}}/>}
            </div>
          </div>
        </div>
      )
    }

    const flickityOptions = {
      initialIndex: 0,
      autoPlay: 3500,
      wrapAround: true,
      prevNextButtons: false,
      pageDots: false,
      selectedAttraction: 0.2,
      friction: 0.8
    }

    return (
      <Flickity
        className={'carousel carousel-reviews'}
        elementType={'div'}
        options={flickityOptions}
        disableImagesLoaded={false}
        reloadOnUpdate
      >
        {reviewsArray.map(toSlide)}
      </Flickity>
    )
  } else return null
}

const ReviewsSection = props => {

  return (
    <React.Fragment>
      <ReviewsCarousel/>
    </React.Fragment>
  )
}

export default ReviewsSection
