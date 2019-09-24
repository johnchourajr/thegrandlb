import React from 'react'
import Star from './svg/Star'

// import { outputStarRating } from './functions/util'

function outputStarRating(rating, color, strokeWidth, width, height) {
  rating = Math.round(rating * 2) / 2;
  let output = [];

  // Full Star
  for (var i = rating; i >= 1; i--)
    output.push(
      <Star key={i} isWhole color={color} strokeWidth={strokeWidth} width={width} height={height}/>
    )

  // Half Star
  if (i === .5)
    output.push(
      <Star key={i} isHalf color={color} strokeWidth={strokeWidth} width={width} height={height}/>
    )

  // Empty Star
  for (let i = (5 - rating); i >= 1; i--)
    output.push(
      <Star key={i} color={color} strokeWidth={strokeWidth} width={width} height={height}/>
    )

  return output
}

const Ratings = props => {

  return (
    <div className="star-group" aria-label={`${props.rating} Star Rating`}>
      {outputStarRating(props.rating, props.color, props.strokeWidth, props.width, props.height)}
    </div>
  )
}

export default Ratings
