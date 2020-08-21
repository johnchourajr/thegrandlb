/* eslint-disable */
import React, { useRef, useEffect, useState } from "react";
import "intersection-observer";
import styled from "styled-components";

const ScrollAnimate = props => {
  const [showElement, setShowElement] = useState(false);
  const animateElement = useRef(null);

  const { delay, style, children, className, disabled } = props;

  const options = {
    root: null,
    rootMargin: "150px",
    threshold: [0.25]
  };

  const observe = element => {
    const observer = new IntersectionObserver(observeCallback, options);

    observer.observe(element.current);
  };

  const observeCallback = (entry, observer) => {
    let threshold = observer.thresholds[0];

    if (entry[0].intersectionRatio >= threshold) {
      if (delay) {
        setTimeout(() => {
          setShowElement(true);
        }, delay);
      } else {
        setShowElement(true);
      }
    } else {
      // if we want to, reset here
    }
  };

  useEffect(() => {
    observe(animateElement);
  }, [observe]);

  const showCondition = showElement ? "active" : "";
  const activeClass = !disabled ? showCondition : "active";

  return (
    <Wrap
      ref={animateElement}
      className={`${activeClass} ${className}`}
      style={{ ...style }}
    >
      {children}
    </Wrap>
  );
};

const Wrap = styled.div`
  transform-style: preserve-3d;
  transform: translateY(2rem) rotateX(10deg) rotateY(10deg) translateZ(20px);
  transition: transform 500ms cubic-bezier(0.215, 0.61, 0.355, 1) 200ms,
    opacity 300ms linear 200ms;
  opacity: 0;

  &.active {
    transform: none;
    opacity: 1;
  }
`;

export default ScrollAnimate;
