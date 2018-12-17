import React from 'react'

import PageSection from './PageSection'
import NumberItem from './NumberItem'

const AmenetiesArray = props => {
  return (
    <PageSection
      heading={props.heading}
      subHead={props.subHead}
      caption={props.caption}
    >
      <div className="clearfix icon-item--wrap">
        {props.array.map((item, i) => {
          return (
            <div key={i} className="col xs-col-6 sm-col-6 md-col-4 icon-item">
              <div className="icon-item--icon">
                <img src={`/img/icons/${item.img}`}/>
              </div>
              <div className="icon-item--text">
                <h3 className="xs-text-center">{item.text}</h3>
              </div>
            </div>
          )
        })}
      </div>
    </PageSection>
  )
}

export default AmenetiesArray
