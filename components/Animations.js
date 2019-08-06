import { keyframes } from 'styled-components';

export const recordSpin = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const backgroundZoom = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
`;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const menuDown = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

export const menuUp = keyframes`
  0% {
     transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
`;

export const slideOutLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-25%);
  }
`;

export const slideInLeft = keyframes`
  0% {
    transform: translateX(25%);
    width: 0;
  }
  100% {
    transform: translateX(0);
    width: 100%;
  }
`;

export const slideOutRight = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(25%);
  }
`;

export const slideInRight = keyframes`
  0% {
    transform: translateX(-25%);
    width: 0;
  }
  100% {
    transform: translateX(0);
    width: 100%%
  }
`;

export const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10rem);
  } 
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const fadeRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
