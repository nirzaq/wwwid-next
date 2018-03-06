import Document, { Head, Main, NextScript } from "next/document";
import flush from "styled-jsx/server";

export default class extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles };
  }

  render() {
    return (
      <html lang="id">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
					<link rel="icon" href="/static/favicon.ico" />
          <link rel="manifest" href="/static/manifest.json" />
          <meta
            name="description"
            content="Simple PWA Using Next.js"
          />
          <link rel="dns-prefetch" href="https://cdn-images-1.medium.com" />
          <title>WWWID - NEXT PWA </title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
