import React from 'react';
import App, { Container } from 'next/app';
import styled from 'styled-components';
import MorphTransition from 'nextjs-morph-page';
import Menu from '../components/Menu';

// Global data
// import data from '../data.json';

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
          <Menu />
          {/* <MorphTransition timeout={300} classNames="morph"> */}
          <Component {...pageProps} />
          {/* </MorphTransition> */}
          <style jsx global>
            {`
              .morph.enter {
                opacity: 0.01;
                transform: scale(1.1);
              }
              .morph.enter.active {
                opacity: 1;
                transform: scale(1);
                transition: all 300ms;
              }
              .morph.exit {
                opacity: 1;
                transform: scale(1);
              }
              .morph.exit.active {
                opacity: 0.01;
                transform: scale(1.1);
                transition: all 300ms;
              }
            `}
          </style>
        </Container>
      </AppWrapper>
    );
  }
}

export default MyApp;

const AppWrapper = styled.div`
  .page-transition-enter {
    opacity: 0;
  }
  .page-transition-enter-active {
    opacity: 1;
    transition: opacity 500ms;
  }
  .page-transition-exit {
    opacity: 1;
  }
  .page-transition-exit-active {
    opacity: 0;
    transition: opacity 500ms;
  }
`;
