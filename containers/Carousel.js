import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useInterval from '../utils/useInterval';
import Slide from '../components/Slide';
import { projects } from '../data.json';

const Carousel = ({ slides, project, title, menuIsOpen }) => {
  const [index, setIndex] = useState(0);
  const [timer, setTimer] = useState(true); // eslint-disable-line

  // Slide pagination
  const [activeSlide, setActiveSlide] = useState(slides[0]);
  const [lastActiveSlide, setLastActiveSlide] = useState(slides[0]);

  const Router = useRouter();

  // Calculate next/prev projects
  const activeProjectIndex = projects.indexOf(projects.find(({ name }) => name === project));
  const nextProjectIndex = activeProjectIndex === projects.length - 1 ? 0 : activeProjectIndex + 1;
  const nextProject = `/${projects[nextProjectIndex].name}`;

  // Calculate number of slides
  const totalSlideCount = projects.reduce((r, p) => r + p.slides.length, 0);
  // TODO: Calculate slide index in total number of slides;

  const handlePageUp = () => {
    if (index === slides.length - 1) {
      // If no more slides, go to next project
      Router.push(nextProject);
    } else {
      // otherwise change slide
      setLastActiveSlide(slides[index]);
      setIndex(index + 1);
    }
  };

  // Set the carousel rotating
  useInterval(
    () => {
      handlePageUp();
    },
    menuIsOpen ? null : 3000,
  );

  // Set active slide on index update
  useEffect(() => {
    setActiveSlide(slides[index]);
  }, [index]);

  // Prefetch next and prev project
  useEffect(() => {
    Router.prefetch(nextProject);
  }, []);

  // const pageCount = `${index + 1}/${slides.length}`;

  return (
    <Wrapper>
      {slides.map((slide, i) => (
        <Slide
          title={title}
          index={i}
          key={slide.description}
          contents={slide}
          activeSlide={activeSlide}
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
