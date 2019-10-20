import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const AsyncBackground = ({ src, children, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = setLoaded(true);
    img.src = src;
  }, []);

  return (
    <Wrapper {...props}>
      {loaded && <BackgroundImage src={src} />}
      <Contents>{children}</Contents>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
`;

export default AsyncBackground;

AsyncBackground.propTypes = {
  src: PropTypes.string,
  children: PropTypes.any
};

const BackgroundImage = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;

  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
`;

const Contents = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;
