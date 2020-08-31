import React, { useState } from "react";
import "intersection-observer";

import NumberItem from "./NumberItem";

const NumberItemSelect = props => {
  const { item } = props;
  const [number, setNumber] = useState(item.options[0].number);

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
      <select // eslint-disable-line jsx-a11y/no-onchange
        onChange={e => setNumber(e.target.value)}
        className="number-item--input"
      >
        {item.options.map((option, i) => (
          <option key={i} value={option.number}>
            {option.caption}
          </option>
        ))}
      </select>
    </NumberItem>
  );
};

export default NumberItemSelect;
