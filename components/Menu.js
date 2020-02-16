import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { attributes } from '../content/settings/global.md';
import { colors, media } from '../utils/theme';
import Markdown from './Markdown';
import Plus from './Plus';

const Menu = ({ isOpen, toggleMenu, theme }) => {
  const { menuText, menuContact, menuAddress } = attributes;
  return (
    <>
      <MenuToggle
        isOpen={isOpen}
        onClick={e => {
          e.stopPropagation();
          toggleMenu();
        }}
        theme={theme}
      />
      <Backdrop isOpen={isOpen} onClick={e => e.stopPropagation()}>
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
  white-space: pre-wrap;
  font-style: normal;
  display: none;

  @media (${media.laptop}) {
    display: block;
  }

  /* @media (${media.desktop}) {
  } */
`;

const Contact = styled.div`
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  letter-spacing: 0.025rem;

  p {
    margin: 0;
  }

  > * {
    flex: 1;
  }

  @media (${media.laptop}) {
    font-size: 20px;
  }

  @media (${media.desktop}) {
    font-size: 24px;
  }
`;

const MenuToggle = styled(Plus)`
  position: fixed;
  top: 16px;
  right: 16px;
  height: 32px;
  width: 32px;

  z-index: 10;
  margin: 0;
  padding: 0;

  transition: transform 0.3s ease;
  transform: rotate(${({ isOpen }) => isOpen && '-45deg'});

  path {
    transition-property: stroke;
    transition-duration: 0.3s;
    transition-timing-function: ease-in;
    transition-delay: ${({ isOpen }) => (!isOpen ? '0.5s' : '')};
    stroke: ${({ isOpen, theme }) => isOpen || theme === 'Dark' ? 'white' : 'black'} !important;
  }

  &:hover {
    cursor: pointer;
  }

  @media (${media.laptop}) {
    top: 32px;
    right: 32px;
  }

  /* @media (${media.desktop}) {
  } */
`;

const Backdrop = styled.div`
  position: fixed;
  z-index: 5;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  background: rgba(3, 3, 3, 0.93);
  cursor: default;

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
  max-width: 288px;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;

  transition-duration: 0.5s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-delay: ${({ isOpen }) => (isOpen ? 500 : 0)}ms;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};

  @media (${media.laptop}) {
    max-width: 950px;
    padding: 32px;
  }

  /* @media (${media.desktop}) {
  } */
`;

const MenuText = styled.div`
  h1 {
    font-size: inherit;

    line-height: inherit;
    font-weight: bold;

    margin: 0;
    margin-bottom: 1rem;
    letter-spacing: 0.05rem;

    strong {
      color: ${colors.grey};
    }
  }

  a {
    text-decoration: none;
    color: ${colors.white};
    border-bottom: 2px solid #868686;
  }

  p {
    margin-top: 0;
    font-size: inherit;
    line-height: inherit;
    margin-block-end: 18px;
  }

  /* Mobile */
  font-size: 20px;
  line-height: 24px;

  @media (${media.laptop}) {
    font-size: 34px;
    line-height: 40px;
  }

  @media (${media.desktop}) {
    font-size: 44px;
    line-height: 50px;
  }
`;
