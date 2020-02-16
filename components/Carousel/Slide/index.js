import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { colors, media } from '../../../utils/theme';
import Menu from '../../Menu';
import { backgroundZoom, fadeIn, fadeUp, recordSpin } from '../../Animations';
import Logo from '../../Logo';
import { attributes as settings } from '../../../content/settings/global.md';

const ANIMATION_SPEED = settings.carouselSpeed;

const Slide = ({
  image,
  mobileImage,
  desktopIcon,
  description,
  animation,
  mobileIcon,
  changePage,
  theme,
  client,
  totalSlideCount,
  setStartCarousel,
  animateText,
  index,
  toggleCarousel,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const animatedLayer = mobileIcon || desktopIcon;

  const handleOpenMenu = () => {
    setMenuIsOpen(!menuIsOpen);
    toggleCarousel(menuIsOpen);
  };

  return (
    <SlideWrapper>
      <Logo theme={theme} menuOpen={menuIsOpen} onClick={handleOpenMenu} />
      <Menu
        isOpen={menuIsOpen}
        setStartCarousel={setStartCarousel}
        theme={theme}
        toggleMenu={handleOpenMenu}
      />
      <StyledBackground
        src={image}
        mobileImage={mobileImage}
        className={animation}
      />
      {animatedLayer && (
        <IconWrapper>
          <AnimatedLayer src={animatedLayer} mobile className={animation} />
          <AnimatedLayer src={desktopIcon} className={animation} />
        </IconWrapper>
      )}
      <Contents fadeOut={menuIsOpen}>
        <div>
          <Counter animate={animateText}>
            {index + 1}
            <span>|</span>
            {totalSlideCount}
          </Counter>
          <Title animate={animateText} theme={theme}>
            {client}
          </Title>
          <Description animate={animateText}>{description}</Description>
        </div>
      </Contents>
      <Pagination>
        <button type="button" onClick={() => changePage(-1)}>Prev</button>
        <button type="button" onClick={() => changePage(+1)}>Next</button>
      </Pagination>
    </SlideWrapper>
  );
};

export default Slide;

Slide.propTypes = {
  index: PropTypes.number,
  image: PropTypes.string,
  mobileImage: PropTypes.string,
  totalSlideCount: PropTypes.number,
  setStartCarousel: PropTypes.func,
  toggleCarousel: PropTypes.func,
  desktopIcon: PropTypes.string,
  description: PropTypes.string,
  animation: PropTypes.string,
  mobileIcon: PropTypes.string,
  theme: PropTypes.string,
  animateText: PropTypes.bool,
  client: PropTypes.string,
  changePage: PropTypes.func,
};

const Pagination = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const SlideWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
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

  display: ${({ mobile }) => (mobile ? 'block' : 'none')};

  @media (${media.laptop}) {
    display: ${({ mobile }) => (mobile ? 'none' : 'block')};
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

  &.background-zoom {
    animation-name: ${backgroundZoom};
    animation-duration: ${ANIMATION_SPEED + 2000}ms;
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
  color: white;
  transition: opacity 0.3s;
  opacity: ${({ fadeOut }) => (fadeOut ? 0 : 1)};

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
  animation: ${({ animate }) => animate && fadeIn} 2000ms forwards 1000ms;
  letter-spacing: 0.075rem;

  span {
    margin: 2px;
  }

  font-size: 14px;
  font-weight: 500;

  @media (${media.laptop}) {
    font-size: 15px;
  }

  @media (${media.desktop}) {
    font-size: 18px;
  }
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: normal;
  color: ${({ theme }) => (theme === 'Light' ? '#000' : '#FFF')};

  opacity: ${({ animate }) => (animate ? 0 : 1)};
  animation: ${({ animate }) => animate && fadeUp} 600ms forwards 300ms;
  letter-spacing: 0.05rem;
  margin: 0;

  @media (${media.laptop}) {
    font-size: 22px;
  }

  @media (${media.desktop}) {
    font-size: 28px;
  }
`;

const Description = styled.h2`
  font-weight: 500;
  color: ${colors.grey};
  font-size: 14px;
  margin: 0;
  margin-bottom: 6px;
  letter-spacing: 0.025rem;

  opacity: ${({ animate }) => (animate ? 0 : 1)};
  animation: ${({ animate }) => animate && fadeUp} 1000ms forwards 300ms;

  @media (${media.laptop}) {
    font-size: 22px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  @media (${media.desktop}) {
    font-size: 28px;
  }
`;
