import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colors, media } from "../utils/theme";
import Menu from "./Menu";
import { backgroundZoom, fadeIn, fadeUp, recordSpin } from "./Animations";
import Logo from "./Logo";
import { settings } from "../data.json";

const ANIMATION_SPEED = settings[0].carouselSpeed;

const Slide = ({
  contents,
  contents: {
    image,
    mobileImage,
    description,
    animation,
    // animatedLayer,
    desktopIcon,
    mobileIcon,
    theme,
    title
  },
  activeSlide,
  lastActiveSlide,
  totalSlideCount,
  setStartCarousel,
  paused,
  index
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const isActive = activeSlide === contents;
  const isLastActiveSlide = lastActiveSlide === contents;
  const animateText =
    index === 0 || activeSlide.title !== lastActiveSlide.title;

  const animatedLayer = mobileIcon || desktopIcon;

  useEffect(() => {
    if (menuIsOpen) {
      setStartCarousel(false);
    } else {
      setStartCarousel(true);
    }
  }, [menuIsOpen]);

  return (
    <SlideWrapper
      clickable={isActive}
      paused={paused}
      animateIn={isActive}
      animateOut={isLastActiveSlide}
    >
      <StyledBackground
        src={image}
        mobileImage={mobileImage}
        animateText={animateText}
        className={animation}
        animateIn={isActive}
        animateOut={isLastActiveSlide}
      />
      {animatedLayer && isActive && (
        <IconWrapper>
          <AnimatedLayer src={animatedLayer} mobile className={animation} />
          <AnimatedLayer src={desktopIcon} className={animation} />
        </IconWrapper>
      )}
      {isActive && (
        <>
          <Logo theme={theme} menuOpen={menuIsOpen} />
          <Menu
            isOpen={menuIsOpen}
            setStartCarousel={setStartCarousel}
            theme={theme}
            toggleMenu={() => setMenuIsOpen(!menuIsOpen)}
          />
          <Contents fadeOut={menuIsOpen}>
            <div>
              <Counter animate={animateText}>
                {index + 1}
                <span>|</span>
                {totalSlideCount}
              </Counter>
              <Title animate={animateText} theme={theme}>
                {title}
              </Title>
              <Description animate={animateText}>{description}</Description>
            </div>
          </Contents>
        </>
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
  setStartCarousel: PropTypes.func,
  paused: PropTypes.bool
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
  z-index: ${({ animateIn, animateOut }) =>
    animateIn ? 2 : animateOut ? 1 : -1};

  pointer-events: ${({ clickable }) => (clickable ? "default" : "none")};
`;

const IconWrapper = styled.div`
  opacity: 0;
  animation: 0.5s ${fadeIn} 0.5s forwards;
  animation-timing-function: linear;

  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AnimatedLayer = styled.img`
  z-index: 3;
  max-width: 55%;
  max-height: 55%;

  display: ${({ mobile }) => (mobile ? "block" : "none")};

  @media (${media.laptop}) {
    display: ${({ mobile }) => (mobile ? "none" : "block")};
  }

  &.record-spin {
    animation-name: ${recordSpin};
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    will-change: transform;
  }
`;

const StyledBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  background-image: url(${({ mobileImage, src }) => mobileImage || src});

  @media (${media.laptop}) {
    background-image: url(${({ src }) => src});
  }

  background-size: cover;
  background-position: center;

  display: flex;
  align-items: flex-end;

  > div > * {
    visibility: ${({ animateIn, animateOut }) =>
      animateIn || animateOut ? "" : "hidden"};
  }

  transition-property: opacity;
  transition-duration: 250ms;
  transition-timing-function: ease-in;
  opacity: ${({ animateIn, animateOut }) => (animateIn || animateOut ? 1 : 0)};

  &.background-zoom {
    animation-name: ${({ animateIn }) => animateIn && backgroundZoom};
    animation-duration: ${ANIMATION_SPEED + 1000}ms;
    animation-direction: forwards;
    animation-timing-function: linear;
  }
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
  padding: 16px;
  z-index: 3;
  pointer-events: none;
  overflow: hidden;
  white-space: nowrap;

  transition: opacity 0.3s ease-in;
  opacity: ${({ fadeOut }) => (fadeOut ? 0 : 1)};

  color: white;

  @media (${media.laptop}) {
    padding: 32px;
  }

  @media (${media.desktop}) {
  }
`;

const Counter = styled.p`
  margin: 0;
  padding: 0;
  color: ${colors.grey};
  margin-bottom: 0.25rem;
  opacity: ${({ animate }) => (animate ? 0 : 1)};
  animation: ${({ animate }) => animate && fadeIn} 500ms forwards 1000ms;
  letter-spacing: 0.075rem;

  span {
    margin: 2px;
  }

  font-size: 14px;
  font-weight: 500;

  @media (${media.laptop}) {
    font-size: 18px;
    /* font-weight: 300; */
  }

  @media (${media.desktop}) {
  }
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: normal;
  color: ${({ theme }) => (theme === "Light" ? "#000" : "#FFF")};

  opacity: ${({ animate }) => (animate ? 0 : 1)};
  animation: ${({ animate }) => animate && fadeUp} 600ms forwards 300ms;
  letter-spacing: 0.05rem;
  margin: 0;

  @media (${media.laptop}) {
    font-size: 28px;
  }

  @media (${media.desktop}) {
  }
`;

const Description = styled.h2`
  font-weight: 500;
  color: ${colors.grey};

  opacity: ${({ animate }) => (animate ? 0 : 1)};
  margin: 0;
  margin-bottom: 6px;
  letter-spacing: 0.025rem;

  animation: ${({ animate }) => animate && fadeUp} 1000ms forwards 300ms;

  @media (${media.laptop}) {
    font-size: 28px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  @media (${media.desktop}) {
  }
`;
