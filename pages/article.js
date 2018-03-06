import { Component } from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";

import Container from "../components/Container";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import Box from "../components/Box";
import Content from "../components/Content";
import Categories from "../components/Categories";
import Index from "./index";

export default class Article extends Component {
  static async getInitialProps(context) {
    const { title } = context.query;
    const res = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid"
    );
    const data = await res.json();
    console.log(`data fetched from article page`);

    const article = data.items.filter((item, index) => {
      if (item.link.includes(title)) return item;
    });

    return {
      article: article[0]
    };
  }

  render() {
    return (
      <Container>
        <Head>
          <title>{this.props.article.title}</title>
        </Head>
        <Box>
          <Header />
          <h1>{this.props.article.title}</h1>
          <div className="meta">
            <div id="author">{this.props.article.author}</div>
            <div id="pubDate">{this.props.article.pubDate}</div>
          </div>
          <Content desc={this.props.article.content} />
          <Categories categories={this.props.article.categories} />
          <style jsx global>{`
            html,
            body,
            p,
            ol,
            ul,
            li,
            dl,
            dt,
            dd,
            blockquote,
            figure,
            fieldset,
            legend,
            textarea,
            pre,
            iframe,
            hr,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              margin: 0;
              padding: 0;
            }
            body {
              line-height: 1.4;
            }
            h3 {
              font-weight: 600;
              line-height: 1.15;
              letter-spacing: -0.015em;
              -webkit-margin-before: 1rem;
              -webkit-margin-after: 1rem;
            }
            h4 {
              margin-top: 1rem;
              margin-bottom: 1rem;
            }
            p {
              line-height: 1.58;
            }
            li {
              margin-left: 30px;
              margin-bottom: 10px;
              line-height: 1.58;
            }
            h2 {
              display: block;
            }
            figure {
              margin-top: 40px;
            }
            figcaption {
              text-align: center;
              margin: 10px auto 10px;
            }
            h1 {
              margin-top: 4rem;
            }
            pre {
              font-family: Menlo, Monaco, "Courier New", Courier, monospace;
              font-size: 16px;
              background: rgba(0, 0, 0, 0.05);
              padding: 20px;
              white-space: pre-wrap;
            }
            header {
              margin-bottom: 4rem;
            }
            a {
              color: #3273dc;
              cursor: pointer;
              text-decoration: none;
            }
            .container {
              margin: 0 auto;
              position: relative;
            }

            @media screen and (min-width: 1024px) {
              .container {
                max-width: 960px;
                width: 960px;
              }
              .container.is-fluid {
                margin-left: 32px;
                margin-right: 32px;
                max-width: none;
                width: auto;
              }
            }

            @media screen and (max-width: 1215px) {
              .container.is-widescreen {
                max-width: 1152px;
                width: auto;
              }
            }

            @media screen and (max-width: 1407px) {
              .container.is-fullhd {
                max-width: 1344px;
                width: auto;
              }
            }

            @media screen and (min-width: 1216px) {
              .container {
                max-width: 1152px;
                width: 1152px;
              }
            }

            @media screen and (min-width: 1408px) {
              .container {
                max-width: 1344px;
                width: 1344px;
              }
            }
            img {
              display: block;
              width: 100%;
            }
            .content {
              margin-top: 1rem;
            }
            .meta {
              display: flex;
              margin-bottom: 1rem;
            }
            #author {
              flex: 1;
            }
          `}</style>
        </Box>
      </Container>
    );
  }
}
