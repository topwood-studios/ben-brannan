import React from 'react';
import App, { Container } from 'next/app';
import styled from 'styled-components';
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
    const { Component, pageProps } = this.props;
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
          <Component {...pageProps} />
        </Container>
      </AppWrapper>
    );
  }
}

export default MyApp;

const AppWrapper = styled.div``;
