import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';
import Markdown from './Markdown';

import { attributes } from '../content/settings/global.md';

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
          <hr />
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
  font-size: 1.1rem;
  white-space: pre-wrap;
  font-style: normal;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Contact = styled.div`
  font-size: 1.1rem;
  line-height: 1.4rem;
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;

  p {
    margin: 0;
  }

  > * {
    flex: 1;
  }
`;

const MenuToggle = styled(MdAdd)`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  font-size: 2rem;
  font-weight: bolder;
  margin: 0;
  padding: 0;
  font-size: 3rem;

  transition: transform 0.3s ease-in-out, color 0.3s ease-in;
  transform: rotate(${({ isOpen }) => isOpen && '-45deg'});

  color: ${({ isOpen, theme }) => (isOpen || theme === 'Dark' ? 'white' : 'black')};

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
  color: white;
  width: 100%;
  max-width: 900px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  transition-duration: 0.5s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-delay: ${({ isOpen }) => (isOpen ? 500 : 0)}ms;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
`;

const MenuText = styled.div`
  h1 {
    margin-bottom: 1rem;
    font-size: 2.6rem;
    font-weight: bold;
    letter-spacing: 0.075rem;

    strong {
      color: #868686;
    }
  }

  p {
    margin-top: 0;
    font-size: 2.6rem;
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
