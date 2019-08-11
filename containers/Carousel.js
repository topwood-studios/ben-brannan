import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useInterval from '../utils/useInterval';
import Slide from '../components/Slide';
import { projects } from '../data.json';

const Carousel = ({ slides, project, title }) => {
  const [index, setIndex] = useState(0);
  const [startCarousel, setStartCarousel] = useState(false);
  const [lastActiveSlide, setLastActiveSlide] = useState(slides[0]);
  const Router = useRouter();

  // Calculate next/prev projects
  const activeProjectIndex = projects.indexOf(projects.find(({ name }) => name === project));
  const nextProjectIndex = activeProjectIndex === projects.length - 1 ? 0 : activeProjectIndex + 1;
  const nextProject = `/${projects[nextProjectIndex].name}`;

  // Calculate slide total number of slides for 'page number'
  const slideArray = [];
  projects.forEach((p) => slideArray.push(p.slides));
  const allSlides = slideArray.flat();

  const handlePageUp = () => {
    if (index === slides.length - 1) {
      Router.push(nextProject); // If no more slides, go to next project
    } else {
      // otherwise change slide
      setLastActiveSlide(slides[index]);
      setIndex(index + 1);
    }
  };

  // Prefetch next project
  useEffect(() => {
    Router.prefetch(nextProject);
  }, []);

  // Set the carousel rotating
  useInterval(handlePageUp, startCarousel ? 4000 : null);

  return (
    <Wrapper>
      {slides.map((slide) => (
        <Slide
          index={allSlides.indexOf(slide) + 1}
          title={title}
          contents={slide}
          totalSlideCount={allSlides.length}
          key={slide.description}
          toggleCarousel={() => setStartCarousel(!startCarousel)}
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
