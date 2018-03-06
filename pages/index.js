import { Component } from "react";
import fetch from "isomorphic-unfetch";
import LazyLoad from "react-lazyload";
import Head from "next/head"

import Excerpt from "../components/Excerpt";
import Container from "../components/Container";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import ArticleList from "../components/ArticleList";

export default class Index extends Component {
  static async getInitialProps() {
    const res = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid"
    );
    const data = await res.json();
    console.log(`data fetched`);

    const REGEX = /<p>.*.<\/p>\n</g;

    const articles = data.items.map(item => {
      let a = item.content.match(REGEX);
      item.contentView = a[0].slice(0, -1);
      let b = item.link.split("/");
      item.slug = b[b.length - 1];
      return item;
    });

    return {
      articles: articles
    };
  }

  componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(registration => {
          console.log("service worker registration successful");
        })
        .catch(err => {
          console.warn("service worker registration failed", err.message);
        });
    }
  }

  render() {
    return (
      <div>
        <Head>
          <title>{"WWWID | Feed"}</title>
        </Head>
        <Header />
        <Container>
          <ArticleList articles={this.props.articles} />
        </Container>
        <Footer />
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
          a {
            color: #3273dc;
            cursor: pointer;
            text-decoration: none;
          }
          .has-text-centered {
            text-align: center !important;
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

          body {
            line-height: 1.5;
          }
          
          .feed {
            margin-top: 100px;
            margin-bottom: 100px;
          }

          .feed box {
            margin-left: 32px;
            margin-right: 32px;
            padding: 1rem;
          }
          .Excerpt {
            text-align: justify;
          }
        `}</style>
      </div>
    );
  }
}
