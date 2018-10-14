import React from 'react'

const Marker = (props) => {
  return(
    <div className="marker" style={{ width: 0, height: 0}}>
      <svg style={{ position: 'absolute', left: -30, top: -69 }} width="60" height="69" viewBox="0 0 60 69" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M29.9762 68.8512L0.692383 0.357422L29.9762 15.4898L59.2599 0.357422L29.9762 68.8512Z" fill="#2D2A26"/>
      </svg>
    </div>
  )
}

export default Marker
