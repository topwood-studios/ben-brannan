import PropTypes from 'prop-types';
import React from 'react';

import Carousel from '../containers/Carousel';

const Project = ({
  project,
  content: {
    // html,
    attributes: {
      title,
      // client
      slides,
    },
  },
}) => (
  <article>
    <Carousel project={project} title={title} slides={slides} />
  </article>
);

export default Project;

Project.propTypes = {
  content: PropTypes.object,
  project: PropTypes.string,
};

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
Project.getInitialProps = ({ query }) => {
  const { project } = query;
  const content = require(`../content/projects/${project}.md`);

  return { content, project };
};
