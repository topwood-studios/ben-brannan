import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, media } from '../utils/theme';

const Logo = ({ menuOpen, ...rest }) => (
  <Text {...rest} fadeOut={menuOpen}>
    Studio
    <span>+</span>
    Brannan
  </Text>
);

Logo.propTypes = {
  menuOpen: PropTypes.bool,
  onClick: PropTypes.func,
  theme: PropTypes.string,
};

export default Logo;

const Text = styled.h1`
  position: fixed;
  display: inline-block;
  z-index: 2;
  top: 16px;
  left: 16px;
  margin: 0;
  cursor: pointer;

  font-size: 20px;
  font-weight: bold;

  transition: color 0.3s ease-in ${({ isOpen }) => (!isOpen ? '0.5s' : '')}, opacity 0.3s ease;;

  color: ${({ theme }) => theme === 'Light' ? '#000' : theme === 'Dark' ? '#FFF' : '#FFF'};

  letter-spacing: 0.025rem;
  opacity: ${({ fadeOut }) => (fadeOut ? 0 : 1)};

  span {
    color: ${colors.grey};
  }

  @media (${media.laptop}) {
    top: 32px;
    left: 32px;
    font-size: 22px;
  }

  @media (${media.desktop}) {
    font-size: 28px;
  }
`;
