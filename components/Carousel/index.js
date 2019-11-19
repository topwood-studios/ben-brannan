/* eslint-disable no-void */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { attributes as settings } from '../../content/settings/global.md';
import Slide from './Slide';

const Carousel = ({ slides }) => {
  const [index, set] = useState(0);
  const [startCarousel, setStartCarousel] = useState(true);

  const transitions = useTransition(slides[index], item => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 280, friction: 120 },
  });

  useEffect(
    () => setInterval(() => set(state => (state + 1) % slides.length),
        settings.carouselSpeed,
      ),
    [],
  );

  return (
    <div>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Slide
            index={slides.indexOf(item)}
            totalSlideCount={slides.length}
            setStartCarousel={setStartCarousel}
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
