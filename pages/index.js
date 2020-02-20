/* eslint-disable implicit-arrow-linebreak */
import 'array-flat-polyfill';

import React, { Component } from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';

import { projects } from '../data.json';
import Carousel from '../components/Carousel';
import ProgressBar from '../components/ProgressBar';
import { colors } from '../utils/theme';

ReactGA.initialize('UA-153007435-1');
ReactGA.pageview('/');

const slideArray = [];
projects.sort((a, b) => a.order - b.order);
projects.forEach(project => {
  const tempArray = [];
  project.slides.forEach((slide, i) =>
    tempArray.push({
      ...slide,
      animateText: i === 0,
      client: project.client,
      id: `${project.client}_${project.title}_Slide${i + 1}`,
    }),
  );
  slideArray.push(tempArray);
});
const allSlides = slideArray.flat();

export default class Home extends Component {
  state = { isLoading: false, imagesToLoad: 0, imagesLoaded: 0 };

  componentDidMount() {
    let { imagesToLoad, imagesLoaded } = this.state;

    allSlides.forEach(
      ({ image, mobileImage, desktopIcon, mobileIcon }, index) => {
        [image, mobileImage, desktopIcon, mobileIcon].forEach(img => {
          if (img) {
            const newImage = new Image();
            newImage.src = img;

            // If one of the first two slides, add image to loading bar
            if (index < 2) {
              this.setState({ imagesToLoad: (imagesToLoad += 1) });
              newImage.onload = () => {
                this.setState({ imagesLoaded: (imagesLoaded += 1) });
              };
            }
          }
        });
      },
    );
    this.setState({ isLoading: true });
  }

  render() {
    const { isLoading, imagesToLoad, imagesLoaded } = this.state;
    const isReady = isLoading && imagesToLoad === imagesLoaded;
    const progress = (imagesLoaded / imagesToLoad) * 100;

    if (!isReady) {
      return (
        <LoadingPage>
          <h1>
            Studio
            <span>+</span>
            Brannan
          </h1>
          <ProgressBar complete={progress} />
        </LoadingPage>
      );
    }
    return <Carousel slides={allSlides} />;
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
  font-size: 28px;
  background: white;
  color: black;

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

    span {
      color: ${colors.grey};
    }
  }
`;
