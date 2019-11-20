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
      tension: 500,
      friction: 60,
      // duration: 250,
    },
  });

  let carouselTimer;

  const startCarousel = useCallback(() => {
    carouselTimer = setInterval(
      () => set(state => (state + 1) % slides.length),
      settings.carouselSpeed,
    );
  }, []);

  const stopCarousel = useCallback(() => {
    clearInterval(carouselTimer);
    carouselTimer = null;
  }, []);

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
