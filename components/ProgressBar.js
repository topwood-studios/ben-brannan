import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../utils/theme';

const ProgressBar = ({ complete = 0, ...rest }) => (
  <ProgressWrapper {...rest}>
    <Progress complete={complete} />
  </ProgressWrapper>
);

export default ProgressBar;

ProgressBar.propTypes = {
  complete: PropTypes.number,
};

const ProgressWrapper = styled.div`
  width: 100%;
`;

const Progress = styled.span`
  background: ${colors.grey};
  color: ${colors.black};
  padding: 5px;
  width: ${({ complete }) => complete}%;
  transition: width 0.5s ease;
  position: absolute;
`;
