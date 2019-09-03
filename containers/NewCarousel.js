import 'array-flat-polyfill';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useInterval from '../utils/useInterval';
import Slide from '../components/CarouselSlide';
import { projects, settings } from '../data.json';

// TODO: Preload everything

const CAROUSEL_SPEED = settings[0].carouselSpeed;

const Carousel = ({ slides, project, title }) => {
  const [index, setIndex] = useState(0);
  const [startCarousel, setStartCarousel] = useState(true);
  const [lastActiveSlide, setLastActiveSlide] = useState(slides[5]);
  const Router = useRouter();

  // Calculate next/prev projects
  const activeProjectIndex = projects.indexOf(projects.find(({ name }) => name === project));
  const nextProjectIndex = activeProjectIndex === projects.length - 1 ? 0 : activeProjectIndex + 1;
  const nextProject = `/${projects[nextProjectIndex].name}`;

  const handlePageUp = () => {
    if (index === slides.length - 1) {
      setLastActiveSlide(slides[index]);
      setIndex(0);
    } else {
      setLastActiveSlide(slides[index]);
      setIndex(index + 1);
    }
  };

  // Prefetch next project
  useEffect(() => {
    Router.prefetch(nextProject);
  }, []);

  // Set the carousel rotating
  useInterval(handlePageUp, startCarousel ? CAROUSEL_SPEED : null);

  return (
    <Wrapper>
      {slides.map((slide, i) => (
        <Slide
          key={`${slide.description}_${i}`} // eslint-disable-line
          index={i}
          title={title}
          contents={slide}
          totalSlideCount={slides.length}
          toggleCarousel={() => setStartCarousel(!startCarousel)}
          setStartCarousel={setStartCarousel}
          paused={!startCarousel}
          activeSlide={slides[index]}
          lastActiveSlide={lastActiveSlide}
          handlePageUp={handlePageUp}
        />
      ))}
    </Wrapper>
  );
};

export default Carousel;

Carousel.propTypes = {
  slides: PropTypes.array,
  project: PropTypes.string,
  title: PropTypes.string,
};

const Wrapper = styled.div``;
