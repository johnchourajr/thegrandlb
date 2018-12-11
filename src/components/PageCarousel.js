import React from 'react'
import PropTypes from 'prop-types'
import Link, { withPrefix } from 'gatsby-link'
import ReactMarkdown from 'react-markdown'

// Component
const PageCarousel = props => {

  if (typeof window != "undefined") {

    const Flickity = require('react-flickity-component');

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
          <ReactMarkdown className="caption">{item.caption}</ReactMarkdown>
        </div>
      )
    }

    const flickityOptions = {
      initialIndex: 0,
      lazyLoad: true,
      arrowShape: ''
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
  } else return null
}

PageCarousel.propTypes = {
  items: PropTypes.array.isRequired,
}

export default PageCarousel
