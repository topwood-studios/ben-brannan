import React from 'react';
import PropTypes from 'prop-types';

const Toggle = ({ stroke = '#000', ...rest }) => (
  <svg width={32} height={32} {...rest}>
    <defs>
      <clipPath id="prefix__a">
        <path fill="none" d="M0 0h32v32H0z" />
      </clipPath>
      <style>{'.prefix__c{fill:none;stroke-width:4px}'}</style>
    </defs>
    <g clipPath="url(#prefix__a)">
      <path className="prefix__c" stroke={stroke} d="M16 0v32M0 16h32" />
    </g>
  </svg>
);

export default Toggle;

Toggle.propTypes = {
  stroke: PropTypes.string,
};
