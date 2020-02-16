import React from 'react';
import PropTypes from 'prop-types';

const Arrow = ({ stroke = '#000', ...rest }) => (
  <svg width={45.255} height={45.255} viewBox="0 0 45.255 45.255" {...rest}>
    <defs>
      <clipPath id="prefix__a">
        <path data-name="Rectangle 8" fill="none" d="M0 0h32v32H0z" />
      </clipPath>
    </defs>
    <g transform="rotate(45 11.313 27.313)" clipPath="url(#prefix__a)">
      <g data-name="Group 3" fill="none" stroke={stroke} strokeWidth={4}>
        <path data-name="Line 3" d="M29.458.565v30.991" />
        <path data-name="Line 4" d="M.444 2.565h30.991" />
      </g>
    </g>
  </svg>
);
export default Arrow;

Arrow.propTypes = {
  stroke: PropTypes.string,
};
