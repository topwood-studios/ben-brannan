import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../utils/theme';

const Plus = ({ stroke = '#000', ...rest }) => (
  <Svg viewbox="0 0 32 32" {...rest}>
    <defs>
      <clipPath id="prefix__a">
        <path fill="none" d="M0 0h32v32H0z" />
      </clipPath>
      <style>{'.prefix__c{fill:none;}'}</style>
    </defs>
    <g clipPath="url(#prefix__a)">
      <path className="prefix__c" stroke={stroke} d="M16 0v32M0 16h32" />
    </g>
  </Svg>
);

export default Plus;

Plus.propTypes = {
  stroke: PropTypes.string,
};

const Svg = styled.svg`
  stroke-width: 0.25rem;

  @media (${media.mobile}) {
    stroke-width: 0.15rem;
  }
`;
