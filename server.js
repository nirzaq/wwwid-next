const { createServer } = require("http");
const express = require("express");
const { join } = require("path");
const { parse } = require("url");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.get("/articles/:title", (req, res) => {
      const actualPage = "/article";
      const queryParams = { title: req.params.title };
      app.render(req, res, actualPage, queryParams);
    });
    server.get("/category/:cat", (req, res) => {
      const actualPage = "/category";
      const queryParams = { cat: req.params.cat };
      app.render(req, res, actualPage, queryParams);
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
