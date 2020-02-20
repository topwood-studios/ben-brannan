/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-void */
import React, { useEffect, useState, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import { Swipeable } from 'react-swipeable';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Slide from './Slide';
import usePrevious from '../../hooks/usePrevious';
import Menu from '../Menu';
import Logo from '../Logo';

import { media } from '../../utils/theme';

import { attributes as settings } from '../../content/settings/global.md';

import Arrow from '../Arrow';

const translateRight = 'translate3d(100%, 0, 0)';
const translateLeft = 'translate3d(-100%, 0, 0)';

const Carousel = ({ slides }) => {
  const [index, set] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const transitions = useTransition(slides[index], item => item.id, {
    from: { transform: reverse ? translateLeft : translateRight },
    enter: { transform: 'translate3d(0%, 0, 0)' },
    leave: { transform: reverse ? translateRight : translateLeft },
    config: {
      mass: 1,
      tension: 120,
      friction: 30,
    },
  });

  let carouselTimer;

  // Set carousel index
  const setIndex = n =>
    set(state => (state + n + slides.length) % slides.length);

  const startCarousel = useCallback(() => {
    carouselTimer = setInterval(() => {
      setReverse(false);
      setIndex(+1);
    }, settings.carouselSpeed);
  }, []);

  const stopCarousel = useCallback(() => {
    clearInterval(carouselTimer);
    carouselTimer = null;
  }, []);

  // Play / pause carousel
  const toggleCarousel = useCallback(start => {
    if (start) {
      startCarousel();
    } else {
      stopCarousel();
    }
  }, []);

  // Start carousel on page load
  useEffect(() => {
    startCarousel();
  }, []);

  const pageDown = () => {
    if (!menuIsOpen) {
      setReverse(true);
      stopCarousel();
      setIndex(-1);
      startCarousel();
    }
  };

  const pageUp = () => {
    if (!menuIsOpen) {
      setReverse(false);
      stopCarousel();
      setIndex(+1);
      startCarousel();
    }
  };

  const changePage = n => {
    if (n > 0) {
      pageUp();
    } else {
      pageDown();
    }
  };

  const handleOpenMenu = () => {
    setMenuIsOpen(!menuIsOpen);
    toggleCarousel(menuIsOpen);
  };

  const { client, theme } = slides[index];
  const lastClient = usePrevious(client);

  return (
    <Swipeable onSwipedRight={pageDown} onSwipedLeft={pageUp}>
      <Logo theme={theme} menuOpen={menuIsOpen} onClick={handleOpenMenu} />
      <Menu isOpen={menuIsOpen} theme={theme} toggleMenu={handleOpenMenu} />
      {transitions.map(({ item, props, key }) => (
        <CarouselWrapper key={key} style={props}>
          <Slide
            index={slides.indexOf(item)}
            totalSlideCount={slides.length}
            toggleCarousel={toggleCarousel}
            stopCarousel={stopCarousel}
            startCarousel={startCarousel}
            changePage={changePage}
            {...item}
            animateText={lastClient !== client}
          />
        </CarouselWrapper>
      ))}
      <PaginationWrapper>
        <PaginationButton
          onClick={pageDown}
          style={{ transform: 'rotate(180deg)' }}
          stroke={theme === 'Light' ? '#000' : '#FFF'}
        />
        <PaginationButton
          onClick={pageUp}
          stroke={theme === 'Light' ? '#000' : '#FFF'}
        />
      </PaginationWrapper>
    </Swipeable>
  );
};

export default Carousel;

Carousel.propTypes = {
  slides: PropTypes.array,
};

const CarouselWrapper = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const PaginationButton = styled(Arrow)`
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;

const PaginationWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: none;
  align-items: center;
  justify-content: space-between;

  padding: 32px;

  @media (${media.laptop}) {
    display: flex;
  }
`;
