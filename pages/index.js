import React, { Component } from 'react';
import Router from 'next/router';

export default class Home extends Component {
  componentDidMount() {
    Router.push('/projects/first-project');
  }

  render() {
    return (
      <article>
        <h1>Loading...</h1>
      </article>
    );
  }
}
