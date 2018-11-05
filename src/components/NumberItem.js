import React from 'react'

const NumberItem = props => {
  const isMinStyles = props.isMin ? 'number-item--value-min' : ''
  return (
    <div className={`number-item ${props.className}`}>
      <div className={`number-item--value ${isMinStyles}`}>
        <h1>{props.prefix}</h1>
        <h1 className="display">{props.number}</h1>
        <h1>{props.suffix}</h1>
      </div>
      <p className="number-item--caption">{props.caption}</p>
      <p className="number-item--description">{props.description}</p>
    </div>
  )
}

export default NumberItem
