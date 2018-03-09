const express = require("express");
const cors = require("cors")
const { join } = require("path");
const { parse } = require("url");
const next = require("next");
const fetch = require("isomorphic-unfetch")
const LRUCache = require('lru-cache')

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const apicache = require("apicache") 

const server = express();

let cache = apicache.middleware

const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid`

server.get('/api/feed',  cors(), cache('60 minutes'), (req, res) => {
  fetch(API_URL)
  .then( r => r.json() )
  .then( data => {
    res.json(data)
  });
  console.log("API SERVED..")
});

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
})

app
  .prepare()
  .then(() => {
    server.get('/', (req, res) => {
      renderAndCache(req, res, '/')
    })
    server.get("/articles/:title", (req, res) => {
      const actualPage = "/article";
      const queryParams = { title: req.params.title };
      renderAndCache(req, res, actualPage, queryParams);
    });
    server.get("/category/:cat", (req, res) => {
      const actualPage = "/category";
      const queryParams = { cat: req.params.cat };
      renderAndCache(req, res, actualPage, queryParams);
    });
    server.get("*", (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      if (pathname === "/service-worker.js") {
        const filePath = join(__dirname, ".next", pathname);
        app.serveStatic(req, res, filePath);
      } else {
        handle(req, res, parsedUrl);
      }
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

  /*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey (req) {
  return `${req.url}`
}

async function renderAndCache (req, res, pagePath, queryParams) {
  const key = getCacheKey(req)

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT')
    res.send(ssrCache.get(key))
    return
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams)

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html)
      return
    }

    // Let's cache this page
    ssrCache.set(key, html)

    res.setHeader('x-cache', 'MISS')
    res.send(html)
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams)
  }
}