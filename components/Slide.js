import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import Background from './Background';

import {
  // slideUp,
  fadeIn,
  fadeUp,
  fadeRight,
} from './Animations';

const Slide = ({
  contents,
  contents: { image, mobileImage, description },
  activeSlide,
  lastActiveSlide,
  direction,
  totalSlideCount,
  index,
  title,
}) => {
  const isActive = activeSlide === contents;
  const firstItem = index === 0;
  const isLastActiveSlide = lastActiveSlide === contents;

  return (
    <StyledBackground
      src={image}
      mobileImage={mobileImage}
      firstItem={firstItem}
      animateIn={isActive}
      animateOut={isLastActiveSlide}
      animationDirection={direction}
    >
      <Contents>
        <div>
          <Counter animate={firstItem}>
            {index + 1}
            <span>|</span>
            {totalSlideCount}
          </Counter>
          <Title animate={firstItem}>{title}</Title>
          <SubTitle animate={firstItem}>{description}</SubTitle>
        </div>
      </Contents>
    </StyledBackground>
  );
};

export default Slide;

Slide.propTypes = {
  activeSlide: PropTypes.object,
  lastActiveSlide: PropTypes.object,
  direction: PropTypes.string,
  title: PropTypes.string,
  index: PropTypes.number,
  contents: PropTypes.object,
  totalSlideCount: PropTypes.number,
};

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: flex-end;
  z-index: ${({ animateIn, animateOut }) => (animateIn ? 1 : animateOut ? 0 : -1)};

  @media (max-width: 768px) {
    background-image: url(${({ mobileImage }) => mobileImage});
  }

  > div > * {
    display: ${({ animateIn, animateOut }) => (animateIn || animateOut ? '' : 'none')};
  }

  transition-property: opacity;
  transition-duration: 250ms;
  transition-timing-function: ease-in;
  opacity: ${({ animateIn, animateOut }) => (animateIn || animateOut ? 1 : 0)};
`;

// Slide contents
const Contents = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
  white-space: nowrap;

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

const Counter = styled.p`
  margin: 0;
  padding: 0;
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  opacity: ${({ animate }) => (animate ? 0 : 1)};
  animation: ${({ animate }) => animate && fadeIn} 500ms forwards 1000ms;
  letter-spacing: 0.075rem;

  span {
    margin: 2px;
  }
`;

const Title = styled.h1`
  opacity: ${({ animate }) => (animate ? 0 : 1)};
  animation: ${({ animate }) => animate && fadeRight} 600ms forwards 300ms;
  letter-spacing: 0.05rem;
  font-weight: lighter;
  font-size: 1.4rem;
  margin: 0;
`;

const SubTitle = styled.h2`
  font-weight: lighter;
  opacity: ${({ animate }) => (animate ? 0 : 1)};
  margin: 0;
  color: #999;
  font-size: 1.3rem;
  letter-spacing: 0.075rem;

  animation: ${({ animate }) => animate && fadeUp} 1000ms forwards 300ms;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
