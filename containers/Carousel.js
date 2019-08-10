import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useInterval from '../utils/useInterval';
import Slide from '../components/Slide';
import { projects } from '../data.json';

const Carousel = ({ slides, project, title, menuIsOpen }) => {
  const [index, setIndex] = useState(0);
  const [lastActiveSlide, setLastActiveSlide] = useState(slides[0]);
  const Router = useRouter();

  // Calculate next/prev projects
  const activeProjectIndex = projects.indexOf(projects.find(({ name }) => name === project));
  const nextProjectIndex = activeProjectIndex === projects.length - 1 ? 0 : activeProjectIndex + 1;
  const nextProject = `/${projects[nextProjectIndex].name}`;


  // TODO: Calculate slide index in total number of slides;
  const totalSlideCount = slides.length;

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
  useInterval(
    () => {
      handlePageUp();
    },
    !menuIsOpen ? null : 4000,
  );

  return (
    <Wrapper>
      {slides.map((slide, i) => (
        <Slide
          title={title}
          index={i}
          key={slide.description}
          contents={slide}
          menuIsOpen={menuIsOpen}
          activeSlide={slides[index]}
          lastActiveSlide={lastActiveSlide}
          totalSlideCount={totalSlideCount}
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
  menuIsOpen: PropTypes.bool,
};

const Wrapper = styled.div``;
