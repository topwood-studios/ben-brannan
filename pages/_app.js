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
      attributes: { siteTitle, siteDescription, keywords, siteUrl },
    } = content;

    return (
      <AppWrapper>
        <Head>
          <title>{siteTitle}</title>
          <meta name="name" content={siteTitle} />
          <meta name="url" content={siteUrl} />
          <meta name="description" content={siteDescription} />
          <meta name="keywords" content={keywords} />

          {/* Facebook Open Graph tags */}
          <meta property="og:site_name" content={siteTitle} />
          <meta property="og:title" content={siteTitle} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={siteUrl} />
          <meta property="og:description" content={siteDescription} />
          {/* TODO: Get Image */}
          {/* <meta property="og:image" content={siteTitle} /> */}
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
