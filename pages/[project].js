import PropTypes from 'prop-types';
import React from 'react';

import Carousel from '../containers/Carousel';

const Project = ({
  file,
  content: {
    // html,
    attributes: {
      title,
      slides,
      // client
    },
  },
}) => (
  <article>
    <Carousel project={file} title={title} slides={slides} />
  </article>
);

export default Project;

Project.propTypes = {
  content: PropTypes.object,
  file: PropTypes.string,
};

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
Project.getInitialProps = ({ query }) => {
  const { file } = query;
  const content = require(`../content/projects/${file}.md`);

  return { content, file };
};
