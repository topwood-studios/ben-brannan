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
  componentDidMount() {
    // console.log({ projects });
    // Router.push({
    //   pathname: `/${projects[0].name}`,
    // });
  }

  render() {
    return <Carousel title="test" slides={allSlides} />;
  }
}
