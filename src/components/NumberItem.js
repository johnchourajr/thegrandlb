import React from 'react'
import ReactMarkdown from 'react-markdown'

const NumberItem = props => {
  const isMinStyles = props.isMin ? 'number-item--value-min' : ''
  return (
    <div className={`number-item ${props.className}`}>
      <div className={`number-item--value ${isMinStyles}`}>
        { props.prefix && <h1>{props.prefix}</h1>}
        { props.number && <h1 className="display">{props.number}</h1>}
        { props.sufix && <h1>{props.suffix}</h1>}
      </div>
      { props.caption && <ReactMarkdown className="number-item--caption">{props.caption}</ReactMarkdown>}
      { props.description && <ReactMarkdown className="number-item--description">{props.description}</ReactMarkdown>}

    </div>
  )
}

export default NumberItem
