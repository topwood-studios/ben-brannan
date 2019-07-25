import React, { Component } from 'react';

export default class Project extends Component {
  static async getInitialProps({ query }) {
    const { project } = query;
    const content = {
      html: '',
      attributes: {
        title: 'test',
      },
    };

    return { content };
  }

  render() {
    let {
      html,
      attributes: { title, cats },
    } = this.props.content;
    return (
      <article>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <ul>
          {cats.map((cat, k) => (
            <li key={k}>
              <h2>{cat.name}</h2>
              <p>{cat.description}</p>
            </li>
          ))}
        </ul>
      </article>
    );
  }
}
