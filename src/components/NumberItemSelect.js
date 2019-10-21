import React, { useRef, useEffect, useState } from 'react'
import Select from 'react-select'
import CountUp from 'react-countup';
import 'intersection-observer';
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

import NumberItem from './NumberItem'

const NumberItemSelect = props => {
  const { item } = props
  const [number, setNumber] = useState(item.options[0].number)

  return (
    <NumberItem
      delay={props.delay}
      className={props.className}
      prefix={item.prefix}
      number={number}
      suffix={item.suffix}
      caption={item.caption}
      options={item.options}
      description={item.description}
      isMin={item.isMin}
    >
      <select
        onChange={e => setNumber(e.target.value)}
        className="number-item--input"
      >
        {item.options.map((option, i) => (
          <option key={i} value={option.number}>{option.caption}</option>
        ))}
      </select>
    </NumberItem>
  )
}

export default NumberItemSelect
