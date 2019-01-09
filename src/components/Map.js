import React from 'react'
import GoogleMapReact from 'google-map-react';

import Marker from './svg/Marker'

const createMapOptions = maps => {
  return {
    panControl: false,
    mapTypeControl: false,
    scrollwheel: false,
    zoomControl: false,
    fullscreenControl: false,
    styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 75 }, { 'visibility': 'on' }] }]
  }
}

const Map = props => {
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBsl6qnGx47z5HM5NBIVD3EADXxO7-SAJk'}}
        defaultCenter={props.map.center}
        defaultZoom={props.map.zoom}
        options={createMapOptions}
        draggable={false}
      >
        <Marker
          lat={33.8041368}
          lng={-118.1473096}
        />
      </GoogleMapReact>
    </div>
  )
}

export default Map
