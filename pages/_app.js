import React from 'react';
import App, { Container } from 'next/app';
import styled from 'styled-components';
import { PageTransition } from 'next-page-transitions';
import Head from 'next/head';

import Menu from '../components/Menu';

// Global data
import content from '../content/settings/global.md';

class MyApp extends App {
  state = { menuOpen: true, theme: 'Light' };

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  toggleMenu = () => this.setState({ menuOpen: !this.state.menuOpen }); // eslint-disable-line

  setTheme = (theme) => this.setState({ theme });

  render() {
    const { Component, pageProps, router } = this.props;
    const { menuOpen, theme } = this.state;
    const { attributes: { siteTitle, description } } = content;

    return (
      <AppWrapper>
        <Head>
          <title>{siteTitle}</title>
          <meta name="description" content={description} />
        </Head>
        <Container>
          <Logo fadeOut={menuOpen}>
            Studio
            <span>+</span>
            Brannan
          </Logo>
          <Menu isOpen={menuOpen} toggleMenu={this.toggleMenu} />
          <PageTransition timeout={300} classNames="page-transition">
            <Component
              {...pageProps}
              theme={theme}
              key={router.route}
              menuIsOpen={menuOpen}
              toggleMenu={this.toggleMenu}
              setTheme={this.setTheme}
            />
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

const Logo = styled.h1`
  color: white;
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 2;
  margin: 0;
  font-size: 2rem;
  font-weight: 900;
  font-size: 20px;
  text-decoration: none;
  letter-spacing: 0.075rem;
  display: inline-block;

  transition: opacity 0.3s ease;
  opacity: ${({ fadeOut }) => (fadeOut ? 0 : 1)};

  span {
    color: #888;
  }
`;
