import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Img from 'gatsby-image';

// Component
const PageCarousel = (props) => {
  if (typeof window != 'undefined') {
    const { items } = props;

    var Flickity = require('react-flickity-component');

    const toSlide = (item, i) => {
      return (
        <div
          key={`slide-${i}`}
          className={`carousel-slide carousel-slide--${i}`}
          style={{ backgroundImage: `url(${item.img})` }}
        >
          <Img fluid={item.img.childImageSharp.fluid} />
          <ReactMarkdown className="caption">{item.caption}</ReactMarkdown>
        </div>
      );
    };

    const flickityOptions = {
      initialIndex: 0,
      lazyLoad: true,
      arrowShape: '',
      selectedAttraction: 0.2,
      friction: 0.8
    };

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
    );
  } else return null;
};

PageCarousel.propTypes = {
  items: PropTypes.array.isRequired
};

export default PageCarousel;
