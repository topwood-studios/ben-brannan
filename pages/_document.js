import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="/static/css/main.css" rel="stylesheet" />
          <link href="/static/css/fonts.css" rel="stylesheet" />
          <link rel="apple-touch-icon" sizes="57x57" href="/static/img/favicon/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/static/img/favicon/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/static/img/favicon/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/static/img/favicon/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/static/img/favicon/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/static/img/favicon/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/static/img/favicon/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/static/img/favicon/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/img/favicon/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/static/img/favicon/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/img/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/static/img/favicon/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/img/favicon/favicon-16x16.png" />
          {/* <link rel="manifest" href="/manifest.json"> */}
          {/* <meta name="msapplication-TileColor" content="#ffffff" /> */}
          {/* <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" /> */}
          {/* <meta name="theme-color" content="#ffffff" /> */}
          {this.props.styleTags}

          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-153007435-1" />
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());

            gtag('config', 'UA-153007435-1');
          </script>

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
