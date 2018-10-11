import React from 'react'
import PropTypes from 'prop-types'
import Link, { withPrefix } from 'gatsby-link'
import Flickity from 'react-flickity-component'

// Component
const PageCarousel = props => {
  const {
    className,
    items,
    settings,
  } = props

  const toSlide = (item, i) => {
    return (
      <div
        key={`slide-${i}`}
        className={`carousel-slide carousel-slide--${i}`}
        style={{backgroundImage: `url(${item.img})`}}
      >
        <p className="caption">{item.caption}</p>
      </div>
    )
  }

  const flickityOptions = {
    initialIndex: 0,
    // wrapAround: true,
  }

  return (
    <Flickity
      className={'carousel'}
      elementType={'div'}
      options={flickityOptions}
      disableImagesLoaded={false}
      reloadOnUpdate
    >
      {items.map(toSlide)}
    </Flickity>
  )


}

PageCarousel.propTypes = {
  items: PropTypes.array.isRequired,
}

export default PageCarousel
