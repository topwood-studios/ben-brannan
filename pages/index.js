import React, { Component } from 'react';
import Router from 'next/router';
import { projects } from '../data.json';

export default class Home extends Component {
  componentDidMount() {
    Router.push({
      pathname: `/projects/${projects[0].name}`,
      query: { page: 1 },
    });
  }

  render() {
    return (
      <article>
        <h1>Loading...</h1>
      </article>
    );
  }
}
