import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";

import App from "./components/App";


function htmlTemplate({ reactDom, extractor }) {
  return `
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Loadable components SSR</title>
        </head>
        
        <body>
            <div id="app">${reactDom}</div>
            ${extractor.getScriptTags()}
            <script src="/app.bundle.js"></script>
        </body>
        </html>
    `;
}

const app = express();

app.use(express.static(path.resolve(__dirname, "../dist")));

app.get("/*", (req, res) => {
  const context = {};

  const statsFile = path.resolve("./dist/loadable-stats.json");
  const extractor = new ChunkExtractor({ statsFile, entrypoints: ["app"] });
  const reactDom = renderToString(
    <ChunkExtractorManager extractor={extractor}>
        <StaticRouter location={req.url} context={context}>
            <App/>
        </StaticRouter>
    </ChunkExtractorManager>
  );

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlTemplate({ reactDom, extractor }));
});

const port = 3000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
