import React from 'react';
import App, { Container } from 'next/app';
import styled from 'styled-components';
import { PageTransition } from 'next-page-transitions';
import Head from 'next/head';

// Global data
import content from '../content/settings/global.md';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, router } = this.props;
    const {
      attributes: { siteTitle, description },
    } = content;

    return (
      <AppWrapper>
        <Head>
          <title>{siteTitle}</title>
          <meta name="description" content={description} />
        </Head>
        <Container>
          <PageTransition timeout={300} classNames="page-transition">
            <Component {...pageProps} key={router.route} />
          </PageTransition>
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
    transition: opacity 300ms;
  }
  .page-transition-exit {
    opacity: 1;
  }
  .page-transition-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`;
