import Router from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import Background from '../../components/Background';
// import Markdown from '../../components/Markdown';

const nextArrow = '/static/img/next-arrow.png';
const prevArrow = '/static/img/prev-arrow.png';

const Project = ({
  nextProject,
  prevProject,
  content: {
    // html,
    attributes: {
      title,
      slides,
      // client
    },
  },
}) => {
  const [index, setIndex] = useState(0);

  const handlePageDown = () => {
    if (index === 0) {
      Router.push(`/projects/${prevProject}`); // Get previous project
    } else {
      setIndex(index - 1); // If there are still slides, change slide
    }
  };

  const handlePageUp = () => {
    if (index === slides.length - 1) {
      Router.push(`/projects/${nextProject}`); // Get next project
    } else {
      setIndex(index + 1); // If there are still slides, change slide
    }
  };

  const pageCount = `${index + 1}/${slides.length}`;
  const activeSlide = slides[index];

  return (
    <article>
      <StyledBackground src={activeSlide.image}>
        <Contents>
          <div>
            <Title>{title}</Title>
            <SubTitle>{activeSlide.description}</SubTitle>
            {/* <Markdown html={html} /> */}
          </div>
          <Counter>{pageCount}</Counter>
        </Contents>
        <PageLeft onClick={handlePageDown} />
        <PageRight onClick={handlePageUp} />
      </StyledBackground>
    </article>
  );
};

export default Project;

Project.propTypes = {
  content: PropTypes.object,
  nextProject: PropTypes.string,
  prevProject: PropTypes.string,
};

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
Project.getInitialProps = ({ query }) => {
  const { project } = query;
  const { projects } = require('../../data.json');
  const content = require(`../../content/projects/${project}.md`);

  const activeIndex = projects.indexOf(projects.find(({ name }) => name === project));
  const nextIndex = activeIndex === projects.length - 1 ? 0 : activeIndex + 1;
  const prevIndex = activeIndex === 0 ? projects.length - 1 : activeIndex - 1;
  const nextProject = projects[nextIndex].name;
  const prevProject = projects[prevIndex].name;

  return { content, nextProject, prevProject };
};

const Title = styled.h1`
  animation: slideRight 1s forwards 1s;
  letter-spacing: 0.125rem;
  font-size: 1.8rem;
  opacity: 0;
  margin: 0;

  @keyframes slideRight {
    0% {
      opacity: 0;
      transform: translateX(-10rem);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const SubTitle = styled.h2`
  animation: slideUp 1s forwards 1.2s;
  font-weight: 100;
  font-size: 1.4rem;
  opacity: 0;
  margin: 0;

  @keyframes slideUp {
    0% {
      opacity: 0;
      transform: translateY(10rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StyledBackground = styled(Background)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: flex-end;
`;

const Counter = styled.span`
  animation: fadeIn 1s forwards 2s;
  font-size: 1.8rem;
  opacity: 0;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateX(-10rem);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const Contents = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 30px;
  z-index: 1;
  pointer-events: none;

  color: white;
`;

const PageRight = styled.div`
  position: absolute;
  right: 0;
  left: 50%;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.5s ease;
  cursor: url(${nextArrow}), auto;

  &:hover {
    opacity: 1;
  }
`;

const PageLeft = styled.div`
  position: absolute;
  right: 50%;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.5s ease;
  cursor: url(${prevArrow}), auto;

  &:hover {
    opacity: 1;
  }
`;
