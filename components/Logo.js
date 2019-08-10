import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  color: ${({ theme }) => (theme === 'Light' ? '#000' : theme === 'Dark' ? '#fff' : '#000')};
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 2;
  margin: 0;
  font-size: 2rem;
  font-weight: 900;
  font-size: 20px;
  text-decoration: none;
  letter-spacing: 0.075rem;
  display: inline-block;

  transition: opacity 0.3s ease;
  opacity: ${({ fadeOut }) => (fadeOut ? 0 : 1)};

  span {
    color: #888;
  }
`;
