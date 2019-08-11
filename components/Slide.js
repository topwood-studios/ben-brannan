import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors } from '../utils/theme';

// Components
import Menu from './Menu';
import Logo from './Logo';

// Animations
import { backgroundZoom, fadeIn, fadeUp, recordSpin } from './Animations';

const Slide = ({
  contents,
  contents: { image, mobileImage, description, animation, animatedLayer, theme },
  activeSlide,
  lastActiveSlide,
  totalSlideCount,
  index,
  toggleCarousel,
  slideNumber,
  title,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const isActive = activeSlide === contents;
  const firstItem = index === 0;
  const isLastActiveSlide = lastActiveSlide === contents;

  return (
    <SlideWrapper clickable={isActive}>
      <StyledBackground
        src={image}
        mobileImage={mobileImage}
        firstItem={firstItem}
        animation={animation}
        animateIn={isActive}
        animateOut={isLastActiveSlide}
      />

      {animatedLayer && <AnimatedLayer src={animatedLayer} animation={animation} />}
      {isActive && (
        <React.Fragment>
          <Logo theme={theme} menuOpen={menuIsOpen} />
          <Menu
            isOpen={menuIsOpen}
            theme={theme}
            toggleMenu={() => {
              setMenuIsOpen(!menuIsOpen);
              toggleCarousel();
            }}
          />
          <Contents fadeOut={menuIsOpen}>
            <div>
              <Counter animate={firstItem}>
                {slideNumber}
                <span>|</span>
                {totalSlideCount}
              </Counter>
              <Title animate={firstItem} theme={theme}>
                {title}
              </Title>
              <Description animate={firstItem}>{description}</Description>
            </div>
          </Contents>
        </React.Fragment>
      )}
    </SlideWrapper>
  );
};

export default Slide;

Slide.propTypes = {
  activeSlide: PropTypes.object,
  lastActiveSlide: PropTypes.object,
  title: PropTypes.string,
  index: PropTypes.number,
  contents: PropTypes.object,
  totalSlideCount: PropTypes.number,
  toggleCarousel: PropTypes.func,
  slideNumber: PropTypes.number,
};

const SlideWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  pointer-events: ${({ clickable }) => (clickable ? 'default' : 'none')};
`;

const AnimatedLayer = styled.img`
  z-index: 1;
  max-width: 55%;
  max-height: 55%;
  animation-name: ${({ animation }) => animation === 'Record Spin' && recordSpin};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const StyledBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: flex-end;
  z-index: ${({ animateIn, animateOut }) => (animateIn ? 1 : animateOut ? 0 : -1)};

  @media (max-width: 768px) {
    background-image: url(${({ mobileImage, src }) => mobileImage || src});
  }

  > div > * {
    visibility: ${({ animateIn, animateOut }) => (animateIn || animateOut ? '' : 'hidden')};
  }

  transition-property: opacity;
  transition-duration: 250ms;
  transition-timing-function: ease-in;
  opacity: ${({ animateIn, animateOut }) => (animateIn || animateOut ? 1 : 0)};

  animation: ${({ animation }) => (animation === 'Background Zoom' ? backgroundZoom : null)} 5000ms
    forwards;
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
  padding: 32px;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
  white-space: nowrap;

  transition: opacity 0.3s ease-in;
  opacity: ${({ fadeOut }) => (fadeOut ? 0 : 1)};

  color: white;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Counter = styled.p`
  margin: 0;
  padding: 0;
  color: ${colors.grey};
  font-size: 18px;
  margin-bottom: 0.25rem;
  opacity: ${({ animate }) => (animate ? 0 : 1)};
  animation: ${({ animate }) => animate && fadeIn} 500ms forwards 1000ms;
  letter-spacing: 0.075rem;

  span {
    margin: 2px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    font-weight: 500;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: normal;
  color: ${({ theme }) => (theme === 'Light' ? '#000' : '#FFF')};

  opacity: ${({ animate }) => (animate ? 0 : 1)};
  animation: ${({ animate }) => animate && fadeUp} 600ms forwards 300ms;
  letter-spacing: 0.05rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 20px;
    font-weight: 500;
  }
`;

const Description = styled.h2`
  font-size: 28px;
  font-weight: normal;
  color: ${colors.grey};

  opacity: ${({ animate }) => (animate ? 0 : 1)};
  margin: 0;
  margin-bottom: 10px;
  letter-spacing: 0.025rem;

  animation: ${({ animate }) => animate && fadeUp} 1000ms forwards 300ms;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 6px;
    font-weight: 500;
  }
`;
