import { keyframes } from 'styled-components';

export const slideOutLeft = keyframes`
  /* 0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  } */
`;

export const slideInLeft = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

export const slideOutRight = keyframes`
  /* 0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  } */
`;

export const slideInRight = keyframes`
  /* 0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  } */
`;

export const fadeUp = keyframes`
  /* from {
    opacity: 0;
    transform: translateY(10rem);
  } 
  to {
    opacity: 1;
    transform: translateY(0);
  } */
`;

export const fadeRight = keyframes`
  /* from {
    opacity: 0;
    transform: translateX(-10rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  } */
`;
