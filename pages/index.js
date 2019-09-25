import React, { Component } from 'react';
import styled from 'styled-components';

// import Router from 'next/router';
import { projects } from '../data.json';
import Carousel from '../containers/Carousel';
import { recordSpin } from '../components/Animations';
import { colors } from '../utils/theme';

const slideArray = [];
projects.forEach((project) => {
  const slides = [];
  project.slides.forEach((slide) => slides.push({ ...slide, title: project.title }));
  slideArray.push(slides);
});
const allSlides = slideArray.flat();

export default class Home extends Component {
  state = { isLoading: false, imagesToLoad: 0, imagesLoaded: 0 };

  componentDidMount() {
    let { imagesToLoad, imagesLoaded } = this.state;

    allSlides.forEach(({ image, mobileImage, desktopIcon, mobileIcon }) => {
      [image, mobileImage, desktopIcon, mobileIcon].forEach(img => {
        if (img) {
          this.setState({ imagesToLoad: imagesToLoad += 1 });
          const newImage = new Image();
          newImage.onload = () => {
            this.setState({ imagesLoaded: imagesLoaded += 1 });
          };
          newImage.src = img;
        }
      });
    });
    this.setState({ isLoading: true });
  }

  render() {
    const { isLoading, imagesToLoad, imagesLoaded } = this.state;
    const isReady = isLoading && imagesToLoad === imagesLoaded;

    if (!isReady) {
      return (
        <LoadingPage>
          <h1>
            Studio
            <Plus>+</Plus>
            Brannan
          </h1>
        </LoadingPage>
      );
    }
    return (
      <Carousel title="test" slides={allSlides} />);
  }
}

const LoadingPage = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  font-size: 60px;
  color: white;

  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: inherit;

    line-height: inherit;
    font-weight: bold;

    margin: 0;
    margin-bottom: 1rem;
    letter-spacing: 0.05rem;
  }
  `;

const Plus = styled.strong`
  color: ${colors.grey};
  animation-name: ${recordSpin};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  will-change: transform;
`;
