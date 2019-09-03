import PropTypes from 'prop-types';
import React from 'react';
import Head from 'next/head';

import Carousel from '../containers/Carousel';

const Project = ({
  content: {
    attributes: { title, slides },
  },
  ...rest
}) => (
  <article>
    <Head>
      <title>{`Studio Brannan | ${title}`}</title>
    </Head>
    <Carousel title={title} slides={slides} {...rest} />
  </article>
);

export default Project;

Project.propTypes = {
  content: PropTypes.object,
  project: PropTypes.string,
  menuIsOpen: PropTypes.bool,
};

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
Project.getInitialProps = ({ query }) => {
  const { project } = query;
  const content = require(`../content/projects/${project}.md`);

  return { content, project };
};
