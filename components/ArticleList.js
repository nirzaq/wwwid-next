import LazyLoad from "react-lazyload";
import Link from "next/link";
import Slugify from "slugify";

import Box from "./Box";
import Excerpt from "./Excerpt";

export default ({ articles }) => {
  return (
    <div className="container article">
      <ul>
        {articles.map((item, index) => (
          <li key={index}>
            <Box>
              <Link
                as={`/articles/${item.link.replace('https://medium.com/wwwid/','')}`}
                href={`/article?title=${item.link.replace('https://medium.com/wwwid/','')}&index=${index}`}
              >
                <div className="articles">
                  <h1>{item.title}</h1>
                  <LazyLoad height={320} offset={100}>
                    <figure className="image">
                      <img src={`https://res.cloudinary.com/nirzaq/image/fetch/c_scale,fl_force_strip.progressive,w_478/f_webp/${item.thumbnail}`} alt={item.title} />
                    </figure>
                  </LazyLoad>
                  <div className="meta">
                    <div id="author">{item.author}</div>
                    <div id="pubDate">{item.pubDate}</div>
                  </div>
                  <Excerpt desc={item.contentView} />
                </div>
              </Link>
            </Box>
          </li>
        ))}
      </ul>
      <style jsx>{`
        @media screen and (min-width: 1024px) {
          .article {
            width: 960px;
          }
        }
        .article {
          margin-top: 4rem;
          margin-bottom: 3rem;
        }
        .articles {
          cursor: pointer;
        }
        h1 {
          margin-bottom: 10px;
        }

        ul {
          list-style: none;
        }
        .image {
          display: block;
          position: relative;
        }

        .image img {
          display: block;
          height: 480px;
          width: 100%;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .meta {
          display: flex;
          margin-bottom: 1rem;
        }
        #author {
          flex: 1;
        }
      `}</style>
    </div>
  );
};
