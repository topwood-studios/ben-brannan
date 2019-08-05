import React from 'react';
import App, { Container } from 'next/app';
import styled from 'styled-components';
import MorphTransition from 'nextjs-morph-page';
import Menu from '../components/Menu';

// Global data

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppWrapper>
        <Container>
          <Logo>
            Studio
            <span>+</span>
            Brannan
          </Logo>
          <Menu />
          <MorphTransition timeout={300} classNames="morph">
            <Component {...pageProps} />
          </MorphTransition>
        </Container>
      </AppWrapper>
    );
  }
}

export default MyApp;

const AppWrapper = styled.div`
  .morph.enter {
    opacity: 0;
  }
  .morph.enter.active {
    opacity: 1;
    transition: opacity 300ms;
  }
  .morph.exit {
    opacity: 1;
  }
  .morph.exit.active {
    opacity: 0;
    transition: opacity 300ms;
    transition-delay: 300ms;
  }
`;

const Logo = styled.h1`
  /* font-family: 'Oswald'; */
  color: white;
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 2;
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  font-size: 20px;
  /* text-transform: uppercase; */
  text-decoration: none;
  letter-spacing: 0.25rem;
  display: inline-block;

  span {
    color: #888;
  }
`;
