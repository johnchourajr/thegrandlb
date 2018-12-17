import React from 'react'
import Link, { withPrefix } from 'gatsby-link'


const seguePages = [
  {
    "key": "tour",
    "headline": "Tour Our 40k sqft. Facility",
    "img": "/img/placeholder--front-img.jpg",
    "buttonText": "Take a Tour",
    "path": "/tour",
  },{
    "key": "events",
    "headline": "Oh, We Do It All",
    "img": "/img/placeholder--wedding.jpg",
    "buttonText": "See Our Offerings",
    "path": "/events",
  },{
    "key": "menus",
    "headline": "Peek At Our Menus",
    "img": "/img/placeholder--food-1.jpg",
    "buttonText": "See The Menus",
    "path": "/menus",
  },
]

// Component
const PageSegue = props => {
  const { currentPage } = props

  return (
    <div className="section gutters clearfix">
      {seguePages.map(( item, i ) => {
        if (currentPage != item.key && i < 3) {
          return (
            <div
              key={i}
              className="col xs-col-12 md-col-6 segue-card"
            >
              <div className="segue-card--img-wrap" >
                <div className="segue-card--img" style={{backgroundImage: `url(${withPrefix(item.img)})`}} />
              </div>

              <Link to={item.path}>
                <div className="segue-card--text">
                  <h3 className="display">{item.headline}</h3>
                </div>
                <div className="segue-card--button-wrap">
                  <div
                    className={`button button--secondary`}
                    to={item.path}
                  >{item.buttonText}</div>
                </div>
              </Link>
            </div>
          )
        } return null
      })}
    </div>
  )
}

export default PageSegue
