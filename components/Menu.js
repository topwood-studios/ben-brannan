import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import Toggle from './Toggle';

import { MdAdd } from 'react-icons/md';

// TODO: Get content
// import content from '../content/settings/global.md';

const Menu = ({ isOpen, toggleMenu }) => (
  <MenuWrapper>
    <MenuToggle isOpen={isOpen} onClick={toggleMenu} />
    <Backdrop isOpen={isOpen}>
      <Contents isOpen={isOpen}>
        <h1>
          We are Studio
          <span>+</span>
          Brannan.
        </h1>
        <p>
          A design consultancy creating corporate identity systems &amp; brand direction, along with
          beautifully crafted apps, websites, books, literature, reports and information graphics.
        </p>
        <p>Please get in touch to discuss a project and see...</p>
        <hr />
        <Flex>
          <address>Contact details</address>
          <div />
          <div />
        </Flex>
      </Contents>
    </Backdrop>
  </MenuWrapper>
);

export default Menu;

Menu.propTypes = {
  isOpen: PropTypes.bool,
  toggleMenu: PropTypes.func,
};

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MenuWrapper = styled.div`
  display: contents;
`;

const MenuToggle = styled(MdAdd)`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 3;
  font-size: 2rem;
  font-weight: bolder;
  margin: 0;
  padding: 0;
  font-size: 3rem;

  transition: transform 0.3s ease-in-out, color 0.3s ease-in;
  transform: rotate(${({ isOpen }) => isOpen && '-45deg'});

  color: ${({ isOpen }) => isOpen ? 'white' : 'black'};

  &:hover {
    cursor: pointer;
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

  h1 {
    margin-bottom: 1rem;
    font-size: 2.6rem;
    font-weight: bold;
    letter-spacing: 0.075rem;

    span {
      color: #999;
    }
  }

  p {
    margin-top: 0;
    font-size: 2.6rem;
  }
`;
