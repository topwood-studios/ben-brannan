import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Toggle = (props) => (
  <ToggleWrapper {...props}>
    <div id="menu-toggle">
      <div id="hamburger">
        <span />
        <span />
        <span />
      </div>
      <div id="cross">
        <span />
        <span />
      </div>
    </div>
  </ToggleWrapper>
);

export default Toggle;

Toggle.propTypes = {
  isOpen: PropTypes.bool,
};

const ToggleWrapper = styled.div.attrs((props) => ({ className: props.isOpen ? 'open' : '' }))`
  * {
    transition: 0.25s ease-in-out;
    box-sizing: border-box;
  }

  span {
    display: block;
    background: #fff;
    border-radius: 2px;
  }

  #menu-toggle {
    width: 100px;
    height: 100px;
    margin: 0;
    position: relative;
    position: relative;
    cursor: pointer;
    border-radius: 5px;

    #hamburger {
      position: absolute;
      height: 100%;
      width: 100%;
      
      span {
        width: 60px;
        height: 4px;
        position: relative;
        top: 24px;
        left: 20px;
        margin: 10px 0;
        &:nth-child(1) {
          transition-delay: 0.5s;
        }
        &:nth-child(2) {
          transition-delay: 0.625s;
        }
        &:nth-child(3) {
          transition-delay: 0.75s;
        }
      }
    }
    #cross {
      position: absolute;
      height: 100%;
      width: 100%;
      transform: rotate(45deg);
      span {
        &:nth-child(1) {
          height: 0%;
          width: 4px;
          position: absolute;
          top: 10%;
          left: 48px;
          transition-delay: 0s;
        }
        &:nth-child(2) {
          width: 0%;
          height: 4px;
          position: absolute;
          left: 10%;
          top: 48px;
          transition-delay: 0.25s;
        }
      }
    }
  }

  &.open {
    #menu-toggle {
      #hamburger {
        span {
          width: 0%;
          &:nth-child(1) {
            transition-delay: 0s;
          }
          &:nth-child(2) {
            transition-delay: 0.125s;
          }
          &:nth-child(3) {
            transition-delay: 0.25s;
          }
        }
      }
      #cross {
        span {
          &:nth-child(1) {
            height: 80%;
            transition-delay: 0.625s;
          }
        }
        span {
          &:nth-child(2) {
            width: 80%;
            transition-delay: 0.375s;
          }
        }
      }
    }
  }
`;
