import React from 'react'
import PropTypes from 'prop-types'
import Link, { withPrefix } from 'gatsby-link'

import Buttons from '../components/Buttons'
import PageSection from './PageSection'
import Star from './svg/Star'
import PageImage from './PageImage'
import Map from './Map'


// Component
const MapSection = props => {

  const map = {
    center: {
      lat: 33.8041368,
      lng: -118.1473096
    },
    zoom: 11
  };

  return (
    <div>
      <PageSection
        heading={props.heading}
      />
      <div className="map--wrap">
        <Map map={map}/>
      </div>
      <div className="map--footer xs-flex xs-flex-align-center xs-flex-column">
        <h6 className="xs-text-center xs-mb3">Find Us</h6>
        <a target="_blank" href={props.mapLink}>
        <h2 className="xs-text-center">
          {props.address1}
          <br />
          {props.address2}
        </h2>
        </a>
      </div>
      <div className={"md-px6 md-mx6 xs-pt4 md-pt6 xs-pb3 clearfix"}>
        {props.features.map((item, i) => (
          <div key={i} className={"col xs-pt3 xs-col-12 sm-col-4 xs-flex xs-flex-column xs-flex-align-center"}>
            <Star color={"rgba(0,0,0,.3)"} strokeWidth={2} width={32} height={32}/>
            <p className="xs-text-center">{item}</p>
          </div>
        ))}
      </div>
    </div>

  )
}

export default MapSection
