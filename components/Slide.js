import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import Background from './Background';

import {
  // slideUp,
  slideInRight,
  slideOutRight,
  slideInLeft,
  slideOutLeft,
  fadeIn,
  fadeUp,
  fadeRight,
} from './Animations';

// Images
const nextArrow = '/static/assets/next-arrow.png';
const prevArrow = '/static/assets/prev-arrow.png';

const Slide = ({
  contents,
  contents: { image, mobileImage, description },
  activeSlide,
  pageCount,
  lastActiveSlide,
  direction,
  title,
  handlePageDown,
  handlePageUp,
}) => {
  const isActive = activeSlide === contents;
  const isLastActiveSlide = lastActiveSlide === contents;

  return (
    <StyledBackground
      src={image}
      mobileImage={mobileImage}
      animateIn={isActive}
      animateOut={isLastActiveSlide}
      animationDirection={direction}
    >
      <Contents>
        <div>
          <Title>{title}</Title>
          <SubTitle>{description}</SubTitle>
        </div>
        <Counter>{pageCount}</Counter>
      </Contents>
      <PageLeft onClick={handlePageDown} />
      <PageRight onClick={handlePageUp} />
    </StyledBackground>
  );
};

export default Slide;

Slide.propTypes = {
  activeSlide: PropTypes.object,
  lastActiveSlide: PropTypes.object,
  direction: PropTypes.string,
  title: PropTypes.string,
  handlePageDown: PropTypes.func,
  handlePageUp: PropTypes.func,
  contents: PropTypes.object,
  pageCount: PropTypes.string,
};

const Title = styled.h1`
  animation: ${fadeRight} 1s forwards 1s;
  letter-spacing: 0.125rem;
  /* font-size: 1.8rem; */
  opacity: 0;
  margin: 0;
  margin-bottom: 0.25rem;
`;

const SubTitle = styled.h2`
  font-weight: lighter;
  /* font-size: 1.4rem; */
  opacity: 0;
  margin: 0;

  animation: ${fadeUp} 1s forwards 1.2s;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  position: absolute;
  height: 100%;
  width: 100%;

  background-image: url(${({ src }) => src});
  @media (max-width: 768px) {
    background-image: url(${({ mobileImage }) => mobileImage});
  }

  background-size: cover;
  background-position: center;

  display: flex;
  align-items: flex-end;

  /* opacity: 0; hide slides offscreen */

  z-index: ${({ animateIn }) => (animateIn ? 1 : 0)};

  animation-timing-function: ease-in-out;
  animation: ${({ animateIn, animateOut, animationDirection }) => animationDirection !== 'forwards'
        ? animateIn
          ? slideInRight
          : animateOut
          ? slideOutRight
          : null
        : animateIn
        ? slideInLeft
        : animateOut
        ? slideOutLeft
        : null}
    1s forwards;
`;

const Counter = styled.span`
  animation: ${fadeIn} 1.5s forwards 2s;
  letter-spacing: 0.25rem;
  font-weight: bold;
  font-size: 1.8rem;
  opacity: 0;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: auto 0;
  }
`;

const Contents = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 1.4rem;
  z-index: 1;
  pointer-events: none;

  color: white;

  @media (max-width: 768px) {
    background: rgba(255, 255, 255, 0.8);
    color: #222;
    position: absolute;
    bottom: 0;
    top: auto;
    padding: 1.2rem;

    animation: ${fadeIn} 1.5s forwards;
  }
`;

const PageRight = styled.div`
  position: absolute;
  right: 0;
  left: 50%;
  top: 0;
  bottom: 0;
  /* background: rgba(0, 0, 0, 0.1); */
  opacity: 0;
  /* transition: opacity 0.5s ease; */
  cursor: url(${nextArrow}), auto;

  &:hover {
    /* opacity: 0.2; */
  }
`;

const PageLeft = styled.div`
  position: absolute;
  right: 50%;
  left: 0;
  top: 0;
  bottom: 0;
  /* background: rgba(0, 0, 0, 0.3); */
  opacity: 0;
  /* transition: opacity 0.5s ease; */
  cursor: url(${prevArrow}), auto;

  &:hover {
    /* opacity: 0.2; */
  }
`;
