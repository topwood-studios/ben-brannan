/* eslint-disable no-void */
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useTransition, animated, config } from "react-spring";
import { attributes as settings } from "../../content/settings/global.md";
import Slide from "./Slide";

const Carousel = ({ slides }) => {
  const [index, set] = useState(0);
  const [carouselSpeed, setCarouselSpeed] = useState(settings.carouselSpeed);

  // const [startCarousel, setStartCarousel] = useState(true);
  // const [lastActiveSlide, setLastActiveSlide] = useState(slides[5]);

  const transitions = useTransition(slides[index], item => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  });

  useEffect(
    () => void setInterval(() => set(state => (state + 1) % slides.length), carouselSpeed),
    [],
  );

  const toggleCarousel = (start) => {
    if (start) {
      setCarouselSpeed(settings.carouselSpeed);
    } else {
      setCarouselSpeed(0);
    }
  };

  return (
    <div>
      {transitions.map(({ item, props, key }) => (
        <animated.div
          key={key}
          style={props}
        >
          <Slide
            index={slides.indexOf(item)}
            totalSlideCount={slides.length}
            setStartCarousel={toggleCarousel}
            animationProps={props}
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
