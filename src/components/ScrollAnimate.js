/* eslint-disable */
import React from 'react';
import Box from './john-motion/motion-box';

const ScrollAnimate = ({ delay, children, ...rest }) => {
  return <Box {...rest}>{children}</Box>;
};

export default ScrollAnimate;
