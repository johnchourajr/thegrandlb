import React, { useRef, useEffect, useState } from "react";
import CountUp from "react-countup";
import "intersection-observer";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

const NumberItem = (props) => {
  const [show, setShow] = useState(false);
  const [number, setNumber] = useState(0);
  const popupEl = useRef(null);

  const { delay, disabled } = props;

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: [0.75],
  };

  const observe = (ob, el) => {
    ob.observe(el.current);
  };

  const observeCallback = (entry, observer) => {
    let threshold = observer.thresholds[0];
    if (entry[0].intersectionRatio >= threshold) {
      if (delay) {
        setTimeout(() => {
          setShow(true);
          setNumber(parseFloat(props.number));
        }, delay);
      } else {
        setShow(true);
        setNumber(parseFloat(props.number));
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observeCallback, options);
    observe(observer, popupEl);
  }, [props.number]); // eslint-disable-line react-hooks/exhaustive-deps

  const isMinStyles = props.isMin ? "number-item--value-min" : "";
  const showCondition = show ? "active" : "";
  const activeClass = !disabled ? showCondition : "active";

  return (
    <Wrap
      ref={popupEl}
      className={`${activeClass} number-item ${props.className}`}
    >
      <div className={`number-item--value ${isMinStyles}`}>
        {props.prefix && <span className="h1">{props.prefix}</span>}
        {props.number && (
          <span className="h1 display">
            <CountUp
              start={0}
              end={number}
              separator=","
              delay={500}
              {...props.countUpProps}
            >
              {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
          </span>
        )}
        {props.suffix && <span className="h1">{props.suffix}</span>}
      </div>
      {props.children}
      {props.caption && (
        <ReactMarkdown className="number-item--caption">
          {props.caption}
        </ReactMarkdown>
      )}
      {props.description && (
        <ReactMarkdown className="number-item--description">
          {props.description}
        </ReactMarkdown>
      )}
    </Wrap>
  );
};

const Wrap = styled.h3`
  transform-style: preserve-3d;
  transform: translateY(2rem) rotateX(10deg) rotateY(10deg) translateZ(20px);
  transition: transform 600ms cubic-bezier(0.215, 0.61, 0.355, 1) 300ms,
    opacity 400ms linear 300ms;
  opacity: 0;

  &.active {
    transform: none;
    opacity: 1;
  }
`;

export default NumberItem;
