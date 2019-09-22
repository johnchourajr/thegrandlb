import React from 'react'

const Star = (props) => {
  const { isWhole, isHalf } = props
  const color = props.color ? props.color : "black"
  const strokeWidth = props.strokeWidth ? props.strokeWidth : "3"
  const width = props.width ? props.width : "75"
  const height = props.height ? props.height : "71"

  return(
    <div className="star">
      <svg
        alt="star"
        width={width}
        height={height}
        viewBox="0 0 75 71"
        fill="none"
      >
        <path
          d="M37.4994 7L47.3012 25.5779L67.9988 29.1591L53.3591 44.2221L56.3491 65.0133L37.4994 55.7449L18.6497 65.0133L21.6397 44.2221L7 29.1591L27.6976 25.5779L37.4994 7Z"
          stroke={color}
          strokeWidth={strokeWidth}
        />
        {isWhole &&
          <path
            d="M37.4994 7L47.3012 25.5779L67.9988 29.1591L53.3591 44.2221L56.3491 65.0133L37.4994 55.7449L18.6497 65.0133L21.6397 44.2221L7 29.1591L27.6976 25.5779L37.4994 7Z"
            fill={color}
          />
        }
        {isHalf &&
          <path
            d="M18.6497 65.0133L37.4994 55.7449V7L27.6976 25.5779L7 29.1591L21.6397 44.2221L18.6497 65.0133Z"
            fill={color}
          />
        }
      </svg>
    </div>
  )
}

export default Star
