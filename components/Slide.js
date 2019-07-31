import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Background from './Background';

import { slideUp, slideInRight, slideOutRight, slideInLeft, slideOutLeft, fadeUp, fadeRight } from './Animations';

const nextArrow = '/static/assets/next-arrow.png';
const prevArrow = '/static/assets/prev-arrow.png';

const Slide = ({
  contents,
  contents: { image, description },
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
      animateIn={isActive}
      animateOut={isLastActiveSlide}
      animationDirection={direction}
    >
      {/* <Contents>
        <div>
          <Title>{title}</Title>
          <SubTitle>{description}</SubTitle>
        </div>
        <Counter>{pageCount}</Counter>
      </Contents> */}
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
  font-size: 1.8rem;
  opacity: 0;
  margin: 0;
`;

const SubTitle = styled.h2`
  font-weight: lighter;
  font-size: 1.4rem;
  opacity: 0;
  margin: 0;

  animation: ${fadeUp} 1s forwards 1.2s;
`;

const StyledBackground = styled(Background)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

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
  /* animation: fadeIn 1.5s forwards 2s; */
  letter-spacing: 0.25rem;
  font-weight: bold;
  font-size: 1.8rem;
  /* opacity: 0; */

  /* @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.8;
    }
  } */
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
  padding: 30px;
  z-index: 1;
  pointer-events: none;

  color: white;
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
