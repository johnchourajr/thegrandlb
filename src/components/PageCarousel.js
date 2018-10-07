import React from 'react'
import PropTypes from 'prop-types'
import Link, { withPrefix } from 'gatsby-link'
import Slider from "react-slick"
import { Carousel } from 'react-responsive-carousel';

// Component
const PageCarousel = props => {
  const {
    className,
    items,
    settings,
  } = props

  const toSlide = (item, i) => {
    return (
      <div id={`slide-${i}`} key={`slide-${i}`}>
        <img src={item.img}/>
        <p>{item.caption}</p>
      </div>
    )
  }

  return (
    <Carousel
      className={className}
      showThumbs={false}
      showIndicators={true}
      infiniteLoop={true}
      emulateTouch={true}
      {...settings}
    >
      {items.map(toSlide)}
    </Carousel>
  )
}

PageCarousel.propTypes = {
  items: PropTypes.array.isRequired,
}

export default PageCarousel
