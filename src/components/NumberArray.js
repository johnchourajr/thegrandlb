import React from 'react'

import PageSection from './PageSection'
import NumberItem from './NumberItem'

const NumberArray = props => {
  return (
    <PageSection
      heading={props.heading}
      subHead={props.subHead}
    >
      <div className="number-wrap clearfix">
        {props.array.map((item, i) => {
          return (
            <NumberItem
              key={i}
              className="col xs-col-6 sm-col-6 md-col-4"
              prefix={item.prefix}
              number={item.number}
              suffix={item.suffix}
              caption={item.caption}
              description={item.description}
              isMin={props.isMin}
            />
          )
        })}
      </div>
    </PageSection>
  )
}

export default NumberArray
