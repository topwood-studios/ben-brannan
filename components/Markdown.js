import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line
export default ({ html, ...rest }) => (
  <Markdown {...rest} dangerouslySetInnerHTML={{ __html: html }} />
);

const Markdown = styled.div``;
