import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { attributes } from '../content/settings/global.md';
import { colors } from '../utils/theme';
import Markdown from './Markdown';
import Plus from './Toggle';

const Menu = ({ isOpen, toggleMenu, theme }) => {
  const { menuText, menuContact, menuAddress } = attributes;
  return (
    <>
      <MenuToggle isOpen={isOpen} onClick={toggleMenu} theme={theme} />
      <Backdrop isOpen={isOpen}>
        <Contents isOpen={isOpen}>
          <MenuText>
            <Markdown source={menuText} />
          </MenuText>
          <Flex>
            <Address>
              <Markdown source={menuAddress} />
            </Address>
            <Contact>
              <Markdown source={menuContact} />
            </Contact>
            <div />
          </Flex>
        </Contents>
      </Backdrop>
    </>
  );
};

export default Menu;

Menu.propTypes = {
  isOpen: PropTypes.bool,
  toggleMenu: PropTypes.func,
  theme: PropTypes.string,
};

const Address = styled.address`
  font-size: 24px;
  white-space: pre-wrap;
  font-style: normal;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Contact = styled.div`
  font-size: 24px;
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;

  p {
    margin: 0;
  }

  > * {
    flex: 1;
  }
`;

const MenuToggle = styled(Plus)`
  position: fixed;
  top: 32px;
  right: 32px;
  height: 32px;
  width: 32px;

  z-index: 10;
  margin: 0;
  padding: 0;

  transition: transform 0.3s ease-in-out, stroke 0.3s ease-in;
  transform: rotate(${({ isOpen }) => isOpen && '-45deg'});

  path {
    stroke: ${({ isOpen, theme }) => (isOpen || theme === 'Dark' ? 'white' : 'black')} !important;
  }

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    font-size: 2.4rem;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  background: rgba(20, 20, 20, 0.95);

  transition-property: transform;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
  transition-delay: ${({ isOpen }) => (isOpen ? 0 : 500)}ms;
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '-100%')});
`;

const Contents = styled.div`
  color: ${colors.white};
  position: absolute;
  width: 100%;
  max-width: 1024px;
  height: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;

  transition-duration: 0.5s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-delay: ${({ isOpen }) => (isOpen ? 500 : 0)}ms;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
`;

const MenuText = styled.div`
  h1 {
    font-size: 48px;
    font-weight: bold;

    margin: 0;
    margin-bottom: 1rem;
    letter-spacing: 0.05rem;

    strong {
      color: ${colors.grey};
    }
  }

  a {
    text-decoration: underline;
    color: ${colors.white};
  }

  p {
    margin-top: 0;
    font-size: 44px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1.4rem;
    }
  }
`;
