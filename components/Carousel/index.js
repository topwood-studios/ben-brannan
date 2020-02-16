/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-void */
import PropTypes from 'prop-types';
import React, { useEffect, useState, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import { attributes as settings } from '../../content/settings/global.md';
import Slide from './Slide';

const Carousel = ({ slides }) => {
  const [index, set] = useState(0);

  const transitions = useTransition(slides[index], item => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      tension: 280,
      friction: 120,
      // duration: 250,
    },
  });

  let carouselTimer;

  // Set carousel index
  const setIndex = n =>
    set(state => (state + n + slides.length) % slides.length);

  const startCarousel = useCallback(() => {
    carouselTimer = setInterval(() => setIndex(+1), settings.carouselSpeed);
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

  useEffect(() => {
    startCarousel();
  }, []);

  // Reset carousel timer on page change
  const changePage = n => {
    stopCarousel();
    setIndex(n);
    startCarousel();
  };

  // Detect when client changes
  const { client } = slides[index] || {};
  useEffect(() => {
    if (client) {
      // console.log('Client changed:', client);
    }
  }, [client]);

  return (
    <div>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Slide
            index={slides.indexOf(item)}
            totalSlideCount={slides.length}
            toggleCarousel={toggleCarousel}
            stopCarousel={stopCarousel}
            startCarousel={startCarousel}
            changePage={changePage}
            {...item}
          />
        </animated.div>
      ))}
    </div>
  );
};

export default Carousel;

Carousel.propTypes = {
  slides: PropTypes.array,
};
