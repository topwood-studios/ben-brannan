import React, { Component } from 'react';
// import Router from 'next/router';
import { projects } from '../data.json';
import Carousel from '../containers/Carousel';

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
      return (<div><h1>Loading...</h1></div>);
    }
    return (
      <Carousel title="test" slides={allSlides} />);
  }
}
