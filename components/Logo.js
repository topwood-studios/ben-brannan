import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../utils/theme';

const Logo = ({ menuOpen, theme }) => (
  <Text fadeOut={menuOpen} theme={theme}>
    Studio
    <span>+</span>
    Brannan
  </Text>
);

Logo.propTypes = {
  menuOpen: PropTypes.bool,
  theme: PropTypes.string,
};

export default Logo;

const Text = styled.h1`
  position: fixed;
  display: inline-block;
  z-index: 2;
  top: 32px;
  left: 32px;
  margin: 0;

  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => (theme === 'Light' ? '#000' : theme === 'Dark' ? '#FFF' : '#FFF')};

  letter-spacing: 0.025rem;
  transition: opacity 0.3s ease;
  opacity: ${({ fadeOut }) => (fadeOut ? 0 : 1)};

  span {
    color: ${colors.grey};
  }

  @media (max-width: 768px) {
    top: 16px;
  left: 16px;
    font-size: 20px;
  }
`;
