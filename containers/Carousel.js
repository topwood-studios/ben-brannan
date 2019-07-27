import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Slide from '../components/Slide';
import { projects } from '../data.json';

const Carousel = ({ slides, project, title }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('forwards');

  // Slide pagination
  const [activeSlide, setActiveSlide] = useState(slides[0]);
  const [lastActiveSlide, setLastActiveSlide] = useState(slides[0]);

  const Router = useRouter();

  // Calculate next/prev projects
  const activeProjectIndex = projects.indexOf(projects.find(({ name }) => name === project));
  const nextProjectIndex = activeProjectIndex === projects.length - 1 ? 0 : activeProjectIndex + 1;
  const prevProjectIndex = activeProjectIndex === 0 ? projects.length - 1 : activeProjectIndex - 1;
  const nextProject = projects[nextProjectIndex].name;
  const prevProject = projects[prevProjectIndex].name;

  // Page down
  const handlePageDown = () => {
    setDirection('backwards');
    if (index === 0) {
      // If no more slides, go to previous project
      Router.push(`/projects/${prevProject}`);
    } else {
      setLastActiveSlide(slides[index]);
      setIndex(index - 1); // otherwise change slide
    }
  };

  const handlePageUp = () => {
    setDirection('forwards');
    if (index === slides.length - 1) {
      // If no more slides, go to next project
      Router.push(`/projects/${nextProject}`);
    } else {
      // otherwise change slide
      setLastActiveSlide(slides[index]);
      setIndex(index + 1);
    }
  };

  // Set active slide on index update
  useEffect(() => {
    setActiveSlide(slides[index]);
  }, [index]);

  // Prefetch next and prev project
  useEffect(() => {
    Router.prefetch(`/projects/${prevProject}`);
    Router.prefetch(`/projects/${nextProject}`);
  }, []);

  return (
    <Wrapper>
      {/* Transition group */}
      {slides.map((slide) => (
        <Slide
          title={title}
          pageCount={`${index + 1}/${slides.length}`}
          contents={slide}
          direction={direction}
          activeSlide={activeSlide}
          lastActiveSlide={lastActiveSlide}
          handlePageDown={handlePageDown}
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
