import React, { useState } from 'react';
import styled from 'styled-components';
import Toggle from './Toggle';

// TODO: Get content

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuWrapper>
      <MenuToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <Backdrop isOpen={isOpen}>
        <Contents isOpen={isOpen}>
          <h1>I am a menu</h1>
        </Contents>
      </Backdrop>
    </MenuWrapper>
  );
};

export default Menu;

const MenuWrapper = styled.div`
  display: contents;
`;

const MenuToggle = styled(Toggle)`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 3;

  transform: scale(0.75);

  @media (max-width: 768px) {
    top: 0;
    right: 0;
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
  background: rgba(10, 10, 10, 0.75);

  transition-property: transform;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
  transition-delay: ${({ isOpen }) => (isOpen ? 0 : 500)}ms;
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '-100%')});
`;

const Contents = styled.div`
  color: white;
  padding: 2rem;

  transition-duration: 0.5s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-delay: ${({ isOpen }) => (isOpen ? 500 : 0)}ms;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
`;
